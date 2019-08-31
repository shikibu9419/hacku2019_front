<template lang="pug">
    .layer-setting-popup
        .layer-setting-popup__title レイヤーを編集
            DeleteAndCloseButton(v-bind:deleteHandler="closeModal" v-bind:closeHandler="closeModal")
        .layer-setting-popup__setting
            .layer-setting-popup__setting-name レイヤー名
                input.layer-setting-popup--end
            .layer-setting-popup__setting-color レイヤーカラー
                .layer-setting-popup__selector hoge
            .layer-setting-popup__setting-transform レイヤーの移動
                .layer-setting-popup--end
                    button.layer-setting-popup__button 上へ
                    button.layer-setting-popup__button 下へ
                    .layer-setting-popup__floor-count 現在2列目
</template>

<script>
    import DeleteAndCloseButton from '~/components/atoms/mapEdit/DeleteAndCloseButton'
    export default {
        name: 'LayerSettingPopup.vue',
        props: {
            params: Object,
            closeModal: () => {}
        },
        components: {
            DeleteAndCloseButton
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/variables";
    .layer-setting-popup {
        height: auto;
        width: 400px;
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
            margin: 4px;
        }
        &__floor-count {
            margin-left: 8px;
        }
        &--end {
            display: flex;
            flex-direction: row;
            width: 60%;
            margin: 0 0 0 auto;
        }
    }
</style>