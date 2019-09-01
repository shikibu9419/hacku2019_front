<template lang="pug">
  .sidebar__map_tags
    .sidebar__edit_category
      img.sidebar__edit_category__icon(src="~assets/svgs/tag.svg")
      .sidebar__edit_category__text
        span.sidebar__edit_category__text--strong {{tags.length}}
        span  Tags
    .sidebar__map_tags__tags(
      @click="editTags()"
    ) Edit
      .sidebar__map_tags__tag(v-for="tag in tags" v-bind="tag" :key="`map_edit_tags_${tag.id}`")
        .sidebar__map_tags__tag__text {{tag.name}}
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
    editTags(){
      // タグ検索inputを表示
    }
  },
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
