<template lang="pug">
  foreignObject.map_edit_tools__pin_popup(v-bind="position" @mousedown.stop="popup")
    comment-box(v-if="comments.length && !Object.keys(content).length" :tool-id="id" :title="title" v-bind="comments[0]" :in-popup="true")
    content-box(v-else :title="title" :content="content" :in-popup="true")
</template>

<script>
export default {
  name: "PinPopup.vue",
  props: ['id', 'position', 'title', 'content', 'comments'],
  methods: {
    popup() {
      this.$emit('popup')
    }
  },
  components: {
    ContentBox: () => import('~/components/atoms/mapEdit/ContentBox'),
    CommentBox: () => import('~/components/atoms/mapEdit/CommentBox')
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit_tools__pin_popup {
  height: 200px;
  width: 150px;
}
</style>
