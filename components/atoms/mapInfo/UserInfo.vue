<template lang="pug">
  .user_info
    .info_data
      .info_data__icon
        // アイコン変える
        img(src="~/assets/svgs/layer.svg").user_info_icon
      .info_data__main
        .info_data__main__name {{ author }}
      .info_data__right(v-if="editors!==null")
        span + 
        span.info_data__right--strong {{editors.length}}
        span  Editors
      .user_info__editors_list(
        :style="{width: `${ 22 + (10 * editors.length)}px`}"
      )
        .user_info__editors_icon(
            v-for="editor_id in 5"
            :key="`info_editor_${editor_id}`"
            v-if="editors[editor_id-1]"
            :style="{ left: `${10 * editor_id}px`, zIndex: editors.length - editor_id }"
        )
          img(src="~/assets/svgs/layer.svg").user_info_icon


</template>

<script>
export default {
  props: ["author","editors"]
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
@import "~/assets/styles/atoms/mapInfo.scss";

.user_info_icon {
  display: block;
  width: 22px;
  height: 22px;
  background: $back-gray;
  border: 1px solid $gray;
  border-radius: 22px;
}

.user_info_name {
  display: inline;
  font-size: 15px;
}
.user_info__editors_list {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: row-reverse;
  width: min-content;
  height: 22px;
  z-index: 0;
}
.user_info__editors_icon {
  position: absolute;
}

</style>
