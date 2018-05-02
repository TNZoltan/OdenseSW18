<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="row" style="padding-top: 50px;">
                <p style="font-size: 35px;text-align: center;width: 100%;margin-bottom: 0">Welcome to our Service.</p>
                <p style="font-size: 25px;text-align: center;width: 100%;">Finish the screening process and get some awesome clothes to your doorstep. ;)    </p>
                <div class="col-lg-12" style="max-width: 800px; margin: 0 auto;padding-top: 60px;">
                    <div class="form-group row">
                        <label for="example-text-input" class="col-2 col-form-label">Name</label>
                        <div class="col-10">
                            <input class="form-control" type="text" value="Artisanal kale" id="example-text-input" v-model="username">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="example-password-input" class="col-2 col-form-label">Password</label>
                        <div class="col-10">
                            <input class="form-control" type="password" value="" id="example-password-input">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-2 col-form-label">Size</label>
                        <div class="col-10">
                            <select v-model="size" class="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect">
                                <option selected>Choose your size</option>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                                <option value="xxl">XXL</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="example-email-input" class="col-2 col-form-label">Gender</label>
                        <div class="col-10">
                            <select v-model="gender" class="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect">
                                <option selected>Select your gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>
                    </div>
                    <div class="submit" style="text-align: center; width: 100%;">
                        <button @click="submit()" type="button" class="btn btn-primary" style="font-size: 25px; border-radius: 5px; border: 1px solid white;margin-top: 80px;">Let's start</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import clientapi, { API_ROOT } from '@/functions/clientapi'
    import {EventBus} from './../functions/event-bus'
    export default {
        data () {
            return {
                username: '',
                size: '',
                gender: ''
            }
        },
        methods: {
            submit () {
                let url = API_ROOT + 'register';
                clientapi.makeRequest('POST', url, {
                    'username': this.username,
                    'size': this.size,
                    'gender': this.gender
                })
                EventBus.$emit('registerDone', this.username)
            }
        }
    }
</script>

<style scoped>

</style>