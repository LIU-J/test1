<template>
    <div class="activityDetail">
        <h2>{{detail.title}}</h2>
        <div class="activityDetail-main">
            <h3>{{detail.detailTitle}}</h3>
            <div v-html="detail.detail">{{detail.detail}}</div>
            <button class="ctivityDetail-btn" @touchstart="enroll">报名参加</button>
        </div>
    </div>
</template>

<script lang="babel">
    export default{
        data(){
            return{
                detail:{
                    "title":""
                }
            }
        },
        //mounted(){},//keep-alive导致mounted只会渲染一次
        activated(){
            document.body.scrollTop=0;//回到顶部
            document.documentElement.scrollTop=0;//回到顶部

            var name=this.$route.query.name;
            var id=this.$route.query.id;
            var _this=this;
            _this.$http({//ajax
                method:'get',//请求方式
                url:'/api/activityDetail.json',//请求地址(接口)
                params:{name:name,id:id}//params放在url上;body通过http协议传
            }).then(function(data){//data后台响应的数据;success进入
                //赋值给sliderArr数组,
                _this.detail=data.data;//同步值；或_this.sliderArr=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        },
        methods:{
            enroll(){
                var _this=this;
                var name="";
                var id="";
                _this.$http({//ajax
                    method:'post',//请求方式
                    url:'/',//请求地址(接口)
                    body:{name:name,id:id}//params放在url上;body通过http协议传
                }).then(function(data){//data后台响应的数据;success进入
                    //赋值给sliderArr数组,
                    alert(data.data.msg);//同步值；或_this.sliderArr=data.body;
                },function(error){//error进入
                    //error
                    console.log(error);
                });
            }
        },
        components:{
        }
    }
</script>

<style lang="less">
    @fz:100rem;
    .activityDetail{
        h2{width: 100%;border-bottom: #00afd4 4/@fz solid;background: #ececec;line-height: 67/@fz;font-size: 28/@fz; padding-left: 18/@fz;}
    }
    .activityDetail-main{ width: 93%; margin: 22/@fz auto 0;padding-bottom:60/@fz;
        h3{font-size: 18px;line-height: 44/@fz;height: 96/@fz; font-weight: 500; color: #009bdb;}
        img{ max-width:100%;}
        p{ line-height: 42/@fz; margin-top: 18/@fz;}
    }
    .ctivityDetail-btn{ display: block; width: 565/@fz; line-height: 72/@fz; text-align: center; margin: 50/@fz auto 0; border:#0995d2 1px solid; background: #1cb4f5; color: #fff; border-radius: 4/@fz; font-size: 18px;}
</style>