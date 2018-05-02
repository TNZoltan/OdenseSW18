<template>
    <div>
        <register v-if="showRegister"></register>
        <div v-if="loading" id="loading" style="text-align: center;padding: 30vh;">
            <img src="../assets/images/loading.gif" alt="">
        </div>
        <screening v-if="showScreening"></screening>
        <box v-if="showBox"></box>
    </div>
</template>

<script>
    import cHandler from '@/functions/cookie'
    import Register from './Register.vue'
    import Screening from './Screening'
    import Box from './Box'
    import {EventBus} from './../functions/event-bus'

    export default {
        data () {
            return {
                showRegister: true,
                showScreening: false,
                showBox: false,
                loading: false
            }
        },
        created () {
            if(cHandler.getCookie('username')) {
                EventBus.$emit('showName', cHandler.getCookie('username'))
                this.showRegister = false;
                this.showScreening = true
            }
            if (cHandler.getCookie('screened')) {
                this.showScreening = false;
                this.showBox = true;
            }
            EventBus.$on('registerDone', (event) => {
                this.loading = true;
                this.showRegister = false;
                cHandler.setCookie('username', event)
                setTimeout(() => {
                    this.loading = false
                    this.showScreening = true;
                    EventBus.$emit('showName', cHandler.getCookie('username'))
                }, 2000)
            })
            EventBus.$on('screeningDone', (event) => {
                this.loading = true;
                this.showScreening = false;
                cHandler.setCookie('screened', true)
                setTimeout(() => {
                    this.loading = false;
                    this.showBox = true;
                },1000)
            })
        },
        methods: {

        },
        components: {
            'register': Register,
            'screening': Screening,
            'box': Box
        }
    }
</script>