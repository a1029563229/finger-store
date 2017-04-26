<template>
    <div class="vp-mb animated fadeIn">
        <div class="vp-alert vp-alert-center animated zoomIn">
            <div class="vp-alert-title">
                <span>{{title}}</span>
                <span @click="hideButton">X</span>
            </div>
            <div class="vp-alert-content">
                {{content}}
            </div>
            <div class="vp-alert-btn">
                <button type="button" class="vp-btn vp-btn-primary" @click="hideButton">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    import 'animate.css';
    export default {
        name:'VpAlert',

        props:['title', 'content', 'type'],

        methods:{
            hideButton() {
                this.$alert.close();
            }
        }
    }
</script>

<style lang="less" scoped rel="stylesheet/less" type="text/css">
    @import '../../../assets/css/flex';
    .vp-mb{
        background-color:rgba(0,0,0,.5);
        width: 100%;
        height:100%;
        position: fixed;
        left:0;
        top:0;
        display:table;
        text-align: center;
    }
    .animated{
        animation-duration:.5s;
    }
    .vp-mb::after{
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 100%;
        content:'';
    }
    .vp-alert{
        font-family: '微软雅黑';
        background-color:#fff;
        text-align: left;
        width: 75%;
        display: inline-block;
        vertical-align: middle;
        color: #333;
        box-shadow:1px 1px 50px rgba(0,0,0,.3);
        &-title{
            background: #F8F8F8;
            padding: 10px 20px;
            overflow: hidden;
            :first-child{
                float: left;
            }
            :last-child{
                float: right;
            }
        }
        &-content{
            padding: 20px;
        }
        &-btn{
            margin: 30px 20px 10px 20px;
            overflow: hidden;
            button{
                float: right;
            }
        }
    }
    
</style>