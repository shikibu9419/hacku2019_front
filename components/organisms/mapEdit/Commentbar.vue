<template lang="pug">
    .map_edit__commentbar(v-if="enable" :class="{'map_edit__commentbar--close':menu_close}")
      comment-form
      comment-list
</template>

<script>
export default {
  data() {
    return {
      menu_close:false,
      message: '',
      enable: true
    }
  },
  components: {
    CommentForm: () => import('~/components/molecules/commentbar/CommentForm'),
    CommentList: () => import('~/components/molecules/commentbar/CommentList'),
  },
  computed: {
    layers() {
      return this.$store.state.mapEdit.layers
    }
  },
  methods: {
    // あとでmodalとかに移行
    addLayer() {
      const prop = {
        name: "layer",
        color: "red",
      }
      this.$store.dispatch('mapEdit/addLayer', prop)
    },
    toggleBar() {
      this.menu_close = (this.menu_close ? false:true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

$padding: 15px;

.map_edit__commentbar {
  background-color: $back-gray;
  position: absolute;
  top: 0;
  right: 0;
  width: $sidemenu-width;
  height: 100%;
  padding-left: $padding;
  padding-right: $padding;
  z-index: 10;
  transform: translateX(0);
  transition: .2s $bezier-ease-out;
  &--close{
    transform: translateX(-$sidemenu-width);
    .toggle_commentbar__button_icon{
      transform: scale(-1,1);
    }
  }
}

.toggle_commentbar {
  position: absolute;
  top:12px;
  left: $sidemenu-width;
}
.toggle_commentbar__button {
  background: $white;
  border: 2px solid $dark-gray;
  border-radius: 0 8px 8px 0;
  border-left: none;
  color: $dark-gray;
  padding: 4px 8px;
  padding-left: 4px;
  &:focus{
    outline: none;
    border-color: $theme-pink;
    color: $theme-pink;
  }
}
.toggle_commentbar__button_icon{
  transition: .2s $bezier-ease-out;
  font-size: 1.8rem;
  transform: scale(1);
}
</style>
