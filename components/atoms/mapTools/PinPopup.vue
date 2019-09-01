<template lang="pug">
  foreignObject.map_edit_tools__pin_popup(v-bind="position" @mousedown.stop="popup")
    content-box(:title="title" :content="content")
</template>

<script>
export default {
  name: "PinPopup.vue",
  props: ['position', 'title', 'content'],
  methods: {
    popup() {
      this.$emit('popup')
    }
  },
  components: {
    ContentBox: () => import('~/components/atoms/mapEdit/ContentBox')
  },
  mounted() {
    console.log('hoge', this.title, this.content)
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit_tools__pin_popup {
  height: 100px;
  width: 100px;
}
</style>
