<template lang="pug">
    circle.tool(
        v-bind="attr"
        :cx="attr.x" :cy="attr.y"
        @dblclick.stop="select"
        @mousedown.stop="clearSelect"
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
        mixins: [BaseTool],
        methods: {
            clearSelect() {
                this.$store.dispatch("board/clearSelection");
            }
        }
    }
</script>
