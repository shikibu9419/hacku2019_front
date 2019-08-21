<template lang="pug">
    circle.tool(
        v-bind="attr"
        :cx="attr.x" :cy="attr.y"
        @dblclick.stop="select"
        @mousedown.stop="grab"
        :style="{stroke: color}"
    )
</template>

<script>
import Shared from './Shared.vue'

export default {
    data() {
        return {
            type: 'circle',
        }
    },
    mixins: [Shared]
}
</script>
