<template>
    <div class="listSort">
    	<div class="listSort-img"><img v-if="list.imgUrl" :src="list.imgUrl" /></div>
        <dl class="listSort-nav" v-if="list.list" v-for="item in list.list">
            <dt v-if="item.name">{{item.name}}</dt>
            <dd v-if="item.list" v-for="oneItem in item.list">
                <router-link :to="oneItem.href"><em>{{oneItem.name}}</em><span class="fa fa-chevron-right"></span></router-link>
            </dd>
        </dl>
    </div>
</template>

<script lang="babel">

    export default{
        props:['list'],
        data(){
            return{
                
            }
        },
        components:{
        }
    }
</script>

//scoped表示局部使用
<style lang="less" scoped>
    @fz:100rem;
    .listSort{ text-align: center;}
    .listSort-img{
        img{width: 100%;}
    }
    .listSort-nav{
        display: flex;
        flex-flow:row wrap;
        justify-content:center;
        font-size: 28/@fz;
        padding-bottom:68/@fz;
        dt{ width: 100%; border-bottom: #00afd4 4/@fz solid; background: #ececec; line-height: 67/@fz;
            &:nth-child(1){margin-bottom: 46/@fz;}
        }
        dd{ width: 90%; background: #fafafa;line-height: 86/@fz; border-radius: 4/@fz; border:1px solid #d4d4d4; margin-bottom: 2px;
            &:nth-child(1){margin-top: 46/@fz;}
        }
        a{
            display: flex;
            em{flex:530;}
            span{ flex:45; text-align:left; align-self:center; color: #999;}
            &:active{color: #fff; background: #0088c6;}
        }
    }
</style>