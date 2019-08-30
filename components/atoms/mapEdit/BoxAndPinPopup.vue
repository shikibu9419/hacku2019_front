<template lang="pug">
    .box-and-pin-popup
        .box-and-pin-popup--left
            .box-and-pin-popup__left-content
                .box-and-pin-popup__title {{testParams.title}}
                .box-and-pin-popup__information
                    .box-and-pin-popup__info(v-for="info in testParams.information")
                        .box-and-pin-popup__text-info(v-if="info.type === 'text'")
                            .box-and-pin-popup__info-icons
                                img.box-and-pin-popup__info-icon(width="24px" src="~/assets/svgs/text_box.svg")
                                .box-and-pin-popup__info-type Text
                                fa-icon.box-and-pin-popup__sort-up-icon(icon="sort-up")
                                fa-icon.box-and-pin-popup__sort-down-icon(icon="sort-down")
                                fa-icon.box-and-pin-popup__close-icon(icon="times")
                            AutosizeTextarea.box-and-pin-popup__info-textarea(v-bind:text.async="info.content.text" v-bind:maxSize="6")
                        .box-and-pin-popup__image-info(v-if="info.type === 'image'")
                            .box-and-pin-popup__info-icons
                                img.box-and-pin-popup__info-icon(width="24px" src="~/assets/svgs/image_box.svg")
                                .box-and-pin-popup__info-type Image
                                fa-icon.box-and-pin-popup__sort-up-icon(icon="sort-up")
                                fa-icon.box-and-pin-popup__sort-down-icon(icon="sort-down")
                                fa-icon.box-and-pin-popup__close-icon(icon="times")
                            .box-and-pin-popup__image-info-content
                                .box-and-pin-popup__images-wrapper
                                    .box-and-pin-popup__image(v-for="(imageUrl, i) in info.content.urls" :key="`image_${i}`")
                                        img(height="80px" :src="imageUrl")
                                        .box-and-pin-popup__image-close-icon-wrapper
                                            fa-icon.box-and-pin-popup__image-close-icon(icon="times")
                                .box-and-pin-popup__image-info-input 画像ファイルを選択
                        .box-and-pin-popup__link-info(v-if="info.type === 'link'")
                            .box-and-pin-popup__info-icons
                                img.box-and-pin-popup__info-icon(width="24px" src="~/assets/svgs/link_box.svg")
                                .box-and-pin-popup__info-type Link
                                fa-icon.box-and-pin-popup__sort-up-icon(icon="sort-up")
                                fa-icon.box-and-pin-popup__sort-down-icon(icon="sort-down")
                                fa-icon.box-and-pin-popup__close-icon(icon="times")
                            .box-and-pin-popup__link-info-content
                                AutosizeTextarea.box-and-pin-popup__link-info-input(v-bind:text.async="info.content.link" v-bind:maxSize="1" v-bind:XScrollable="true")
                                .box-and-pin-popup__link-info-title hogehoge
        .box-and-pin-popup--right
            button.close(@click="closeModal")
</template>

<script>
    import AutosizeTextarea from '~/components/atoms/AutosizeTextarea'
    export default {
        name: "BoxAndPinPopup",
        components: {
            AutosizeTextarea
        },
        props: {
            params: Object,
            closeModal: () => {}
        },
        data() {
            return {
                testParams: {
                    title: '中央北口',
                    information: [
                        {
                            type: 'text',
                            content: {
                                text: '大阪駅3F\n\n\nhogehoge'
                            }
                        },
                        {
                            type: 'image',
                            content: {
                                urls: [
                                    'https://i.imgur.com/0efnThJ.png',
                                    'https://i.imgur.com/0efnThJ.png',
                                    'https://i.imgur.com/0efnThJ.png',
                                    'https://i.imgur.com/0efnThJ.png',
                                    'https://i.imgur.com/0efnThJ.png',
                                    'https://i.imgur.com/0efnThJ.png'
                                ]
                            }
                        },
                        {
                            type: 'link',
                            content: {
                                link: 'https://i.imgur.com/0efnThJ.png'
                            }
                        }
                    ],
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "~/assets/styles/variables.scss";
    .box-and-pin-popup {
        height: auto;
        width: 560px;
        display: flex;
        flex-direction: row;
        &--left {
            width: 60%;
            padding-right: 8px;
        }
        &__title {
            border: solid 2px $gray;
            width: 100%;
            height: 32px;
            font-size: 16px;
            margin-bottom: 8px;
            padding: 2px 4px;
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









        &--right {
            width: 40%;
        }
    }
</style>