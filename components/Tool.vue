<template lang="pug">
    example(v-if="attr.type === 'circle'" :id="id" :attr="attr")
    building(v-else-if="attr.type === 'building'" :id="id" :attr="attr")
    building-basic(v-else-if="attr.type === 'building_basic'" :id="id" :attr="attr")
</template>

<script>
import Example from '~/components/map_tools/Example.vue'
import Building from '~/components/map_tools/Building.vue'
import BuildingBasic from '~/components/map_tools/BuildingBasic.vue'

export default {
    components: {
        Building, BuildingBasic, Example
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
