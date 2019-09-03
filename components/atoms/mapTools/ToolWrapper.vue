<template lang="pug">
  building-basic(v-if="attr.type === 'building_basic'"
      :id="id" :attr="attr" :layer-active="layerActive")
  building(v-else-if="attr.type === 'building'"
      :id="id" :attr="attr" :layer-active="layerActive")
  direction(v-else-if="attr.type === 'direction'"
      :id="id" :attr="attr" :layer-active="layerActive")
  pin(v-else-if="attr.type === 'pin'"
      :id="id" :attr="attr" :layer-active="layerActive")
  box(v-else-if="attr.type === 'box'"
      :id="id" :attr="attr" :layer-active="layerActive")
  TextTool(v-else-if="attr.type === 'text'"
    :id="id" :attr="attr" :layer-active="layerActive")
</template>

<script>
import Shared from './Shared'

export default {
  components: {
    BuildingBasic: () => import('./BuildingBasic'),
    Building: () => import('./Building'),
    Direction: () => import('./Direction'),
    Pin: () => import('./Pin'),
    Box: () => import('./Box'),
    TextTool: () => import('./Text')
  },
  mixins: [Shared]
}
</script>
