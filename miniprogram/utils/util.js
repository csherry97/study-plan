//转换小时和分钟
function convertHour(hour,minute){
    var convertHour=parseInt(hour);
    if(minute==0){
        return convertHour;
    } else {
        var convertMinute=Math.round(parseInt(minute)/60*10)/10;
        return convertHour+convertMinute;
    }
}

module.exports = {
    convertHour: convertHour,
}