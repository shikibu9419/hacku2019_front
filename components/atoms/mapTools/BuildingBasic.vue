<template lang="pug">
    rect.map_edit__tool__box(
        v-bind="attr"
        @dblclick.stop="select"
        @mousedown.stop="grab"
        :class="{selected__tool_on: selected}"
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

<style lang="scss">
.map_edit__tool__box {
    fill-opacity: 0;
    cursor: pointer;
    stroke-width: 2;
    stroke: #000;  // unselected color

    &.selected__tool_on {
        stroke: #42b983;  // selected color
    }
}
</style>
