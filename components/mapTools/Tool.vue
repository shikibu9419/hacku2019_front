<template lang="pug">
    building-basic(v-if="attr.type === 'building_basic'" :id="id" :attr="attr")
    building(v-else-if="attr.type === 'building'" :id="id" :attr="attr")
    direction(v-else-if="attr.type === 'direction'" :id="id" :attr="attr")
</template>

<script>
import BuildingBasic from './BuildingBasic.vue'
import Building from './Building.vue'
import Direction from './Direction.vue'

export default {
    components: {
        BuildingBasic,
        Building,
        Direction,
    },
    props: {
        id: {
            type: String,
            required: true
        },
        attr: {
            type: Object,
            required: true
        }
    },
}
</script>
