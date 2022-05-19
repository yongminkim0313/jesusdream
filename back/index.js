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
        maxAge: 1000 * 60 * 60 * 1,
        httpOnly: false,
    }
}));

app.use(function(req, res, next) {
    //인터셉터 역할 부여 
    // winston.info('req.url::' + req.url);
    // console.log(req.session);
    // console.log(req.header('access_token'));

    if (req.url.indexOf('/auth/kakao/callback') > -1) {
        next();
    } else {
        if (req.session && req.session.userInfo) {
            next();
        } else {
            // res.redirect('http://localhost:8000');
            // winston.info('메인 페이지 이동');
            res.status(401);
            res.json({ code: 401, msg: '접근권한 없음!!' });
        }
    }
});
app.post('/getAccessToken', (req, res) => {
    res.json({
        access_token: req.session.access_token,
        user_info: req.session.userInfo
    });
});
require('./modules/socketConfig')(app, winston);
require('./modules/mgdbOrder')(app, mongoose, winston);
require('./modules/kakaoLogin')(app, winston);