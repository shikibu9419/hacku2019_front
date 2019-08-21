<template lang="pug">
    rect.popup-layer(
        v-bind:class="{active: !enable}"
    )
</template>

<script>
    export default {
        name: "PopupLayer.vue",
        props: {
            enable: Boolean
        },
        created() {
            this.timeoutDisable()
        },
        methods: {
            timeoutDisable() {
                setTimeout(_ => {
                    console.log(this.enable)
                }, 5000)
            }
        }
    }
</script>

<style scoped>
    .popup-layer {
        height: 100px;
        width: 100px;
        background-color: black;
    }
    .active {
        display: none;
    }
</style>