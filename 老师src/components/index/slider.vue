<template>
    <section class="slider" @touchstart="sliderMove" @touchmove="sliderMove" @touchend="sliderMove">
       <ul class="slider-img" :class="{sliderAni:sliderAniBool}" :style="{width:sliderArr.length*100+'%',left:sliderX+'px'}">
           <li v-for="slider in sliderArr">
                <router-link :to="slider.toUrl">
                    <img :src="slider.imgUrl" />
                </router-link>
           </li>
       </ul>
       <div class="slider-btn">
           <span v-for="(span,index) in sliderArr" :class="{current:(index==sliderCur)}" >{{index}}</span>
       </div>
    </section>
</template>
<script>
    
    export default{
        data(){
            return{
                sliderArr:[],//图数据
                sliderAniBool:false,//是否做动画
                sliderCur:0,//当前位置
                sliderX:0,//移动的值
                startX:0,//起始坐标
                endX:0,//结束坐标
                startY:0,
                endY:0
            }
        },
        methods:{
            sliderMove(e){
                var _this=this;
                var width=_this.$el.clientWidth;
                var height=_this.$el.clientHeight;
                if(e.type!="touchend"){
                    var target=e.targetTouches[0];
                    var pageX=target.pageX;
                    var pageY=target.pageY;
                }

                if(e.type=="touchstart"){
                    _this.startX=pageX;
                    _this.startY=pageY;
                    _this.sliderAniBool=false;
                }
                else if(e.type=="touchmove"){
                    _this.endX=pageX;
                    _this.endY=pageY;
                    _this.sliderX=-width*_this.sliderCur+_this.endX-_this.startX;
                    if(Math.abs(_this.endX-_this.startX)>0 && Math.abs(_this.endY-_this.startY)<height/4){//移动端流畅兼容uc及微信
                        e.preventDefault();
                    }
                }
                else if(e.type=="touchend"){
                    var longStep=width/5;
                    if(_this.endX-_this.startX>longStep){//手指向右
                        if(_this.sliderCur!=0){
                            _this.sliderCur--;
                            
                        }
                    }
                    else if(_this.endX-_this.startX<-longStep){//手指向左
                        if(_this.sliderCur!=_this.sliderArr.length-1){
                            _this.sliderCur++;
                            
                        }
                    }

                    _this.sliderX=-_this.sliderCur*width;
                    _this.sliderAniBool=true;
                }
            }
        },
        mounted(){//
            var _this=this;

            _this.$http({//ajax
                method:'get',//请求方式
                url:'/api/index/slider.json?v/1.0.0',//请求地址(接口)
                params:{}//data发送到后台数据
            }).then(function(data){//data后台响应的数据;success进入
                //赋值给sliderArr数组,
                _this.sliderArr=data.data;//同步值；或_this.sliderArr=data.body;
            },function(error){//error进入
                //error
                console.log(error);
            });
        }
    }
</script>

<style lang="less" scaped>
    @fz:100rem;
    .slider{
        position:relative;
        width:100%;
        height: 370/@fz;
        overflow: hidden;
        .slider-img{ display: flex; position:relative;}
        .sliderAni{transition:left .3s;}
        li{
            flex:1;
        }
        img{width:100%;}
        .slider-btn{position: absolute; left: 0; bottom:0; width:100%; height: 44/@fz; padding-top: 14/@fz; text-align: center; background:rgba(241,242,242,0.6);}
        span{display:inline-block;width:15/@fz; height:15/@fz; background: #fff; vertical-align: top; border-radius: 50%; line-height: 100px; margin-left: 6/@fz;}
        .current{ background:#6a6060;}
    }
</style>