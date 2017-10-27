<template>
	<div class="Js-input">
		<label>{{label}}</label>
		<input type="text" :value="value" :placeholder="placeholder" @input="updateValue($event.target.value)" />
	</div>
</template>

<script>
	export default{
		props:["label","value","placeholder"],
		data(){
			return {

			}
		},
		methods:{
			updateValue(result){
			    this.$emit('input',result);//$emit发送'input'可让父组件v-model监听的到
			}
		},
		computed:{
			
		}
	}
</script>

<style lang="less">	

</style>