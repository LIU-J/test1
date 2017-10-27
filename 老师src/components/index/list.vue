<template>
     <ul class="list">
        <li v-for="(list,index) in listArr" v-if="index!=0">
          <router-link :to="list.href">
            <i :class="'fa '+list.className"></i>
            {{list.name}}
          </router-link>
        </li>
     </ul>
</template>
<script>
    export default{
        data(){
            return{
                listArr:[
                ]
            }
        },
        mounted(){
            var _this=this;
            _this.$http({//ajax
                method:'get',//请求方式
                url:'/api/index/nav.json',//请求地址(接口)
                //params:{name:name,limit:limit}//params放在url上;body通过http协议传
            }).then(function(data){//data后台响应的数据;success进入
                //赋值给sliderArr数组,
                _this.listArr=data.data;//同步值；或_this.sliderArr=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        }
    }
</script>

<style lang="less" scaped>
  @fz:100rem;
  .list{ 
    display: flex;
    flex-flow:row wrap;
    justify-content:space-around;
    li{
      text-align: center;
      width:180/@fz;
      height: 148/@fz;
      margin:5px 0 5px;
      border-radius: 2px;
      a{ display: flex; flex-flow:column wrap; height: 100%;justify-content:center; color: #fff;}
      i{ font-size: 36px; padding-bottom: 4px;}
      &:nth-child(1){
        background: #0bbebb;
      }
      &:nth-child(2){
        background: #afd23a;
      }
      &:nth-child(3){
        background: #f48221;
      }
      &:nth-child(4){
        background: #de0000;
      }
      &:nth-child(5){
        background: #3eb7ee;
      }
      &:nth-child(6){
        background: #6eb943;
      }
    }
  }
</style>