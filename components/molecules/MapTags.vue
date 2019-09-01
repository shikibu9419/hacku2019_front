<template lang="pug">
  .sidebar__map_tags
    img.sidebar__title_icon(src="~assets/svgs/tag.svg")
    p.sidebar__title {{ existingTags.length }} Tags
    .sidebar__map_tags__tags
      vue-tags-input(:existing-tags="existingTags")
</template>

<script>
import ModalService from '~/services/ModalSvc'
import layer from '~/models/layer'
import VueTagsInput from '~/components/atoms/VueTagsInput'

export default {
    components: {VueTagsInput},
    computed: {
    existingTags() {
      return [{key: 1, value: 'tag1'}, {key: 2, value: 'tag2'}, {key: 3, value: 'tag3'}]
    }
  },
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.sidebar__map_tags {
}
</style>
