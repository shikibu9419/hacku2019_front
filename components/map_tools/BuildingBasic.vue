<template lang="pug">
    rect.tool(
        v-bind="attr"
        @dblclick.stop="select"
        @mousedown.stop="clearSelect"
        stroke-width="2"
        :style="{stroke: color}"
    )
</template>

<script>
import BaseTool from './BaseTool.vue'

export default {
    data() {
        return {
            type: 'building_basic',
        }
    },
    mixins: [BaseTool],
    methods: {
        clearSelect() {
            this.$store.dispatch("board/clearSelection");
        }
    }
}
</script>
