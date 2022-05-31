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
        if (req.session && req.session.accessToken) {
            return next();
        } else {
            res.status(401);
            return next();
        }
    }
});
app.post('/auth/userInfo', (req, res) => {
    console.log('/auth/userInfo');
    if(req.session.accessToken){ 
        res.status(200).json({
            userInfo : req.session
        });
    }else{
        res.status(200).json({})
    }
});

app.post('/auth/logout', async(req, res) => {
    const type = req.session.type;
    req.session.destroy(function(err) {
        if (err) throw err;
        res.status(200).json({msg:'success'});
    });
    if(type == 'kakao'){
        console.log('kakao logout!');
        const accessToken = req.session.accessToken;
        try {
            const response2 = await axios({
                method: "post",
                url: "https://kapi.kakao.com/v1/user/logout", // 서버
                headers: { 'Authorization': `Bearer ${accessToken}` }, // 요청 헤더 설정
            });
            winston.info('logout:::::'+response2.status);
        } catch (err) {
            winston.error("Error >>" + err);
            res.status(401).json({msg:err});
        }
    }else if(type == 'naver'){

    }else{}
});

require('./modules/socketConfig')(app, winston);
require('./modules/campService')(app, mongoose, winston);
require('./modules/kakaoLogin')(app, winston);
require('./modules/naverLogin')(app, winston);
require('./modules/aplyService')(app, mongoose, winston);