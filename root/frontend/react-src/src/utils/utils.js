function getLocalHTMLDate(date){
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = (month < 10) ? '0' + month : month;
    let day = date.getDate();
    day = (day < 10) ? '0' + day: day;

    return year + '-' + month + '-' + day;
}

function getLocalHTMLTime(date){
    let hour = date.getHours();
    hour = (hour < 10) ? '0' + hour: hour;
    let minute = date.getMinutes();
    minute = (minute < 10) ? '0' + minute: minute;
    return hour + ':' + minute;
}

module.exports = {
    getLocalHTMLDate,
    getLocalHTMLTime,
}
