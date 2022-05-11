require("dotenv").config();
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const winston = require('./modules/winstonConfig');

const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(morgan('combined', { stream: winston.stream }));
app.use(require('cors')({ origin: true, credentials: true }));
app.use(express.json());
app.listen(process.env.SERVER_PORT, () => {
    winston.info(`start http://localhost:${process.env.SERVER_PORT}`);
})

const io = require('./modules/socketConfig')(app, winston);
require('./modules/mgdbOrder')(app, mongoose, winston);
//const db = require('./modules/dbConnect');

mongoose.connect('mongodb://localhost:27017/testdb', {
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
        mongoUrl: 'mongodb://localhost:27017/testdb',
        dbName: "testdb",
        stringify: false,
    }),
    cookie: {
        maxAge: 1000 * 60 * 1,
        httpOnly: false,
    }
}));