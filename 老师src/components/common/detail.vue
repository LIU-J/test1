<template>
    <section class="detail">
        <h2>{{detail.title}}</h2>
        <article class="article" v-html="detail.article">{{detail.article}}</article>
    </section>
</template>

<script lang="babel">

    export default{
        props:['detail'],
        data(){
            return{
            }
        },
        components:{
        },
        mounted(){
        }
    }
</script>

//scoped表示局部使用
<style lang="less">
    @fz:100rem;
    .detail{display: flex; flex-flow:row wrap;justify-content:center;}
    .detail h2{ width: 100%; border-bottom: #00afd4 4/@fz solid; background: #ececec; line-height: 67/@fz; font-size: 28/@fz; padding-left:18/@fz;}
    .article{ margin:24/@fz 0 18/@fz; width: 94%;
        img{max-width:100%;}
        p{ line-height: 40/@fz; margin-top: 36/@fz; font-size: 14px;}
    }
</style>