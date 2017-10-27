<template>
    <section>
        <refresh-more :ajaxParams="ajaxParam">
            <dl class="mba-list">
                <dt><i class="fa fa-tint">&nbsp;</i>{{title}}</dt>
                <dd v-for="item in mbaList.data">
                    <router-link :to="item.href">{{item.name}}</router-link>
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
                oldScrollTop:0,//滚动位置，vue有点误差尤其很长的时候，待验证
                oldName:'',//记录列表名，在activated时会渲染对比
                title:"",
                ajaxParam:{//ajax请求的参数及地址
                    refreshReqData:{},
                    refreshReqUrl:"/api/mbaList.json",
                    loadReqData:{},
                    loadReqUrl:"/api/mbaList.json?v=1.0.2",
                }
            }
        },
        computed:{
            mbaList(){//列表数据
                return this.$store.state.refreshMore.list;
            }
        },
        mounted(){//keep-alive导致mounted只会渲染一次
            var _this=this;
            var name=_this.$route.query.name;
            _this.oldName=name;

            var params={name:name};
            _this.ajaxFun(params);
        },
        activated(){
            var _this=this;
            var name=_this.$route.query.name;

            if(name==_this.oldName){
                document.body.scrollTop=_this.oldScrollTop;
                document.documentElement.scrollTop=_this.oldScrollTop
                return;//跳出
            }
            _this.oldName=name;

            document.body.scrollTop=0;

            var params={name:name};
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

                _this.title=params.name;
                _this.$http({//ajax
                    method:'get',//请求方式
                    url:'/api/mbaList.json',//请求地址(接口)
                    params:params//params放在url上;body通过http协议传
                }).then(function(data){//data后台响应的数据;success进入
                    //console.log(data.data,data.body);
                    //同步值
                    //store状态:刷新加载功能
                    _this.$store.commit("refreshMoreUpdate",{
                        data:data.data,
                        msg:"刷新"
                    });
                },function(error){//error进入
                    //error
                    console.log(error);
                });
            }
        },
        components:{
            refreshMore
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