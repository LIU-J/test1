<template>
    <brand-detail :detail="brandDetail"></brand-detail>
</template>

<script lang="babel">
    import brandDetail from "./common/detail.vue";
    export default{
        data(){
            return{
                brandDetail:{

                }
            }
        },
        //mounted(){},//keep-alive导致mounted只会渲染一次
        activated(){
            document.body.scrollTop=0;//回到顶部

            var name=this.$route.query.name;
            var id=this.$route.query.id;
            var _this=this;
            _this.$http({//ajax
                method:'get',//请求方式
                url:'/api/detail.json',//请求地址(接口)
                params:{name:name,id:id}//params放在url上;body通过http协议传
            }).then(function(data){//data后台响应的数据;success进入
                //赋值给sliderArr数组,
                _this.brandDetail=data.data;//同步值；或_this.sliderArr=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        },
        components:{
            brandDetail
        }
    }
</script>