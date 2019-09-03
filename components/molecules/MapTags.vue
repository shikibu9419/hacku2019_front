<template lang="pug">
  .sidebar__map_tags
    .sidebar__edit_category
      img.sidebar__edit_category__icon(src="~assets/svgs/tag.svg")
      .sidebar__edit_category__text
        span.sidebar__edit_category__text--strong {{tags.length}}
        span  Tags
    .sidebar__map_tags__tags
      .sidebar__map_tags__tags__wrapper(
          v-if="!editingTags"
          @click="editTags()"
          :class="{'sidebar__map_tags__tags__wrapper--click':viewOnly}"
        )
        .sidebar__map_tags__tag(v-for="(tag, index) in tags" v-bind="tag" :key="`map_edit_tags_${tag.key}_${index}`")
          .sidebar__map_tags__tag__text {{tag.value}}
      .vue_tags_input__wrapper(
        v-if="viewOnly"
      )
        vue-tags-input(
          v-if="editingTags"
          :selected-tags="tags"
          :existing-tags="existingTags"
          @edit-tags-finish="editTagsFinish"
          :placeholder="'タグを追加'"
          :button_text="'保存'"
        )
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
  mounted(){
    console.log(this.$route.path)
    console.log(this.$route.name)
  },
  computed: {
    existingTags() {
      return [{key: 100, value: 'red'}, {key: 101, value: 'blue'}, {key: 102, value: 'green'}]
    },
    viewOnly(){
      if(this.$route.path.match(/\/view$/)){
        return false
      }
      if(this.$route.path.match(/\/edit$/)){
        return true
      }
    }
  },
  methods: {
    editTags() {
      // タグ検索inputを表示
      if(this.$route.path.match(/\/edit$/)){
        this.editingTags = true;
      }
    },
    editTagsFinish(tags) {
      this.$store.dispatch('mapEdit/updateTags', tags)
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
  width: 100%;
}
.sidebar__map_tags__tags__wrapper{
  width: 100%;
  min-height: 20px;
  border-radius: 8px;
}
.sidebar__map_tags__tags__wrapper--click {
  cursor: pointer;
  &:hover {
    background: $back-light-gray
  }
}
.sidebar__map_tags__tag {
  display: inline-block;
  margin-bottom: 4px;
  padding: 1px 8px;
  background: $white;
  margin-right: 4px;
  border-radius: 8px;
  &__text {
    @include noto-font(1.4rem);
  }
}
</style>
