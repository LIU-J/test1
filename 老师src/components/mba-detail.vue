<template>
    <mba-detail :detail="mbaDetail"></mba-detail>
</template>

<script lang="babel">
    import mbaDetail from "./common/detail.vue";

    export default{
        data(){
            return{
               mbaDetail:{}
            }
        },
        //mounted(){},//keep-alive导致mounted只会渲染一次
        activated(){
            document.body.scrollTop=0;//回到顶部

            var _this=this;
            var name=_this.$route.query.name;
            var id=_this.$route.query.id;
            _this.$http({//ajax
                method:'get',//请求方式
                url:'/api/detail.json',//请求地址(接口)
                params:{name:name,id:id}//params放在url上;body通过http协议传
            }).then(function(data){//data后台响应的数据;success进入
                //赋值给mbaDetail数组,
                _this.mbaDetail=data.data;//同步值；或_this.mbaDetail=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        },
        components:{
            mbaDetail
        }
    }
</script>

<style lang="less" scoped>
    @fz:100rem;
    .mba-bar{
        img{ width:100%;}
    }
    .mba-list{
        dt{ padding-left:40/@fz; line-height:68/@fz; font-size:30/@fz; background:#e8e8e8; border-bottom:#0b6aa6 solid 4/@fz;}
        dd a{display:block; line-height:66/@fz; padding-left:52/@fz; border-bottom:#d4d4d4 1px solid;border-top:#fff 1px solid;}
    }
</style>