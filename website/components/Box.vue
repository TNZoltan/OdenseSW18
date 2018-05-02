<template>
    <div>
        <div style="width:100%;padding-top: 50px;text-align: center;">
            <span @click="deliverBox()" class="btn btn-primary" style="font-size:20px;" :class="{blue: receivedFirst}">
                <template v-if="!receivedFirst">DELIVER MY NEW BOX</template>
                <template v-if="receivedFirst">DELIVER THE NEXT BOX</template>
            </span>
        </div>
        <transition name="fade">
            <div v-if="showBox" style="height:450px;width:1000px;margin: 20px auto;border: 5px solid #653221;background:#9f6934;padding:15px;">
                <div style="width:100%;height:100%;background: white;text-align: center; white-space: nowrap;">
                    <img :src="getName(0)" style="height:250px;margin:100px 50px;" alt="">
                    <img :src="getName(1)" style="height:250px;margin:100px 50px;" alt="">
                    <img :src="getName(2)" style="height:250px;margin:100px 50px;" alt="">
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import clientapi, { API_ROOT, GLOBAL_BOX } from '@/functions/clientapi'
    import {EventBus} from './../functions/event-bus'
    import cHandler from '@/functions/cookie'
    export default {
        data () {
            return {
                receivedFirst: false,
                showBox: false,
                box: []
            }
        },
        methods: {
            deliverBox() {
                let url = API_ROOT + 'deliver';
                clientapi.makeRequest('POST', url, {
                    'username': cHandler.getCookie('username')
                })
                this.showBox = false;
                setTimeout(()=>{
                    this.box = JSON.parse(GLOBAL_BOX);
                    this.receivedFirst = true;
                    this.showBox = true;
                },2000)
            },
            getName (index) {
                if (this.box.length !== 0)
                    return 'website/assets/images/' + this.box[index].img
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
        transition-delay: 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .blue{
        background: green !important;
    }
</style>