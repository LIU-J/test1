<template>
    <section>
        <refresh-more class="activityList" :ajaxParams="ajaxParam">
            <h2>{{list.title}}</h2>
            <dl class="activityList-list" v-if="list.data" v-for="item in list.data">
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
        </refresh-more>
    </section>
</template>

<script lang="babel">
    import refreshMore from "./common/refreshMore.vue";
    export default{
        data(){
            return{
                oldName:'',//记录列表名，在activated时会渲染对比
                oldScrollTop:0,//滚动位置，vue有点误差尤其很长的时候，待验证
                ajaxParam:{//ajax请求的参数及地址
                    refreshReqData:{},
                    refreshReqUrl:"/api/activityList.json",
                    loadReqData:{},
                    loadReqUrl:"/api/activityList.json?v=1.0.2",
                }
            }
        },
        computed:{
            list(){//列表数据
                return this.$store.state.refreshMore.list;
            }
        },
        mounted(){//keep-alive导致mounted只会渲染一次
            console.log("activityList,mounted");
            var _this=this;
            var name=_this.$route.query.name;
            var limit=_this.$route.query.limit;
            var params={name:name,limit:limit};
            _this.oldName=name;//记录名字

            //ajax请求
            _this.ajaxFun(params);
        },
        activated(){
            console.log("activityList,activated");
            var _this=this;
            var name=_this.$route.query.name;
            if(name==_this.oldName){
                document.body.scrollTop=_this.oldScrollTop;
                document.documentElement.scrollTop=_this.oldScrollTop;
                return;//跳出
            }

            _this.oldName=name;
            var limit=_this.$route.query.limit;
            var params={name:name,limit:limit};

            //ajax请求
            _this.ajaxFun(params);
        },
        deactivated(){//离开时记录滚动位置
            this.oldScrollTop=document.body.scrollTop+document.documentElement.scrollTop;
        },
        methods:{
            ajaxFun(params){
                var _this=this;
                _this.ajaxParam.refreshReqData=params;//子组ajax"刷新"传参
                _this.ajaxParam.loadReqData=params;//子组ajax"加载"传参

                _this.$http({//ajax
                    method:'get',//请求方式
                    url:'/api/activityList.json',//请求地址(接口)
                    params:params//params放在url上;body通过http协议传
                }).then(function(data){//data后台响应的数据;success进入
                    //console.log(data.data,data.body);
                    //store状态:刷新加载功能
                    _this.$store.commit("refreshMoreUpdate",{
                        data:data.data,
                        msg:"刷新"
                    });
                    
                },function(error){//error进入
                    //error
                    console.log(error);
                });
            },
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
            }
        },
        components:{
            refreshMore
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
</style>