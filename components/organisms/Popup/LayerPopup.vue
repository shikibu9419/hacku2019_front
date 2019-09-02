<template lang="pug">
    .layer-popup
        .layer-popup__titles
            LayerSelectorItem.layer-popup__title(v-bind="backgroundAttr")
            button(v-on:click="closeModal") 仮置き
        .layer-popup__create
            .layer-popup__create__new レイヤーを新規作成
                .layer-popup__create__new__content
                    .layer-popup__create__new__content__name
                        .layer-popup--column-title レイヤー名
                        input
                    .layer-popup__create__new__content__color
                        .layer-popup--column-title レイヤーカラー
                        Selector(v-bind:items.async="items")
            .layer-popup__create__from-stock レイヤーをストックから追加
                .layer-popup__selectors
                    Selector(v-bind:items.async="items" v-bind:width="'150px'")
                    .layer-popup__selector--to ->
                    Selector(v-bind:items.async="items" v-bind:width="'150px'")

</template>

<script>
    import LayerSelectorItem from '~/components/atoms/mapEdit/LayerSelectorItem'
    import Selector from '~/components/atoms/selector/Selector'
    export default {
        name: "LayerPopup.vue",
        props: {
            params: Object,
            closeModal: () => {}
        },
        components: {
            LayerSelectorItem,
            Selector
        },
        data() {
            return {
                backgroundAttr: {
                    id: 'background',
                    name: 'Yah◯o!地図',
                    color: 'gray'
                },
                items: [
                { text: '拒否', value: 0, selected: true },
                { text: '無理', value: 1, selected: false },
                { text: '閲覧可', value: 2, selected: false },
            ],
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/styles/variables";
    .layer-popup {
        height: auto;
        width: 400px;
        flex-direction: column;
        &__titles {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: solid 2px $white;
            padding: 8px;
        }
        &__title {
            width: 70%;
        }
        &__create {
            padding: 8px;
            display: flex;
            flex-direction: column;
            &__new {
                padding: 8px;
                display: flex;
                flex-direction: column;
                font-weight: bold;
                &__content {
                    padding: 8px;
                    &__name,&__color {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }
                }
            }
            &__from-stock {
                padding: 8px;
                display: flex;
                flex-direction: column;
            }
        }
        &__selectors {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        &--column-title {
            width: 35%;
            font-weight: normal;
        }
    }
</style>