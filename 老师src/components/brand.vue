<template>
    <section>
        <brand :list="brandArr"></brand>
    </section>
</template>

<script lang="babel">
    import brand from "./common/listSort.vue";
    export default{
        data(){
            return{
                brandArr:{}
            }
        },
        components:{
            brand
        },
        mounted(){
            var _this=this;
            //console.log("brand");
            _this.$http({//ajax
                method:'get',//请求方式
                url:'/api/brand.json',//请求地址(接口)
                params:{}//data发送到后台数据
            }).then(function(data){//data后台响应的数据;success进入
                //赋值给sliderArr数组,
                _this.brandArr=data.data;//同步值；或_this.sliderArr=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        }
    }
</script>