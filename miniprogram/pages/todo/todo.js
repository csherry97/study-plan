var util = require('../../utils/util.js');

Page({ 

    data: {
      array:[],
      showModalStatus: false,
      select: false,
      studytype: "学习",
      studyitem: "",
      target_hour: 0,
      target_minute:0,
      status: "notfinished"
    }, 

    onShow: function(){
      let that = this;
      wx.cloud.init();
      wx.cloud.database().collection("data").get({
        success(res){
          console.log("请求成功",res);
          that.setData({
            array:res.data
          })
        },
        fail(res){
          console.log("请求失败",res);
        }
      })
    },

    /**下拉菜单**/
    bindShowMsg() {
        this.setData({
            select:!this.data.select
        })
   },

   mySelect(e) {
       var name = e.currentTarget.dataset.name
       this.setData({
            studytype: name,
            select: false
       })
   },
   /**input*/
   getItemValue: function(e){
     this.setData({studyitem: e.detail.value});
   },

   getHourValue: function(e){
    this.setData({target_hour: e.detail.value});
   },

   getMinuteValue: function(e){
    this.setData({target_minute: e.detail.value});
   },

   /**弹窗动画**/
   powerDrawer: function (e) {  
    var currentStatu = e.currentTarget.dataset.statu;  
    this.util(currentStatu)  
  },  

  util: function(currentStatu){  
    /* 动画部分 */  
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({  
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    }); 

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();  
  
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({  
      animationData: animation.export()  
    })  
      
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {  
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();  
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({  
        animationData: animation  
      })  
        
      //关闭  
      if (currentStatu == "close") {  
        this.setData(  
          {  
            showModalStatus: false  
          }  
        );  
      }  
    }.bind(this), 200)  

    // 显示  
    if (currentStatu == "open") {  
      this.setData(  
        {  
          showModalStatus: true  
        }  
      );  
    }  
  },  

   /**上传数据至数据库 */
   saveNewTodo: function(e){
     let self = this,
     studytype=self.data.studytype,
     studyitem=self.data.studyitem,
     target_hour=self.data.target_hour,
     target_minute=self.data.target_minute;
     if (target_hour>18 || target_hour==null || (target_hour==0 && target_minute==0)|| target_minute>60){
      wx.showToast({
        title: '目标时间输入错误',
        duration: 2000
      })
      return;
     } else if (studyitem==""){
      wx.showToast({
        title: '请输入代办名',
        duration: 2000
      })
      return;
     }
     var convertHour = util.convertHour(target_hour,target_minute);
     const db = wx.cloud.database({});
     const cont = db.collection('data');
     cont.add({
       data:{
         type:self.data.studytype,
         item:self.data.studyitem,
         target_time: convertHour,
         status:self.data.status
       },
    })
    this.util("close"),
    this.onShow(),
    this.onReady()
   }
  })  