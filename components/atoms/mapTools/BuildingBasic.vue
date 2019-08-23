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
import Shared from './Shared.vue'

export default {
    data() {
        return {
            type: 'building_basic',
        }
    },
    mixins: [Shared]
}
</script>
