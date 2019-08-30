<template lang="pug">
    .box-and-pin-popup
        .box-and-pin-popup--left
            .box-and-pin-popup__left-content
                .box-and-pin-popup__title {{testParams.title}}
                .box-and-pin-popup__information
                    .box-and-pin-popup__info(v-for="info in testParams.information")
                        .box-and-pin-popup__text-info(v-if="info.type === 'text'")
                            .box-and-pin-popup__info--icons
                                img.box-and-pin-popup__info-icon(width="16px" height="16px" src="~/assets/svgs/text_box.svg")
                            AutosizeTextarea(v-bind:text.async="info.content.text" v-bind:maxSize="10")
                        .box-and-pin-popup__image-info(v-if="info.type === 'image'")
                            .box-and-pin-popup__info--icons
                                img.box-and-pin-popup__info-icon(width="16px" height="16px" src="~/assets/svgs/image_box.svg")
                        .box-and-pin-popup__link-info(v-if="info.type === 'link'")
                            .box-and-pin-popup__info--icons
                                img.box-and-pin-popup__info-icon(width="16px" height="16px" src="~/assets/svgs/link_box.svg")
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
            border: solid 1px $black;
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
        &--right {
            width: 40%;
        }

        &__info--icons {
            height: 24px;
            width: 100%;
        }
    }
</style>