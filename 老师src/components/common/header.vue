<template>
    <header class="nav">
        <!--uc及qq暂未解决兼容此touchstart问题-->
        <div class="navBtnBar" @touchstart.prevent="navBarShowHide">
            <span class="fa fa-bars"></span>
        </div>
        <h1>xx启蒙教育</h1>
        <a class="navTel" href="tel:8888888888">
            <span class="fa fa-phone"></span>
        </a>
        <ul class="navBar" @touchmove.prevent :style="{left:-appMove+'rem'}">
            <li v-for="navBar in navBarArr">
                <router-link v-if="navBar.href" :to="navBar.href"><i :class="'fa '+navBar.className"></i>{{navBar.name}}</router-link>
            </li>
        </ul>
        <div @touchstart.prevent="navBarShowHide" @touchmove.prevent class="fixedShade" :style="{display:(appMoveBool==true?'':'none')}"></div>
    </header>
</template>
<script>
    export default{
        props:["appBarX"],
        data(){
            return{
                appMoveBool:false,
                navBarArr:[]
            }
        },
        methods:{
            navBarShowHide(e){
                var _this=this;
                /*
                dispatch发送到actions所有模块只要有appMove都会收到，所以只能注意命名
                commit发送到mutations*/
                _this.$store.dispatch("appMove",{
                    bool:_this.appMoveBool=_this.appMoveBool?false:true
                });
            }
        },
        mounted(){
            var _this=this;
            _this.$http({//ajax
                method:'get',//请求方式
                url:'/api/index/nav.json?b',//请求地址(接口)
                //params:{name:name,limit:limit}//params放在url上;body通过http协议传
            }).then(function(data){//data后台响应的数据;success进入
                //赋值给sliderArr数组,
                console.log(data);
                _this.navBarArr=data.data;//同步值；或_this.sliderArr=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        }
    }
</script>

<style lang="less">
    @fz:100rem;
    .fixedShade{position: fixed; width: 100%; left: 0; top: 0; z-index: 9999; height: 100%;}
    .nav{
        display: flex;
        height:85/@fz;
        line-height: 85/@fz;
        text-align: center;
        background:#383232;
        color:#afa9a9;
        font-size:44/@fz;
        a{  color:#afa9a9;}
        .navBtnBar{ 
            flex:90;
            cursor: pointer;
            border-right: #292424 1px solid;
        }
        h1{
            flex:450;
            color:#fff;
            font-size:40/@fz;
            border-left: #4a4141 1px solid;
            border-right: #292424 1px solid;
        }
        .navTel{
            border-left: #4a4141 1px solid;
            flex:90;
        }
        .navBar{
                z-index: 99999;
                transition:left 0.3s;
             position: fixed;  top: 0; width:285/@fz; height: 100%; background: #3c3535; border-right: #1d1818 1px solid; overflow-y:auto;
             a{color:#fff; font-size:30/@fz; display:block; height:100%;text-align:left; padding-left:44/@fz;border-bottom:#584c4c 1px solid;}
             i{ font-size:42/@fz; margin-right:8/@fz;}
             li{
                height:98/@fz;
                line-height:98/@fz;
                border-bottom:#1e1818 1px solid;
             }
         }
    }
</style>