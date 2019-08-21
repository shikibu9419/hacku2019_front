<template lang="pug">
    building-basic(v-if="attr.type === 'building_basic'" :id="id" :attr="attr"
                   :selected-tools="selectedTools" :grabbing="grabbing" :plotting="plotting")
    building(v-else-if="attr.type === 'building'" :id="id" :attr="attr"
             :selected-tools="selectedTools" :grabbing="grabbing" :plotting="plotting")
    direction(v-else-if="attr.type === 'direction'" :id="id" :attr="attr"
              :selected-tools="selectedTools" :grabbing="grabbing" :plotting="plotting")
</template>

<script>
import BaseTool from './BaseTool'

export default {
    components: {
        BuildingBasic: () => import('./BuildingBasic'),
        Building: () => import('./Building'),
        Direction: () => import('./Direction'),
    },
    mixins: [BaseTool]
}
</script>
