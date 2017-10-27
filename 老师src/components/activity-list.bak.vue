<template>
    <div>
        <div class="activityList Js-scroll" :class="{aniTR:touchBool}" @touchstart="jsScroll" @touchmove="jsScroll" @touchend="jsScroll" :style="{top:moveY+'px'}">
            <span class="Js-up">{{upText}}</span>
            <h2>{{list.title}}</h2>
            <dl class="activityList-list" v-if="list.list" v-for="item in list.list">
                <dt>
                    <router-link :to="item.href">
                        <img :src="item.imgUrl" />
                    </router-link>
                </dt>
                <dd>
                    <ul>
                        <li>活动时间：{{timeImport(item.timeStart,item.timeEnd)}}</li>
                        <li>活动对象：{{item.obj}}</li>
                        <li>活动地点：{{item.address}}</li>
                    </ul>
                    <router-link :to="item.href">报名参加</router-link>
                </dd>
            </dl>
            <span class="Js-down">{{downText}}</span>
        </div>
    </div>
</template>

<script lang="babel">
    export default{
        data(){
            return{
                oldName:'',//记录列表名，在activated时会渲染对比
                oldScrollTop:0,
                list:{

                },
                //以下参数相关“刷新与加载更多”功能
                touchBool:false,
                startY:0,//触屏起点
                endY:0,//触屏终点
                moveY:0,//移动距离
                upBool:false,
                upText:"下拉刷新",
                downBool:false,
                downText:"加载更多",
                downPageNum:0
            }
        },
        mounted(){//keep-alive导致mounted只会渲染一次
            console.log("activityList,mounted");
            var _this=this;
            var name=_this.$route.query.name;
            var limit=_this.$route.query.limit;
            _this.oldName=name;//记录名字

            _this.$http({//ajax
                method:'get',//请求方式
                url:'/api/activityList.json',//请求地址(接口)
                params:{name:name,limit:limit}//params放在url上;body通过http协议传
            }).then(function(data){//data后台响应的数据;success进入
                //赋值给sliderArr数组,
                _this.list=data.data;//同步值；或_this.sliderArr=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        },
        activated(){
            console.log("activityList,activated");
            var _this=this;
            var name=_this.$route.query.name;
            if(name==_this.oldName){
                document.body.scrollTop=_this.oldScrollTop;
                return;//跳出
            }

            _this.oldName=name;
            var limit=_this.$route.query.limit;
            
            _this.$http({//ajax
                method:'get',//请求方式
                url:'/api/activityList.json',//请求地址(接口)
                params:{name:name,limit:limit}//params放在url上;body通过http协议传
            }).then(function(data){//data后台响应的数据;success进入
                //赋值给sliderArr数组,
                _this.list=data.data;//同步值；或_this.sliderArr=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        },
        deactivated(){//离开时记录滚动位置
            this.oldScrollTop=document.body.scrollTop;
        },
        methods:{
            timeImport(timeS,timeE){//时间格式调整
                var dateObj=new Date();
                dateObj.setTime(timeS);
                var s_year=dateObj.getFullYear();
                var s_month=dateObj.getMonth()+1;
                var s_date=dateObj.getDate();
                var s_hour=dateObj.getHours();
                s_hour=s_hour<10?"0"+s_hour:s_hour;
                var s_minute=dateObj.getMinutes();
                s_minute=s_minute<10?"0"+s_minute:s_minute;
                dateObj.setTime(timeE);
                var e_year=dateObj.getFullYear();
                var e_month=dateObj.getMonth()+1;
                var e_date=dateObj.getDate();
                var e_hour=dateObj.getHours();
                e_hour=e_hour<10?"0"+e_hour:e_hour;
                var e_minute=dateObj.getMinutes();
                e_minute=e_minute<10?"0"+e_minute:e_minute;
                if(s_year!=e_year || s_month!=e_month || s_date!=e_date){
                    return s_year+"."+s_month+"."+s_date+" "+s_hour+":"+s_minute+"-"+e_year+"."+e_month+"."+e_date+" "+e_hour+":"+e_minute;
                }
                else{
                    return s_year+"."+s_month+"."+s_date+"("+s_hour+":"+s_minute+"-"+e_hour+":"+e_minute+")"
                }
            },
            jsScroll(e){//滚动:下拉刷新，加载更多
                var _this=this;
                var target=e.targetTouches[0];
                var contentObj=_this.$el;
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
                    var stepLong=40;
                    //刷新:最顶部且向下滑动
                    if(scrollTop==0 && _this.endY>_this.startY){
                        e.preventDefault();
                        _this.moveY=(_this.endY-_this.startY)/3;
                        if(_this.moveY>stepLong && _this.upText!="正在刷新")
                        {
                            _this.upText="松开刷新";
                            _this.upBool=true;
                        }
                    }
                    //加载:最底部且向上滑动
                    else if(scrollTop==webH-winH && _this.endY<_this.startY){
                        if(noMoreBool)//足够高
                        {
                            e.preventDefault();
                            _this.moveY=(_this.endY-_this.startY)/3;
                            if(_this.moveY<-stepLong && _this.downText!="正在加载"){
                                _this.downText="松开加载";
                                _this.downBool=true;
                            }
                        }
                        else{//网页不够高
                            _this.downText="已显示全部";
                        }
                    }
                }
                else if(e.type=="touchend"){//松开
                    _this.touchBool=true;
                    _this.moveY=0;
                    if(_this.upBool){//松开刷新
                        var name=_this.$route.query.name;
                        var limit=_this.$route.query.limit;

                        _this.upText="正在刷新";

                        //store状态
                        _this.$store.commit("promptState",{
                            icoBool:true,
                            content:_this.upText,
                            showOrHide:true
                        });

                        _this.upBool=false;
                        _this.$http({//ajax
                            method:'get',//请求方式
                            url:'/api/activityList.json',//请求地址(接口)
                            params:{name:name,limit:limit}//params放在url上;body通过http协议传
                        }).then(function(data){//data后台响应的数据;success进入
                            //赋值给sliderArr数组,
                            console.log(data);
                            _this.list=data.data;//同步值；或_this.sliderArr=data.body;
                            _this.upText="下拉刷新";

                            _this.downPageNum=0;
                            //store状态
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
                    }

                    if(_this.downBool){//加载更多
                        var name=_this.$route.query.name;
                        var limit=_this.$route.query.limit;
                        var pageNum=_this.downPageNum++;
                        _this.downText="正在加载";

                        //store状态
                        _this.$store.commit("promptState",{
                            icoBool:true,
                            content:_this.downText,
                            showOrHide:true
                        });

                        _this.downBool=false;
                        _this.$http({//ajax
                            method:'get',//请求方式
                            url:'/api/activityList.json?v=1.0.2',//请求地址(接口)
                            params:{name:name,limit:limit,pageNum:pageNum}//params放在url上;body通过http协议传
                        }).then(function(data){//data后台响应的数据;success进入
                            //赋值给sliderArr数组,
                            if(data.data.msg=="已显示全部"){
                                console.log(data.data.msg);
                                _this.downText=data.data.msg;
                                //store状态
                                _this.$store.commit("promptState",{
                                    icoBool:false,
                                    content:data.data.msg,
                                    showOrHide:false
                                });
                            }
                            else{
                                _this.list.list=_this.list.list.concat(data.data.list);//同步值；或_this.sliderArr=data.body;
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
                    }
                }
            }
        },
        components:{
        }
    }
</script>

//scoped表示局部使用
<style lang="less" scoped>
    @fz:100rem;
    .activityList{
        position: relative;
        display:flex; flex-flow:row wrap; justify-content:center;padding-bottom:60/@fz;
        h2{width: 100%; border-bottom: #00afd4 4/@fz solid; background: #ececec; line-height: 67/@fz; font-size: 28/@fz; padding-left:32/@fz; color:#009bdd; margin-bottom:4/@fz;}
    }
    .activityList-list{ 
         width:92%; background:#fff; border-radius:8/@fz; padding: 8/@fz 8/@fz 15/@fz; margin:18/@fz  0;
        img{width:100%;}
        ul{ margin-top:10/@fz;}
        li{line-height:36/@fz; padding:0 30/@fz;font-size:14px;}
        dd a{display:block; width:100%; margin-top:16/@fz; line-height:70/@fz; border-radius:8/@fz; background:#1db5f6; font-size:18px; text-align:center; color:#fff;}
    }
    .aniTR{transition:top 0.3s;}
</style>