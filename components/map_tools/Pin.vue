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
        information-layer(
            v-bind:enable.sync="informationLayerEnable"
        )
</template>

<script>
    import BaseTool from './BaseTool.vue'
    import InformationLayer from './InformationLayer'

    export default {
        data() {
            return {
                type: 'pin',
                informationLayerEnable: false
            }
        },
        mixins: [BaseTool],
        components: {
            InformationLayer
        },
        methods: {
            enable(bool) {
                this.informationLayerEnable = bool;
            }
        }
    }
</script>

<style>

</style>