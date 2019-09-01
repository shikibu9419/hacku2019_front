<template lang="pug">
  .sidebar__map_tags
    .sidebar__edit_category
      img.sidebar__edit_category__icon(src="~assets/svgs/tag.svg")
      .sidebar__edit_category__text
        span.sidebar__edit_category__text--strong {{tags.length}}
        span  Tags
    vue-tags-input(
      v-if="editingTags"
      :selected-tags="tags"
      :existing-tags="existingTags"
      v-on:edit-tags-finish="editTagsFinish"
    )
    .sidebar__map_tags__tags(
      @click="editTags()"
    )
      .sidebar__map_tags__tag(v-for="tag in tags" v-bind="tag" :key="`map_edit_tags_${tag.id}`")
        .sidebar__map_tags__tag__text {{tag.name}}
</template>

<script>
import ModalService from '~/services/ModalSvc'
import layer from '~/models/layer'
import VueTagsInput from '~/components/atoms/VueTagsInput'

export default {
  components: { VueTagsInput },
    data() {
      return {
        editingTags: false,
        tags: []
      }
    },
  computed: {
    existingTags() {
      return [{key: 100, value: 'red'}, {key: 101, value: 'blue'}, {key: 102, value: 'green'}]
    }
  },
  methods: {
    editTags() {
      // タグ検索inputを表示
      this.editingTags = true
    },
    editTagsFinish() {
      this.tags = this.$store.getters['mapEdit/getTags']
      this.editingTags = false
    },
  },
  mounted() {
    this.tags = [{key: 1, value: 'tag1'}, {key: 2, value: 'tag2'}, {key: 3, value: 'tag3'}]
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
@import "~/assets/styles/atoms/Sidebar.scss";

.sidebar__map_tags__tags {
  display: flex;
}
.sidebar__map_tags__tag {
  padding: 1px 8px;
  background: $white;
  margin-right: 4px;
  border-radius: 8px;
  &__text {
    @include noto-font(1.4rem);
  }
}
</style>
