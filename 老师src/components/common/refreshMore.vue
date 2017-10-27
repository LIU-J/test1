<template>
	<div class="Js-scroll" :class="{aniTR:touchBool}" @touchstart="jsScroll" @touchmove="jsScroll" @touchend="jsScroll" :style="{top:moveY+'px'}">
            <span class="Js-up">{{upText}}</span>

            <slot>无内容可显示</slot>

            <span class="Js-down">{{downText}}</span>
    </div>
</template>

<script>
	export default{
		props:["ajaxParams"],
		data(){
			return {
				//以下参数相关“刷新与加载更多”功能
                touchBool:false,
                startY:0,//触屏起点
                endY:0,//触屏终点
                moveY:0,//移动距离
                upBool:false,
                upText:"下拉刷新",
                downBool:false,
                downText:"加载更多",
                downPageNum:0,
                stepLong:40//下拉高度
			}
		},
		methods:{
			//刷新:最顶部且向下滑动
			refreshMove(e){
				var _this=this;
				e.preventDefault();
                _this.moveY=(_this.endY-_this.startY)/3;
                if(_this.moveY>_this.stepLong && _this.upText!="正在刷新")
                {
                    _this.upText="松开刷新";
                    _this.upBool=true;
                }
			},
			//加载:最底部且向上滑动
			loadMove(e,noMoreBool){
				var _this=this;
				if(noMoreBool)//足够高
                {
                    e.preventDefault();
                    _this.moveY=(_this.endY-_this.startY)/3;
                    if(_this.moveY<-_this.stepLong && _this.downText!="正在加载"){
                        _this.downText="松开加载";
                        _this.downBool=true;
                    }
                }
                else{//网页不够高
                    _this.downText="已显示全部";
                }
			},
			//松开刷新
			refreshUpdate(){
				var _this=this;
                _this.upText="正在刷新";

                //store状态:弹框
                _this.$store.commit("promptState",{
                    icoBool:true,
                    content:_this.upText,
                    showOrHide:true
                });

                _this.upBool=false;

                var url=_this.ajaxParams.refreshReqUrl;//地址
                var params=_this.ajaxParams.refreshReqData;//参数
                _this.$http({//ajax
                    method:'get',//请求方式
                    url:url,//请求地址(接口)
                    params:params//params放在url上;body通过http协议传
                }).then(function(data){//data后台响应的数据;success进入
                    //console.log(data.data,data.body);
                    //同步数据
                    //store状态:刷新加载功能
                    _this.$store.commit("refreshMoreUpdate",{
                        data:data.data,
                        msg:"刷新"
                    });
                  
                    _this.upText="下拉刷新";

                    _this.downPageNum=0;
                    //store状态:弹框
                    _this.$store.commit("promptState",{
                        icoBool:true,
                        content:"刷新完毕",
                        showOrHide:false
                    });
                },function(error){//error进入
                    //error
                    console.log(error);
                    _this.upText="下拉刷新";

                    //store状态
                    _this.$store.commit("promptState",{
                        icoBool:true,
                        content:"刷新出错，稍后重试",
                        showOrHide:false
                    });
                });
			},
			//加载更多
			loadUpdate(){
				var _this=this;
                var pageNum=_this.downPageNum++;
                _this.downText="正在加载";

                //store状态:弹框
                _this.$store.commit("promptState",{
                    icoBool:true,
                    content:_this.downText,
                    showOrHide:true
                });

                _this.downBool=false;

                var url=_this.ajaxParams.loadReqUrl;//地址
                var params=_this.ajaxParams.loadReqData;//参数
                params.pageNum=pageNum;
                _this.$http({//ajax
                    method:'get',//请求方式
                    url:url,//请求地址(接口)
                    params:params//params放在url上;body通过http协议传
                }).then(function(data){//data后台响应的数据;success进入
                    //赋值给sliderArr数组,
                    if(data.data.msg=="已显示全部"){
                        //console.log(data.data.msg);
                        _this.downText=data.data.msg;
                        //store状态:弹框
                        _this.$store.commit("promptState",{
                            icoBool:false,
                            content:data.data.msg,
                            showOrHide:false
                        });
                    }
                    else{
                    	//console.log(data.data,data.body);
                    	//同步数据
                    	//store状态:刷新加载功能
                    	_this.$store.commit("refreshMoreUpdate",{
                    		data:data.data,
                    		msg:"加载"
                    	});
   
                        _this.downText="加载更多";

                        //store状态
                        _this.$store.commit("promptState",{
                            icoBool:true,
                            content:"加载完毕",
                            showOrHide:false
                        });
                    }

                },function(error){//error进入
                    //error
                    console.log(error);
                    _this.downText="加载更多";

                    //store状态
                    _this.$store.commit("promptState",{
                        icoBool:true,
                        content:"加载出错，稍后重试",
                        showOrHide:false
                    });
                });
			},
			jsScroll(e){//滚动:下拉刷新，加载更多
                var _this=this;
                var target=e.targetTouches[0];
                var contentObj=_this.$el.parentNode;
                var winH=document.body.clientHeight;
                var scrollTop=document.body.scrollTop+document.documentElement.scrollTop;
                var webH=contentObj.scrollHeight;
                //console.log(webH,winH,scrollTop)
                var noMoreBool=webH<=winH?false:true;//如果网页不够高，false表示无需加载更多
                if(e.type!="touchend"){
                    var pageY=target.pageY;
                }

                if(e.type=="touchstart"){
                    _this.touchBool=false;
                    _this.startY=pageY;
                }
                else if(e.type=="touchmove"){
                    //console.log(scrollTop)
                    _this.endY=pageY;
                    //刷新:最顶部且向下滑动
                    if(scrollTop==0 && _this.endY>_this.startY){
                        _this.refreshMove(e);
                    }
                    //加载:最底部且向上滑动
                    else if(scrollTop==webH-winH && _this.endY<_this.startY){
                        _this.loadMove(e,noMoreBool);
                    }
                }
                else if(e.type=="touchend"){//松开
                    _this.touchBool=true;
                    _this.moveY=0;
                    if(_this.upBool){//松开刷新
                       _this.refreshUpdate();
                    }

                    if(_this.downBool){//加载更多
                     	_this.loadUpdate();   
                    }
                }
            }
		}
	}
</script>

<style lang="less">
/*滚动*/
.Js-scroll{ position: relative; z-index: 88; }
.Js-up,.Js-down{ position: absolute; left: 0; font-size: 18px; width: 100%; line-height: 40px; text-align: center;}
.Js-up{ top: -40px;}
.Js-down{ bottom: -40px;}
.aniTR{transition:top 0.3s;}
</style>