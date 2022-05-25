require("dotenv").config();
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const axios = require('axios');

const winston = require('./modules/winstonConfig');

const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
// app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(require('cors')({
    origin: true,
    credentials: true
}));

app.listen(process.env.SERVER_PORT, () => {
    winston.info(`start http://localhost:${process.env.SERVER_PORT}`);
})

mongoose.connect('mongodb+srv://kimyongmin1:qwer1234@cluster0.xm939.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    }).then(() => {
        winston.info('mongoose connected!')
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        }
    });

app.use(session({
    secret: 'foo',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://kimyongmin1:qwer1234@cluster0.xm939.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        //dbName: "testdb",
        stringify: false,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 6,
        httpOnly: false,
    }
}));

app.use(function(req, res, next) {
    //인터셉터 역할 부여 
    winston.info('req.url::' + req.url);
    // console.log(req.session);
    // console.log(req.header('access_token'));

    if (req.url.indexOf('/auth/kakao/callback') > -1) {
        return next();
    }else if (req.url.indexOf('/getAccessToken') > -1) {
        return next();
    } else {
        if (req.session && req.session.userInfo) {
            return next();
        } else {
            res.status(401);
            return next();
        }
    }
});
app.post('/getAccessToken', (req, res) => {
    console.log('/getAccessToken');
    winston.info(req.session.userInfo);
    winston.info(req.session.userInfo.kakao_account.profile);
    winston.info(req.session.userInfo.kakao_account.profile.nickname);
    
    res.json({
        access_token: req.session.access_token,
        user_info: req.session.userInfo,
    });
});

app.get('/auth', async(req, res) => {
    try {
        var nick = req.session.userInfo.kakao_account.profile.nickname;
        
        if('kimyongmin1@kakao.com' == req.session.userInfo.kakao_account.email|| nick.indexOf('YOUTHVISION') > -1 || nick.indexOf('선영') > -1){
            req.session.auth = 'admin';
        }else{
            req.session.auth = 'user';
        }
        if('lovely_s2_@nate.com' == req.session.userInfo.kakao_account.email){
            req.session.auth = 'admin'
        }
        res.status(200).json({auth:req.session.auth});
    } catch (err) {
        winston.error("Error >>" + err);
        res.status(401).json({msg:'권한 가져오기 실패'});
    }
});
require('./modules/socketConfig')(app, winston);
//require('./modules/mgdbOrder')(app, mongoose, winston);
require('./modules/campService')(app, mongoose, winston);
require('./modules/kakaoLogin')(app, winston);
require('./modules/aplyService')(app, mongoose, winston);