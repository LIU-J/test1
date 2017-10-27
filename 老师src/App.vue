<template>
	<main class="app" :style="{marginLeft:appX+'rem'}">
		<app-header :appBarX="appBarX"></app-header>
        <keep-alive>
            <router-view class="content"></router-view>
        </keep-alive>
        <app-footer></app-footer>
        <prompt></prompt>
    </main>
</template>

<script lang="babel">
    import respondFont from './asset/js/reponeFont.js';//
	import appHeader from './components/common/header.vue';
    import appFooter from './components/common/footer.vue';//var appFooter=require('./components/common/footer.vue');
    import prompt from './components/common/prompt.vue';

    respondFont.init();//字体响应
    
	export default{
        data(){
            return {
            }
        },
        computed:{//计算，当值改变时触发；函数名表现在view层中
            appX(){
                //console.log(this.$store.state.app.appX);
                return this.$store.state.app.appX;
            },
            appBarX(){
                //console.log(this.$store.state.app.appBarX);
                return this.$store.state.app.appBarX;
            }
        },
        methods:{
            
        },
        components:{
        	appHeader,
            appFooter,
            prompt
        }
    }
</script>

<style lang="less">
    [v-cloak]{ display: none;}
    @fz:100rem;
    @import "./asset/less/font-awesome.min.css";
    @import "./asset/less/reset.less";
	html,body,.app{height: 100%;}
    .app{ transition:margin 0.3s; width: 100%; }
    .nav{ position: relative; z-index: 999;}
    .content{min-height:100%; padding:85/@fz 0 112/@fz 0; margin:-85/@fz 0 -112/@fz;}
    .footer{ position:relative; z-index: 99;}
</style>