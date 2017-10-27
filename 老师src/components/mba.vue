<template>
    <section>
        <section class="mba-bar"><img :src="mbaJson.barImgUrl" /></section>
        <dl class="mba-list" v-for="list in mbaJson.list">
            <dt><router-link :to="list.href"><i class="fa fa-tint">&nbsp;</i>{{list.title}}</router-link></dt>
            <dd v-for="item in list.list">
                <router-link :to="item.href">{{item.name}}</router-link>
            </dd>
        </dl>
    </section>
</template>

<script lang="babel">
    export default{
        data(){
            return{
                oldScrollTop:0,//滚动位置，vue有点误差尤其很长的时候，待验证
                mbaJson:{}
            }
        },
        //keep-alive导致mounted只会渲染一次
        mounted(){
            var _this=this;
            _this.$http({//ajax
                method:'get',//请求方式
                url:'/api/mba.json',//请求地址(接口)
                //params:{name:name,id:id}//params放在url上;body通过http协议传
            }).then(function(data){//data后台响应的数据;success进入
                //赋值给mbaJson数组,
                _this.mbaJson=data.data;//同步值；或_this.mbaJson=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        },
        activated(){
            var _this=this;
            document.body.scrollTop=_this.oldScrollTop;
            document.documentElement.scrollTop=_this.oldScrollTop
        },
        deactivated(){//离开时记录滚动位置
            this.oldScrollTop=document.body.scrollTop+document.documentElement.scrollTop;
        },
        components:{
            
        }
    }
</script>

<style lang="less" scoped>
    @fz:100rem;
    .mba-bar{
        img{ width:100%;}
    }
    .mba-list{
        dt a{display:block; padding-left:40/@fz; line-height:68/@fz; font-size:30/@fz; background:#e8e8e8; border-bottom:#0b6aa6 solid 4/@fz;}
        dd a{display:block; line-height:66/@fz; padding-left:52/@fz; border-bottom:#d4d4d4 1px solid;border-top:#fff 1px solid;}
    }
</style>