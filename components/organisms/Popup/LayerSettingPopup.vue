<template lang="pug">
    .layer-setting-popup
        .layer-setting-popup__title レイヤーを編集
            DeleteAndCloseButton(v-bind:deleteHandler="closeModal" v-bind:closeHandler="closeModal")
        .layer-setting-popup__setting
            .layer-setting-popup__setting-name レイヤー名
                input.layer-setting-popup--end
            .layer-setting-popup__setting-color レイヤーカラー
                .layer-setting-popup--end
                    Selector.layer-setting-popup__selector(v-bind:component="'selectColorItem'" v-bind:items.async="items" v-bind:width="'100px'")
            .layer-setting-popup__setting-transform レイヤーの移動
                .layer-setting-popup--end
                    CustomButton.layer-setting-popup__button 上へ
                    CustomButton.layer-setting-popup__button 下へ
                    .layer-setting-popup__floor-count 現在2列目
</template>

<script>
    import DeleteAndCloseButton from '~/components/atoms/mapEdit/DeleteAndCloseButton'
    import CustomButton from '~/components/atoms/CustomButton'
    import Selector from '~/components/atoms/selector/Selector'
    export default {
        name: 'LayerSettingPopup.vue',
        props: {
            params: Object,
            closeModal: () => {}
        },
        components: {
            DeleteAndCloseButton,
            CustomButton,
            Selector
        },
        data() {
            return {
                items: [
                    { params: {}, value: 'light-pink', selected: true },
                    { params: {}, value: 'pink', selected: false },
                    { params: {}, value: 'red', selected: false },
                    { params: {}, value: 'light-orange', selected: false },
                    { params: {}, value: 'orange', selected: false },
                    { params: {}, value: 'dark-orange', selected: false },
                    { params: {}, value: 'light-yellow', selected: false },
                    { params: {}, value: 'yellow', selected: false },
                    { params: {}, value: 'dark-yellow', selected: false },
                    { params: {}, value: 'light-green', selected: false },
                    { params: {}, value: 'green', selected: false },
                    { params: {}, value: 'blue-green', selected: false },
                    { params: {}, value: 'light-sky', selected: false },
                    { params: {}, value: 'sky', selected: false },
                    { params: {}, value: 'cyan', selected: false },
                    { params: {}, value: 'light-purple', selected: false },
                    { params: {}, value: 'purple', selected: false },
                    { params: {}, value: 'dark-blue', selected: false },
                    { params: {}, value: 'light-gray', selected: false },
                    { params: {}, value: 'gray', selected: false },
                    { params: {}, value: 'black', selected: false }
                ]
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/variables";
    .layer-setting-popup {
        height: auto;
        width: 480px;
        flex-direction: column;
        &__title {
            display: flex;
            align-items: center;
            border-bottom: solid 2px $white;
            padding: 8px;
        }
        &__setting {
            padding: 8px;
        }
        &__setting-name,&__setting-color,&__setting-transform {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 4px;
        }
        &__floor-count {
            margin-left: 8px;
        }
        &--end {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 60%;
            margin: 0 0 0 auto;
        }
        &__button {
            width: 64px !important;
            border: solid 2px $dark-gray;
            background: $white;
        }
    }
</style>