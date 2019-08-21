<template lang="pug">
    circle.tool(
        v-bind="attr"
        :cx="attr.x" :cy="attr.y"
        @dblclick.stop="select"
        @mousedown.stop="grab"
        stroke-width="2"
        :style="{stroke: color}"
        v-on:click="enable(true)"
    )
        popup-layer(
            v-bind:enable.sync="popupLayerEnable"
        )
</template>

<script>
    import BaseTool from './BaseTool.vue'
    import PopupLayer from './PopupLayer'

    export default {
        data() {
            return {
                type: 'pin',
                popupLayerEnable: false
            }
        },
        mixins: [BaseTool],
        components: {
            PopupLayer
        },
        methods: {
            enable(bool) {
                this.popupLayerEnable = bool;
            }
        }
    }
</script>

<style>

</style>