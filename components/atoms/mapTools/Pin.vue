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
    import BaseTool from './Shard.vue'

    export default {
        data() {
            return {
                type: 'pin',
                popupLayerEnable: false
            }
        },
        methods: {
            enable(bool) {
                this.popupLayerEnable = bool;
            }
        },
        components: {
            PopupLayer: () => import('./PopupLayer')
        },
        mixins: [Shard],
    }
</script>

<style>

</style>
