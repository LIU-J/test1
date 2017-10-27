<template>
	<div class="Js-ts" :style="{display:(prompt.showOrHide==true?'flex':'none')}">
        <span :style="{}">
            <i v-if="prompt.icoBool" class="fa fa-circle-o-notch fa-spin"></i>
            <em>{{prompt.content}}</em>
        </span>
    </div>
</template>

<script>
	export default{
		data(){
			return {

			}
		},
		computed:{
			prompt(){
				//console.log(this.$store.state.prompt.promptJson);
				return this.$store.state.prompt.promptJson;
			}
		}
	}
</script>

<style lang="less">	
.Js-ts{ position:fixed; display:flex; justify-content:center; align-items:center; left:0; top:0; z-index:999999; width:100%; height:100%;
span{background:rgba(0,0,0,0.6); color:#fff; line-height:30px; padding:6px; border-radius:4px; font-size:16px;}
}
</style>