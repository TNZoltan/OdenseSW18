<template>
    <div class="row">
        <div class="col-lg-12" style="padding-top: 50px;text-align: center;">
            <span  @click="pointer++" v-if="pointer===-1" style="margin-top:200px;" class="btn btn-info">Start the screening</span>
            <h2 v-if="pointer>=0 && pointer<screeningElements.length">Would you wear this piece of clothing?</h2>
            <h2 v-if="pointer===screeningElements.length">Thanks for filling this out.</h2>
            <template  v-for="(element,index) in screeningElements" v-if="index===pointer">
                <span style="width: 100%;height: 400px;">
                    <img :src="getName(element)" style="height:400px;" alt="">
                </span>
                <div class="row" style="margin-top: 20px; ">
                    <span style="width: 400px;margin: 0 auto;">
                        <button @click="saveDislike()" class="btn form-control btn-success" >Yes!</button>
                    </span>
                </div>
                <div class="row" style="margin-top: 10px;">
                    <div style="width: 400px;margin: 0 auto;">
                        <span style="width: 180px;">
                            <button @click="saveDislike(null, element.style)" class="btn  btn-danger">I don't like the style</button>
                        </span>
                        <span style="width: 180px;">
                            <button @click="saveDislike(element.color, null)" class="btn btn-danger">I don't like the color</button>
                        </span>
                    </div>

                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import cHandler from '@/functions/cookie'
    import clientapi, { API_ROOT } from '@/functions/clientapi'
    import {EventBus} from './../functions/event-bus'
    export default {
        data () {
            return {
                pointer: -1,
                screeningElements:[
                    {
                        name: 'a.jpg',
                        color: 'blue',
                        style: 'buscasual'
                    },
                    {
                        name: 'b.jpg',
                        color: 'green',
                        style: 'vintage'
                    },
                    {
                        name: 'c.jpg',
                        color: 'red',
                        style: 'casual'
                    },
                    {
                        name: 'd.jpg',
                        color: 'orange',
                        style: 'sporty'
                    }
                ],
                listOfDislikes: []
            }
        },
        methods: {
            getName(element) {
                return 'website/assets/images/' + element.name
            },
            saveDislike(color = null, style = null) {
                if (color) {
                    this.listOfDislikes.push({
                        type: 'color',
                        dislike: color
                    })
                }
                if (style) {
                    this.listOfDislikes.push({
                        type: 'style',
                        dislike: style
                    })
                }
                this.pointer++;
                if (this.pointer === this.screeningElements.length) {
                    let url = API_ROOT + 'dislikes';
                    clientapi.makeRequest('POST', url, {
                        username: cHandler.getCookie('username'),
                        dislikes: this.listOfDislikes
                    })
                    setTimeout(() => {EventBus.$emit('screeningDone')},1500)
                }
            }
        }
    }
</script>

<style scoped>

</style>