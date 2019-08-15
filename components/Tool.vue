<template lang="pug">
    example(v-if="attr.type === 'circle'" :id="id" :attr="attr")
<<<<<<< HEAD
    building(v-else-if="attr.type === 'building'" :id="id" :attr="attr")
    building-basic(v-else-if="attr.type === 'building_basic'" :id="id" :attr="attr")
||||||| merged common ancestors
=======
    direction(v-else-if="attr.type === 'direction'" :id="id" :attr="attr")
>>>>>>> Add direction tool
</template>

<script>
import Example from '~/components/map_tools/Example.vue'
import Building from '~/components/map_tools/Building.vue'
import BuildingBasic from '~/components/map_tools/BuildingBasic.vue'
import Direction from '~/components/map_tools/Direction.vue'

export default {
    components: {
        Example,
        Building, BuildingBasic
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
