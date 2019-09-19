<template lang="pug">
  g.map_edit__tools.box(:class="{grab__tool_on: grabbing}" ref="box")
    foreignObject.map_edit_tools.box.content(@dblclick.stop="popup" v-bind="attributes" @mousedown.stop="grab")
      BoxToolBlock(:box_datas="previewContent.box_data")
      // comment-box(v-if="attr.comments.length && !Object.keys(previewContent).length" :title="title" :comment="attr.comments[0].comment")
      // content-box(v-else :title="attr.title" :content="previewContent")
    circle.map_edit__tools.box.resizepoint(
      v-if="selected"
      v-bind="pointPosition"
      @mousedown.stop="grabPoint"
      @mouseup.stop="releasePoint"
    )
</template>

<script>
import ModalSvc from '~/services/ModalSvc';
import Shared from './Shared';

export default {
  components: {
    ContentBox: () => import('~/components/atoms/mapEdit/ContentBox'),
    CommentBox: () => import('~/components/atoms/mapEdit/CommentBox'),
    BoxToolBlock: () => import('~/components/atoms/sunaba/BoxToolBlock'),
  },
  mixins: [Shared, ModalSvc],
  data() {
    return {
      init: true,
      pointGrabbed: false,
      width: 0,
      height: 0,
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

      if (!this.selected || !this.pointGrabbed) return attr;

      const mousePosition = this.$store.state.mapEdit.mousePosition;
      this.width = Math.max(mousePosition.x - attr.x, 0);
      this.height = Math.max(mousePosition.y - attr.y, 0);

      return { ...attr, width: this.width, height: this.height };
    },
    pointPosition() {
      return {
        cx: this.attributes.x + this.width,
        cy: this.attributes.y + this.height,
      };
    },
    typeIs() {
      return function(type) {
        if (type === 'comment') return this.attr.comments.length;
        const contentTypes = this.attr.contents.map(content => content.type);
        return contentTypes.includes(type);
      };
    },
    previewContent() {
      // var content = {}
      // content = this.attr.contents.filter(content => content.type === 'link')[0]  || content
      // content = this.attr.contents.filter(content => content.type === 'text')[0]  || content
      // content = this.attr.contents.filter(content => content.type === 'image')[0] || content
      //return content
      const position = this.attributes;

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
  },
  watch: {
    grabbing() {
      if (!this.init) return;
      this.popup();
      this.init = false;
    },
  },
  mounted() {
    this.width = 300;
  },
  methods: {
    popup() {
      this.openPopup('BoxAndPinPopup', { attr: this.attr }, null);
      this.select();
    },
    grabPoint() {
      this.pointGrabbed = true;
    },
    releasePoint() {
      this.$store.dispatch('mapEdit/resize', {
        toolId: this.id,
        width: this.width,
        height: this.height,
      });
      this.pointGrabbed = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';

.map_edit__tools.box {
  cursor: grab;
  overflow: initial;
  .map_edit_tools.box {
    overflow: initial;
  }

  &.grab__tool_on {
    cursor: grabbing;
  }

  &.resizepoint {
    fill-opacity: 0;
    stroke-opacity: 0;
    r: 3;
    cursor: nwse-resize;
  }
}
</style>
