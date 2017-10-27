<template>
    <section>
        <bespeak-form>
            <span slot="title">课程试听预约</span>
            <span slot="info">免费名额有限，现在就留下您的电话号码，我们的顾问会尽
快联系您，并为您预约一个合适的时间。</span>
            <section slot="main">
                <bespeak-input v-model="bbName" label="宝宝姓名:" placeholder="请输入宝宝姓名"></bespeak-input>
                
                <date-picker v-model="bbBirth" label="宝宝年龄:" field="myDate" placeholder="选择日期"  format="yyyy/mm/dd" :backward="true" :forward="false"></date-picker>

                <bespeak-input v-model="tel" label="联系电话:" placeholder="请输入手机号"></bespeak-input>
            </section>
            <span slot="btn">点击确定</span>
        </bespeak-form>
    </section>
</template>

<script lang="babel">
    import bespeakForm from "./common/form.vue";
    import bespeakInput from "./common/input.vue";
    import bespeakSelect from "./common/select.vue";
    import datePicker from "./common/datePicker-mobi.vue";

    export default{
        data(){
            return{
                bbName:"",
                bbBirth:'',
                tel:'',
                className:'',
                address:'',
                howKnew:''
            }
        },
        //keep-alive导致mounted只会渲染一次
        mounted(){
            
        },
        activated(){
            
        },
        deactivated(){//离开时记录滚动位置
            
        },
        methods:{
        },
        components:{
            bespeakForm,
            bespeakInput,
            bespeakSelect,
            datePicker
        }
    }
</script>

<style lang="less" scoped>
    @fz:100rem;

</style>