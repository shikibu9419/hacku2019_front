<template lang="pug">
    building-basic(v-if="attr.type === 'building_basic'" :id="id" :attr="attr" :selected="selected")
    building(v-else-if="attr.type === 'building'" :id="id" :attr="attr" :selected="selected")
    direction(v-else-if="attr.type === 'direction'" :id="id" :attr="attr" :selected="selected")
</template>

<script>
import Shared from './Shared'

export default {
    components: {
        BuildingBasic: () => import('./BuildingBasic'),
        Building: () => import('./Building'),
        Direction: () => import('./Direction'),
    },
    mixins: [Shared]
}
</script>
