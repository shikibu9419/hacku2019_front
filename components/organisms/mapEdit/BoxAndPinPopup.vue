<template lang="pug">
    .box-and-pin-popup
        .box-and-pin-popup__title-wrapper
            input.box-and-pin-popup__title(v-model="tool.title")
            DeleteAndCloseButton(:deleteHandler="deletePin" :closeHandler="closeModal")
        .box-and-pin-popup__content
            .box-and-pin-popup--left
                .box-and-pin-popup__information
                    .box-and-pin-popup__info(v-for="(info, i) in tool.contents" :key="`info_${i}`")
                        .box-and-pin-popup__text-info(v-if="info.type === 'text'")
                            .box-and-pin-popup__info-icons
                                img.box-and-pin-popup__info-icon(width="24px" src="~/assets/svgs/text_box.svg")
                                .box-and-pin-popup__info-type Text
                                fa-icon.box-and-pin-popup__sort-up-icon(icon="sort-up" @click="sortUp(i, info)")
                                fa-icon.box-and-pin-popup__sort-down-icon(icon="sort-down" @click="sortDown(i, info)")
                                fa-icon.box-and-pin-popup__close-icon(icon="times" @click="deleteInfo(i)")
                            AutosizeTextarea.box-and-pin-popup__info-textarea(v-bind:text.async="info.text" v-bind:maxSize="6" v-bind:defaultSize="3")
                        .box-and-pin-popup__image-info(v-if="info.type === 'image'")
                            .box-and-pin-popup__info-icons
                                img.box-and-pin-popup__info-icon(width="24px" src="~/assets/svgs/image_box.svg")
                                .box-and-pin-popup__info-type Image
                                fa-icon.box-and-pin-popup__sort-up-icon(icon="sort-up" @click="sortUp(i, info)")
                                fa-icon.box-and-pin-popup__sort-down-icon(icon="sort-down" @click="sortDown(i, info)")
                                fa-icon.box-and-pin-popup__close-icon(icon="times" @click="deleteInfo(i)")
                            .box-and-pin-popup__image-info-content
                                .box-and-pin-popup__images-wrapper
                                    .box-and-pin-popup__image(v-for="(imageUrl, i) in info.urls" :key="`image_${i}`")
                                        img(height="80px" :src="imageUrl")
                                        .box-and-pin-popup__image-close-icon-wrapper
                                            fa-icon.box-and-pin-popup__image-close-icon(icon="times")
                                .box-and-pin-popup__image-info-input 画像ファイルを選択
                        .box-and-pin-popup__link-info(v-if="info.type === 'link'")
                            .box-and-pin-popup__info-icons
                                img.box-and-pin-popup__info-icon(width="24px" src="~/assets/svgs/link_box.svg")
                                .box-and-pin-popup__info-type Link
                                fa-icon.box-and-pin-popup__sort-up-icon(icon="sort-up" @click="sortUp(i, info)")
                                fa-icon.box-and-pin-popup__sort-down-icon(icon="sort-down" @click="sortDown(i, info)")
                                fa-icon.box-and-pin-popup__close-icon(icon="times" @click="deleteInfo(i)")
                            .box-and-pin-popup__link-info-content
                                AutosizeTextarea.box-and-pin-popup__link-info-input(v-bind:text.async="info.link" v-bind:maxSize="1" v-bind:defaultSize="1" v-bind:XScrollable="true")
                                .box-and-pin-popup__link-info-title now loading...
                    .box-and-pin-popup__add-content-wrapper
                        img.box-and-pin-popup__info-icon--plus(width="16px" src="~/assets/svgs/plus.svg")
                        img.box-and-pin-popup__info-icon(width="24px" src="~/assets/svgs/image_box.svg" @click="addInfo('image')")
                        img.box-and-pin-popup__info-icon(width="24px" src="~/assets/svgs/text_box.svg" @click="addInfo('text')")
                        img.box-and-pin-popup__info-icon(width="24px" src="~/assets/svgs/link_box.svg" @click="addInfo('link')")
            .box-and-pin-popup--right
                .box-and-pin-popup__set-layer 属するレイヤー
                    .box-and-pin-popup__selector
                .box-and-pin-popup__set-tool ツールの変更
                    .box-and-pin-popup__selector
                .box-and-pin-popup__comment-wrapper
                    .box-and-pin-popup__info-icons
                        img.box-and-pin-popup__info-icon(width="24px" src="~/assets/svgs/text_box.svg")
                        .box-and-pin-popup__info-type Comments
                    AutosizeTextarea.box-and-pin-popup__info-textarea(v-bind:text.async="comment" v-bind:maxSize="6" v-bind:defaultSize="3")
                    .box-and-pin-popup__commented-button TODO: comment list
                    .box-and-pin-popup__comments
                        .box-and-pin-popup__comment(v-for="(comment, i) in tool.comments" :key="`comment_${i}`")
</template>

