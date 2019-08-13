<template lang="pug">
    circle.pointer(
        v-bind="attr"
        :cx="attr.x" :cy="attr.y"
        @dblclick.stop="select"
        @mousedown.stop="grab"
        :style="{fill: color}"
    )
</template>

<style lang="scss">
.pointer {
    fill: #42b983;
    cursor: pointer;
}
</style>

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
