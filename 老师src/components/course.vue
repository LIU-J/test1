<template>
    <section>
        <course :list="courseArr"></course>
    </section>
</template>

<script lang="babel">
    import course from "./common/listSort.vue";
    export default{
        data(){
            return{
                courseArr:{}
            }
        },
        components:{
            course
        },
        mounted(){ 
            var _this=this;
            _this.$http({//ajax
                method:'get',//请求方式
                url:'/api/course.json',//请求地址(接口)
                //params:{name:name,id:id}//params放在url上;body通过http协议传
            }).then(function(data){//data后台响应的数据;success进入
                //赋值给sliderArr数组,
                _this.courseArr=data.data;//同步值；或_this.sliderArr=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        }
    }
</script>