<template lang="pug">
    circle.tool(
        v-bind="attr"
        :cx="attr.x" :cy="attr.y"
        @dblclick.stop="select"
        @mousedown.stop="grab"
        stroke-width="2"
        :style="{stroke: color}"
    )
</template>

<script>
import BaseTool from './BaseTool.vue'

export default {
    data() {
        return {
            type: 'circle',
        }
    },
    computed: {
        color() {
            return this.isSelected() ? '#42b983' : '#000'
        }
    },
    mixins: [BaseTool]
}
</script>
