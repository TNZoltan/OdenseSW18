<template>
    <div >
        <div id="header" style="width: 100%; height: 70px;border-bottom: 3px solid lightgrey;background: white;">
            <div style="padding-top: 5px;padding-left:50px;width:200px;clear:both;">
                <img src="website/assets/images/logo.png" alt="" style="height: 60px;">
            </div>
            <div style="position: absolute;right:50px;top: 25px;color: #618685;clear:both;">
                <template v-if="loggedIn !== ''">
                    Welcome, {{ this.loggedIn }}
                    <button @click="signOut()" class="btn btn-danger" style="margin-left: 30px;font-size: 12px;">Sign out</button>
                </template>
            </div>
        </div>
        <div class="container">
            <frontpage>
            </frontpage>
        </div>
    </div>
</template>

<script>
    import FrontpageFile from '@/components/Frontpage.vue'
    import {EventBus} from './functions/event-bus'
    import cHandler from '@/functions/cookie'
    export default {
        data () {
            return {
                loggedIn: ''
            }
        },
        created () {
            EventBus.$on('showName', (event) => {
                this.loggedIn = event
            })
        },
        methods: {
            signOut () {
                cHandler.eraseCookie('username');
                cHandler.eraseCookie('screened');
                location.reload();
            }
        },
        components: {
            'frontpage': FrontpageFile
        }
    }
</script>

<style>
    @import 'bootstrap.min.css';
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans');


    body {
        width: 100%;
        height: 100%;
        padding: 0;
        background:#d5f4e6;
        font-family: 'Noto Sans', sans-serif;
        color: #618685;
    }
</style>