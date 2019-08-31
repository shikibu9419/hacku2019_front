<template lang="pug">
  .sidebar__map_tags
    img.sidebar__title_icon(src="~assets/svgs/tag.svg")
    p.sidebar__title {{ tags.length }} Tags
    .sidebar__map_tags__tags
      tag(v-for="tag in tags" v-bind="tag")
</template>

<script>
import ModalService from '~/services/ModalSvc'
import layer from '~/models/layer'

export default {
  computed: {
    tags () {
      return [{name: 'tag1'}, {name: 'tag2'}, {name: 'tag3'}]
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
