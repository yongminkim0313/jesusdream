const path = require('path');
const { createLogger, format, transports } = require('winston'); // winston lib
const process = require('process');
const appRoot = path.join(__dirname, '../');
const moment = require('moment-timezone')

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`; // log 출력 포맷 정의
});
const appendTimestamp = format((info, opts) => { 
    if(opts.tz) info.timestamp = moment().tz(opts.tz).format(); 
    return info;
});
const options = {
    // log파일
    file: {
        level: 'info',
        filename: `${appRoot}/logs/jesusdream.log`, // 로그파일을 남길 경로
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: combine(
            label({ label: 'winston-test' }),
            appendTimestamp({ tz: 'Asia/Seoul' }),
            myFormat // log 출력 포맷
        )
    },
    // 개발 시 console에 출력
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true, // 로그형태를 json으로도 뽑을 수 있다.
        colorize: true,
        format: combine(
            label({ label: 'nba_express' }),
            appendTimestamp({ tz: 'Asia/Seoul' }),
            myFormat
        )
    }
}

let logger = createLogger({
    transports: [
        new transports.File(options.file) // 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
    ],
    exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console(options.console)) // 개발 시 console로도 출력
}
logger.stream = {
    write: function(message, encoding) {
        logger.info(message); // 단순히 message를 default 포맷으로 출력
    },
};
module.exports = logger;