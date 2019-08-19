<template lang="pug">
    polygon.tool(
        v-bind="attr"
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
            type: 'building',
        }
    },
    mixins: [BaseTool]
}
</script>
