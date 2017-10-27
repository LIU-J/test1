<template>
	<div class="Js-input">
		<label>{{label}}</label>
		<select @change="updateValue($event.target.value)">
			<option v-for="item in options" :value="item.vlaue">item.name</option>
		</select>
	</div>
</template>

<script>
	export default{
		props:["label","options"],
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