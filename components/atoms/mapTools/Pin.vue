<template lang="pug">
  g.map_edit_tools__pin(@dblclick.stop="select" @mousedown.stop="grab" :class="{selected__tool_on: selected, grab__tool_on: grabbing}")
    image.map_edit_tools__pin_icon(
      v-if="typeIs('image')"
      v-bind="attributes"
      xlink:href="~/assets/svgs/image_pin.svg"
    )
    image.map_edit_tools__pin_icon(
      v-else-if="typeIs('text')"
      v-bind="attributes"
      xlink:href="~/assets/svgs/text_pin.svg"
    )
    image.map_edit_tools__pin_icon(
      v-else-if="typeIs('comment')"
      v-bind="attributes"
      xlink:href="~/assets/svgs/comment_pin.svg"
    )
    image.map_edit_tools__pin_icon(
      v-else-if="typeIs('link')"
      v-bind="attributes"
      xlink:href="~/assets/svgs/link_pin.svg"
    )
    image.map_edit_tools__pin_icon(
      v-else
      v-bind="attributes"
      xlink:href="~/assets/svgs/pin.svg"
    )
    pin-popup(v-if="selected && !grabbing" @popup="popup()" :pin_data="pinPopupAttr")
</template>

<script>
import ModalSvc from '~/services/ModalSvc';
import Shared from './Shared';

export default {
  components: {
    PinPopup: () => import('./PinPopup'),
    // 使ってない
    NormalPin: () => import('~/assets/svgs/pin.svg?inline'),
    ImagePin: () => import('~/assets/svgs/image_pin.svg?inline'),
    TextPin: () => import('~/assets/svgs/text_pin.svg?inline'),
    CommentPin: () => import('~/assets/svgs/comment_pin.svg?inline'),
    LinkPin: () => import('~/assets/svgs/link_pin.svg?inline'),
  },
  mixins: [Shared, ModalSvc],
  data() {
    return {
      init: true,
    };
  },
  computed: {
    attributes() {
      this.$store.state.ymap.now; // To observe map scrolling

      const attr = Object.assign(
        {},
        this.attr,
        this.$store.getters['ymap/latLngToPixel'](this.attr)
      );
      delete attr.lat;
      delete attr.lng;

      return attr;
    },
    typeIs() {
      return function(type) {
        if (type === 'comment') return this.attr.comments.length;
        const contentTypes = this.attr.contents.map(content => content.type);
        return contentTypes.includes(type);
      };
    },
    pinPopupAttr() {
      const position = this.attributes;

      // var content = {}
      // content = this.attr.contents.filter(content => content.type === 'link')[0]  || content
      // content = this.attr.contents.filter(content => content.type === 'text')[0]  || content
      // content = this.attr.contents.filter(content => content.type === 'image')[0] || content

      console.log(this.attr);
      let data = [];
      if (this.attr.contents.length !== 0) {
        for (let i = 0; i < this.attr.contents.length; i++) {
          let oneContent = this.attr.contents[i];
          data.push(oneContent);
        }
      }

      if (this.attr.comments.length !== 0) {
        for (let i = 0; i < this.attr.comments.length; i++) {
          let oneComment = this.attr.comments[i];
          let comment = {};
          comment.type = 'comment';
          comment.icon = null;
          comment.username = oneComment.user.name;
          comment.text = oneComment.comment;
          data.push(comment);
        }
      }

      return {
        id: this.id,
        type: this.attr.type,
        position: {
          x: position.x - 140,
          y: position.y - 20,
        },
        box_data: {
          title: this.attr.title,
          data: data,
        },
      };
    },
    mounted() {
      console.log(this.$refs);
    },
  },
  watch: {
    grabbing() {
      if (!this.init) return;
      this.popup();
      this.init = false;
    },
  },
  methods: {
    popup() {
      if (!this.selected || this.grabbing) return;
      this.openPopup('BoxAndPinPopup', { attr: this.attr }, null);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';

.map_edit_tools__pin {
  cursor: grab;

  &.grab__tool_on {
    cursor: grabbing;
  }

  &_icon {
    height: 40px;
  }
}
</style>
