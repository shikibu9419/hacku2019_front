<template lang="pug">
    example(v-if="attr.type === 'circle'" :id="id" :attr="attr")
    building(v-else-if="attr.type === 'building'" :id="id" :attr="attr")
    building-basic(v-else-if="attr.type === 'building_basic'" :id="id" :attr="attr")
    direction(v-else-if="attr.type === 'direction'" :id="id" :attr="attr")
    pin(v-else-if="attr.type === 'pin'" :id="id" :attr="attr")
</template>

<script>
import Example from '~/components/map_tools/Example.vue'
import Building from '~/components/map_tools/Building.vue'
import BuildingBasic from '~/components/map_tools/BuildingBasic.vue'
import Direction from '~/components/map_tools/Direction.vue'
import Pin from '~/components/map_tools/Pin.vue'

export default {
    components: {
        Example,
        Building,
        BuildingBasic,
        Direction,
        Pin
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
