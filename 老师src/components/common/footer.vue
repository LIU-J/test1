<template>
    <footer class="footer">
        <section class="footerNav">
            <a href="tel:8888888888">
                <i class="fa fa-phone"></i>
                免费咨询电话
            </a>
            <router-link to="/address">
                <i class="fa fa-map-marker"></i>
                联系地址
            </router-link>
        </section>
        <section class="footerCopy">瑞德启蒙教育&copy; 2016 版权所有</section>
    </footer>
</template>
<script>
    export default{
        data(){
            return{
                
            }
        }
    }
</script>

<style lang="less">
    @fz:100rem;
    .footerNav{
        display:flex;
        height:66/@fz;
        line-height:66/@fz;
        text-align:center;
        font-size:26/@fz;
        background:#eaeaea;
        border-top:#f1f2f2 4/@fz solid;
        border-bottom:#00afd5 4/@fz solid;
        a{
            flex:1;
            border-right:#dadada 1px solid;
            &:nth-child(2){
                border-right:0 none;
                border-left:#fff 1px solid;
            }
        }
    }
    .footerCopy{line-height:46/@fz; text-align:center; background:#e6e6e6;}
</style>