<template>
    <section>
        <activity :list="activityArr"></activity>
    </section>
</template>

<script lang="babel">
    import activity from "./common/listSort.vue";
    export default{
        data(){
            return{
                activityArr:{}
            }
        },
        components:{
            activity
        },
        mounted(){
            var _this=this;
            _this.$http({//ajax
                method:'get',//请求方式
                url:'/api/activity.json',//请求地址(接口)
                //params:{name:name,limit:limit}//params放在url上;body通过http协议传
            }).then(function(data){//data后台响应的数据;success进入
                //赋值给sliderArr数组,
                _this.activityArr=data.data;//同步值；或_this.sliderArr=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        }
    }
</script>