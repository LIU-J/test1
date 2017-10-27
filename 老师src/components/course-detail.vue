<template>
    <course-detail :detail="courseDetail"></course-detail>
</template>

<script lang="babel">
    import courseDetail from "./common/detail.vue";
    export default{
        data(){
            return{
                courseDetail:{

                }
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
                //赋值给sliderArr数组,
                _this.courseDetail=data.data;//同步值；或_this.sliderArr=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        },
        components:{
            courseDetail
        }
    }
</script>