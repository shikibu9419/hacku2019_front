<template lang="pug">
  .box_tool_block
    .box_tool__title_wrapper
      .box_tool__title {{box_datas.title}}
      .box_tool__buttons
        .box_tool__buttons__icon(
          @click="openComment()"
        )
          CommentsMiniIcon.box_tool__buttons__icon--comments
        .box_tool__buttons__icon(
          @click="openEditor()"
        )
          fa-icon(icon="pen").box_tool__buttons__icon--pen
    .box_tool__contents(v-if="box_datas.data!==null")
      .box_tool__content(
        v-for="(box,box_id) in box_datas.data"
        :key="`box_tool_contents_${box_id}`"
      )
        .box_tool__type(v-if="box.type==='text'")
          BoxText(:box="box")
        .box_tool__type(v-if="box.type==='image'")
          BoxImage(:box="box")
        .box_tool__type(v-if="box.type==='comment'")
          BoxComment(:box="box")
        .box_tool__type(v-if="box.type==='link'")
          BoxLink(:box="box")
</template>
<script>
export default {
  props:["box_datas"],
  components:{
    //components
    BoxText: () => import('~/components/atoms/sunaba/BoxText'),
    BoxImage: () => import('~/components/atoms/sunaba/BoxImage'),
    BoxComment: () => import('~/components/atoms/sunaba/BoxComment'),
    BoxLink: () => import('~/components/atoms/sunaba/BoxLink'),
    //svg
    CommentsMiniIcon: () => import('~/assets/svgs/comment_mini.svg?inline'),
  },
  methods:{
    openComment(){

    },
    openEditor(){

    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

.box_tool_block {
  width: 300px;
}

.box_tool__title_wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  background: $back-light-gray;
  padding: 4px 6px;
  border: 2px solid $gray;
}
.box_tool__title {
  width: 100%;
}
.box_tool__buttons {
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 0;
  flex-shrink: 0;
}
.box_tool__buttons__icon {
  cursor: pointer;
  display: block;
  width: 18px;
  height: 18px;
  margin: 0 2px;
  &--comments {
    width: 18px;
    height: 18px;
  }
  &--pen {
    font-size: 18px;
    padding: 2px;
  }
  svg{
    display: block;
  }
}

.box_tool__contents {
  width: 100%;
  height: auto;
  max-height: 260px;
  overflow-y: auto;
  border: 2px solid $gray;
  border-top: none;
}
.box_tool__content {
  border-top: 1px solid $light-gray;
  &:first-child {
    border: none;
  }
}
</style>