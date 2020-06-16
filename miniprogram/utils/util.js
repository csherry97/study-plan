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

//获取当天时间后几天的时间
function getDate(AddDayCount) {   
    var dd = new Date();  
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期  
    var y = dd.getFullYear();   
    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
    var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
    console.log(y+"-"+m+"-"+d)
    return y+"-"+m+"-"+d;   
 }; 

module.exports = {
    convertHour: convertHour,
    getDate: getDate,
}