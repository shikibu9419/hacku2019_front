<template lang="pug">
    rect.tool(
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
            type: 'rect',
        }
    },
    mixins: [BaseTool]
}
</script>
