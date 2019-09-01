<template lang="pug">
    .share-setting-popup
        .share-setting-popup__title 共有設定
            DeleteAndCloseButton(v-bind:deleteHandler="closeModal" v-bind:closeHandler="closeModal")
        .share-setting-popup__setting
            .share-setting-popup__link-wrapper 公開リンク
                .share-setting-popup__link {{ param.link }}
                    .share-setting-popup--item-end-button コピーする
                .share-setting-popup__logos
                    .share-setting-popup__icon TwitterLogo
                    .share-setting-popup__icon FacebookLogo
            .share-setting-popup__disclosure-wrapper
                .share-setting-popup__disclosure-scope
                    .share-setting-popup__disclosure-scope-name グローバル公開
                    .share-setting-popup__disclosure-scope-discription 検索でヒットし、誰でもアクセスできます。
                    button.share-setting-popup__disclosure-scope-toggle 仮置き
                .share-setting-popup__disclosure-scope
                    .share-setting-popup__disclosure-scope-name URL公開
                    .share-setting-popup__disclosure-scope-discription URLを持っている人がアクセスできます。
                    button.share-setting-popup__disclosure-scope-toggle 仮置き
                .share-setting-popup__url-authority 権限
                    Selector(v-bind:items.async="items")
                .share-setting-popup__disclosure-scope
                    .share-setting-popup__disclosure-scope-name ユーザーに公開
                    .share-setting-popup__disclosure-scope-discription 特定のユーザーに対して公開設定を行います。
                    button.share-setting-popup__disclosure-scope-toggle 仮置き
                .share-setting-popup__user-authority
                    .share-setting-popup__user-searcher-wrapper
                        input.share-setting-popup__user-searcher(placeholder="ユーザーネームまたはメールアドレスで検索")
                        .share-setting-popup--item-end-button 設定リストに追加
                    .share-setting-popup__users-added
                        .share-setting-popup__user-added(v-for="(user, i) in users" :key="`user_${i}`") {{ user.name }}
                            Selector(v-bind:items.async="items")
                            fa-icon.share-setting-popup__remove-user-button(icon="times")

</template>

<script>
    import DeleteAndCloseButton from '~/components/atoms/mapEdit/DeleteAndCloseButton'
    import Selector from '~/components/atoms/selector/Selector'
    export default {
        name: "ShareSettingPopup.vue",
        props: {
            params: Object,
            closeModal: () => {}
        },
        components: {
            DeleteAndCloseButton,
            Selector
        },
        data() {
            return {
                param: {
                    link: 'https://yahoo.co.jp'
                },
                items: [
                    { text: '拒否', value: 0, selected: true },
                    { text: '無理', value: 1, selected: false },
                    { text: '閲覧可', value: 2, selected: false },
                ],
                users: [
                    { name: 'あとでuserInfoとか使う君' },
                    { name: 'あとでuserInfoとか使う君' },
                    { name: 'あとでuserInfoとか使う君' },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/styles/variables";
    .share-setting-popup {
        height: auto;
        width: 600px;
        flex-direction: column;
        &__title {
            display: flex;
            align-items: center;
            border-bottom: solid 2px $white;
            padding: 8px;
        }
        &__setting {
        }
        &__link-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-bottom: solid 2px $white;
            padding: 16px;
        }
        &__link {
            display: flex;
            justify-content: space-between;
            margin-left: 8px;
            border: solid 2px $dark-gray;
        }
        &--item-end-button {
            text-align: center;
            width: 160px;
            left: 0;
            background: $dark-gray;
            color: $white;
        }
        &__logos {
            margin: 0 0 0 auto;
        }
        &__disclosure-wrapper {
            display: flex;
            flex-direction: column;
            padding: 16px;
        }
        &__disclosure-scope {
            display: flex;
        }
        &__disclosure-scope-name {
            font-weight: bold;
            margin-right: 16px;
        }
        &__url-authority,&__user-authority {
            display: flex;
            align-items: center;
            background: $white;
            padding: 16px;
        }
        &__user-authority {
            flex-direction: column;
        }
        &__user-searcher-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-left: 8px;
            border: solid 2px $dark-gray;
        }
        &__user-searcher {
            width: auto;
            height: auto;
        }
        &__user-searcher-wrapper,&__users-added {
            width: 100%;
        }
        &__user-added {
            display: flex;
            align-items: center;
        }
        &__remove-user-button {
            font-size: 20px;
            margin: 0 8px 0 16px;
        }
    }
</style>