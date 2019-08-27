<template lang="pug">
    building-basic(v-if="attr.type === 'building_basic'"
        :id="id" :attr="attr" :selected="selected" layer-active="layerActive")
    building(v-else-if="attr.type === 'building'"
        :id="id" :attr="attr" :selected="selected" layer-active="layerActive")
    direction(v-else-if="attr.type === 'direction'"
        :id="id" :attr="attr" :selected="selected" layer-active="layerActive")
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
