<template>
	<section class="Js-form">
		<h3 class="Js-f-title"><slot name="title"></slot></h3>
		<section class="Js-f-info">
			<slot name="info"></slot>
		</section>
		<section class="Js-f-main">
			<slot name="main"></slot>
		</section>
		<button class="Js-f-btn"><slot name="btn"></slot></button>
	</section>
</template>

<script>
	export default{
		data(){
			return {

			}
		},
		computed:{
			
		}
	}
</script>

<style lang="less">	
@fz:100rem;
.Js-form{ width:92%; background:#fff; margin: 25/@fz auto 35/@fz; border-radius: 4/@fz; border-bottom: 8/@fz solid #433c3c; padding-bottom: 38/@fz;
	.Js-f-title{ line-height:105/@fz; padding-left:32/@fz; font-size:18px; background:#443b3c; color: #fff;}
	.Js-f-info{ margin:14/@fz; background:#f0f0f0; line-height:33/@fz; color:#666; padding: 14/@fz 32/@fz; border-radius: 4/@fz; }
	.Js-f-main{ width:84%; margin:22/@fz 0 96/@fz 46/@fz;}
	.Js-f-btn{ display:block; margin:0 auto; width:83%; line-height:62/@fz; border:0 none; background:#db3129; color:#fff; border-radius: 4/@fz;
		span{display:block;}
	}
}
</style>