'use strict';

module.exports = {
    format: dateFormat,
    leftFormat: leftTimeFormat,
    leftTimes: leftTimes,
    monthId: generateMonthId
};

const Weeks  = ['日', '一', '二', '三', '四', '五', '六'];
const DftStr = 'YYYY-MM-DD hh:mm:ss';

function dateFormat(timestamp, formatStr) {
    let str  = formatStr;
    let date = null;

    if (timestamp && timestamp.constructor !== Date && +timestamp)
    date = new Date(+timestamp);

    if(!date)
    date = new Date;

    if(!str)
    str = DftStr;

    let month = date.getMonth();
    let year = date.getYear();
    let fullYear = date.getFullYear();
    let week = date.getDay();
    let day = date.getDate();
    let hour = date.getHours();
    let minu = date.getMinutes();
    let sec = date.getSeconds();
    let ms = date.getMilliseconds();

    str = str.replace(/yyyy|YYYY/g, fullYear);
    str = str.replace(/yy|YY/g, (year % 100) > 9 ? (year % 100).toString() : '0' + (year % 100));
    str = str.replace(/MM/g, (month + 1) > 9 ? (month + 1).toString() : '0' + (month + 1));
    str = str.replace(/M/g, (month + 1));
    str = str.replace(/w|W/g, Weeks[week]);
    str = str.replace(/dd|DD/g, day > 9 ? day.toString() : '0' + day);
    str = str.replace(/d|D/g, day);
    str = str.replace(/hh|HH/g, hour > 9 ? hour.toString() : '0' + hour);
    str = str.replace(/h|H/g, hour);
    str = str.replace(/mm/g, minu > 9 ? minu.toString() : '0' + minu);
    str = str.replace(/m/g, minu);
    str = str.replace(/ss|SS/g, sec > 9 ? sec.toString() : '0' + sec);
    str = str.replace(/s|S/g, sec);
    str = str.replace(/xxx|XXX/g, (ms > 9 ? ms > 99 ? '' : '0' : '00') + ms);
    return str
}

function generateMonthId(timestamp) {

    let dateStr = dateFormat(timestamp, 'YYYYMM');

    return +dateStr;
}

function leftTimeFormat ( timestamp, formatStr ) {

    let leftTime = timestamp - +new Date;

    return dateFormat ( leftTime, formatStr );
}

function leftTimes ( timestamp ) {

    //hh:mm:ss

    timestamp = +timestamp;

    let times = {
        years: 0,
        fullYears: 0,
        months: 0,
        fullMonths: 0,
        days: 0,
        fullDays: 0,
        hours: 0,
        fullHours: 0,
        minutes: 0,
        fullMinutes: 0,
        seconds: 0,
        fullSeconds: 0
    };

    let sec = 1000;

    let min = 60 * sec;

    let hou = 60 * min;

    let day = 24 * hou;

    let mon = 30 * day;

    let yer = 12 * mon;

    let ty = timestamp % yer; // exc year

    let tym = ty % mon; // exc year month

    let tymd = tym % day; // exc year month day

    let tymdh = tymd % hou; // exc year month day hour

    let tymdhm = tymdh % min; // exc year month day minute

    if ( timestamp > yer ) {

        times.years = Math.floor ( timestamp / yer );

        times.fullYears = Math.floor ( timestamp / yer );
    } else { }

    if ( timestamp > mon ) {

        times.months = Math.floor ( ty / mon );

        times.fullMonths = Math.floor ( timestamp / mon );
    } else { }

    if ( timestamp >= day ) {

        times.days = Math.floor ( tym / day );

        times.fullDays = Math.floor ( timestamp / day );
    } else { }

    if ( timestamp >= hou ) {

        times.hours = Math.floor ( tymd / hou );

        times.fullHours = Math.floor ( timestamp / hou );
    } else { }

    if ( timestamp >= min ) {

        times.minutes = Math.floor ( tymdh / min );

        times.fullMinutes = Math.floor ( timestamp / min );
    } else { }

    times.seconds = Math.floor ( tymdhm / sec );

    times.fullSeconds = Math.floor ( timestamp / sec );

    return times;
}