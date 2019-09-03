<template lang="pug">
  foreignObject.map_edit_tools__pin_popup(
      v-bind="pin_data.position"
      @mousedown.stop="popup"
    )
    .box_tool_block()
      BoxToolBlock(:box_datas="pin_data.box_data")
    //comment-box(v-if="comments.length && !Object.keys(content).length" :tool-id="id" :title="title" v-bind="comments[0]" :in-popup="true")
    //content-box(v-else :title="title" :content="content" :in-popup="true")
</template>

<script>
export default {
  name: "PinPopup.vue",
  props: ['pin_data'],
  methods: {
    popup() {
      this.$emit('popup')
    }
  },
  components: {
    ContentBox: () => import('~/components/atoms/mapEdit/ContentBox'),
    CommentBox: () => import('~/components/atoms/mapEdit/CommentBox'),
    BoxToolBlock: () => import('~/components/atoms/sunaba/BoxToolBlock')
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit_tools__pin_popup {
  position: relative;
  height: 10px;
  width: 300px;
  overflow: inherit;
}
.box_tool_block {
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  width: min-content;
  height: min-content;
}
</style>
