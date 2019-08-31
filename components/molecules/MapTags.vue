<template lang="pug">
  .sidebar__map_tags
    img.sidebar__title_icon(src="~assets/svgs/tag.svg")
    p.sidebar__title {{ tags.length }} Tags
    .sidebar__map_tags__tags
      tag(v-for="tag in tags" v-bind="tag" :key="`map_edit_tags_${tag.id}`")
</template>

<script>
import ModalService from '~/services/ModalSvc'
import layer from '~/models/layer'

export default {
  computed: {
    tags() {
      return [{id: 1, name: 'tag1'}, {id: 2, name: 'tag2'}, {id: 3, name: 'tag3'}]
    }
  },
  methods: {
  },
  components: {
    Tag: () => import('~/components/atoms/CardTile/Tag')
  },
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.sidebar__map_tags {
}
</style>