<script>
import AutosizeTextarea from '~/components/atoms/AutosizeTextarea'
import DeleteAndCloseButton from '~/components/atoms/mapEdit/DeleteAndCloseButton'
export default {
  name: "BoxAndPinPopup",
  components: {
    AutosizeTextarea,
    DeleteAndCloseButton
  },
  props: {
    params: Object,
    closeModal: () => {}
  },
  data() {
    return {
      tool: {
        title: '中央北口',
        contents: [
        ],
        comments: [
          {
            name: 'John',
            comment: 'ホームから登りのエレベータに乗る方がわかりやすい'
          },
          {
            name: 'John',
            comment: '色々と厳しい。あんまり参加できてなかったけど。'
          },
        ]
      },
      comment: ''
    }
  },
  watch: {
    tool: {
      handler: function (val, oldVal) {
        const attr = Object.assign(JSON.parse(JSON.stringify(this.params.attr)), JSON.parse(JSON.stringify(this.tool)))
        this.$store.dispatch('mapEdit/updateTool', attr)
      },
      deep: true
    }
  },
  methods: {
    getLinkTitle(linkContent) {
      new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.response)
            resolve(xhr.response || 'no title')
          }
        }
        xhr.open('GET', linkContent.link, true)
        xhr.responseType = 'document'
        xhr.send('')
      }).then(value => {
        linkContent.title = value
      })
    },
    addInfo(type) {
      var content = {type: type}
      if (type === 'text')
        content.text = ''
      else if (type === 'image')
        content.urls = []
      else if (type === 'link')
        content.link = ''

      this.tool.contents.push(content)
    },
    deletePin() {
      this.$store.dispatch('mapEdit/deleteTool', this.params.attr.id)
      this.closeModal()
    },
    deleteInfo(i) {
      this.tool.contents.splice(i, 1)
    },
    sortUp(i, info) {
      if (i === 0) return
      this.tool.contents.splice(i, 1)
      this.tool.contents.splice(i - 1, 0, info)
    },
    sortDown(i, info) {
      if (i === this.tool.contents.length - 1) return
      this.tool.contents.splice(i, 1)
      this.tool.contents.splice(i + 1, 0, info)
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/styles/variables";
.box-and-pin-popup {
  height: auto;
  width: 800px;
  display: flex;
  flex-direction: column;
  &__title-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 8px 0;
  }
  &__title {
    border: solid 2px $gray;
    width: 60%;
    height: 32px;
    font-size: 16px;
    margin-right: 8px;
    padding-left: 8px;
  }
  &__content {
    display: flex;
    flex-direction: row;
  }
  &--left {
    width: 60%;
    padding-right: 4px;
  }
  &__information {
    border-radius: 8px;
    background-color: $back-gray;
    padding: 16px;
  }
  &__info {
    margin-bottom: 8px;
  }
  &__info-icons {
    height: 24px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__info-type {
    font-size: 16px;
    margin: 0 auto 0 4px;
  }
  &__sort-up-icon {
    font-size: 24px;
    margin: 0 4px 0;
    transform: translateY(6px);
  }
  &__sort-down-icon {
    font-size: 24px;
    margin: 0 4px 0;
    transform: translateY(-6px);
  }
  &__close-icon {
    font-size: 20px;
    margin: 0 8px 0 16px;
  }
  // Type: text
  &__info-textarea {
    border: solid 2px $gray;
    color: $dark-gray;
  }
  // Type: image
  &__image-info-content {
    height: auto;
    border: solid 2px $gray;
    background: $white;
  }
  &__images-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  &__image {
    position: relative;
    height: 80px;
    margin: 4px 0 4px 4px;
  }
  &__image-close-icon-wrapper {
    $size: 16px;
    position: absolute;
    height: $size;
    width: $size;
    top: 4px;
    right: 4px;
    font-size: calc(100% * 0.8);
    background: $white;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__image-info-input {
    display: flex;
    align-items: center;
    padding-left: 8px;
    height: 32px;
    background: $light-light-gray;
  }
  // Type: link
  &__link-info-content {
    height: auto;
    border: solid 2px $gray;
    background: $white;
  }
  &__link-info-input {
    border: none;
  }
  &__link-info-title {
    display: flex;
    align-items: center;
    padding-left: 8px;
    height: 32px;
    background: $light-light-gray;
    border-top: solid 2px $gray;
    overflow: hidden;
  }
  // add content
  &__add-content-wrapper {
    display: flex;
    justify-content: center;
    background: $dark-gray;
    border-radius: 24px;
    width: fit-content;
    padding: 2px 8px;
  }
  &__info-icon--plus {
    margin-right: 16px;
  }
  // right
  &--right {
    width: 40%;
    display: flex;
    flex-direction: column;
  }
  &__set-layer {
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: $back-gray;
    padding: 8px;
    margin-bottom: 4px;
  }
  &__set-tool {
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    background-color: $back-gray;
    padding: 8px;
    margin-bottom: 4px;
  }
  &__comment-wrapper {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: $back-gray;
    padding: 8px;
    margin-bottom: 4px;
  }
}
</style>
