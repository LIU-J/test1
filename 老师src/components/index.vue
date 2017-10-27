<template>
    <section>
        <index-slider></index-slider>
        <indexList></indexList>
    </section>
</template>

<script lang="babel">
    import indexSlider from "./index/slider.vue";
    import indexList from "./index/list.vue";
    export default{
        data(){
            return{
                num:1,
                msg:'index'
            }
        },
        components:{
            indexSlider,
            indexList
        }
    }
</script>

//scoped表示局部使用
<style lang="less" scoped>
    
</style>