<template lang="pug">
    .share-setting-popup
        .share-setting-popup__title 共有設定
            .delete-and-close-button
                CustomButton.delete-and-close-button__close-button(v-bind:handler="closeModal") 閉じる
        .share-setting-popup__setting
            .share-setting-popup__link-wrapper 公開リンク
                .share-setting-popup__link
                    .share-setting-popup__link__url {{ param.link }}
                    .share-setting-popup--item-end-button コピーする
                .share-setting-popup__logos
                    .share-setting-popup__icon: TwitterBtn.share-setting-popup__icon--svg
                    .share-setting-popup__icon: FacebookBtn.share-setting-popup__icon--svg
            .share-setting-popup__disclosure-wrapper
                .share-setting-popup__disclosure-scope_list
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
                .share-setting-popup__disclosure-scope_list
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
    import CustomButton from '~/components/atoms/CustomButton'
    export default {
        name: "ShareSettingPopup.vue",
        props: {
            params: Object,
            closeModal: () => {}
        },
        components: {
            DeleteAndCloseButton,
            Selector,
            CustomButton,
            TwitterBtn: () => import('~/assets/svgs/twitter.svg?inline'),
            FacebookBtn: () => import('~/assets/svgs/facebook.svg?inline'),
        },
        data() {
            return {
                param: {
                    link: 'https://mille-feuille.app/map_id/view'
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
            margin: 4px 0;
            border: solid 2px $dark-gray;
            &__url {
                padding: 4px;
            }
        }
        &--item-end-button {
            text-align: center;
            flex-grow: 0;
            flex-shrink: 0;
            width: 140px;
            padding: 4px;
            left: 0;
            background: $dark-gray;
            color: $white;
            border-left: 2px solid $dark-gray;
            cursor: pointer;
            &:hover{
                background: $gray;
            }
        }
        &__logos {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-end;
        }
        &__icon {
            cursor: pointer;
            width: 30px;
            height: 30px;
            &--svg {
                display: block;
                width: 30px;
            }
        }
        &__disclosure-wrapper {
            display: flex;
            flex-direction: column;
            padding: 16px;
        }
        &__disclosure-scope_list {
            margin: 12px 0 4px;
        }
        &__disclosure-scope {
            display: flex;
            margin: 2px 0;
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
            margin: 4px 0;
            border: solid 2px $dark-gray;
        }
        &__user-searcher {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 4px;
            border: none;
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


    .delete-and-close-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 12px;
        margin: 0 0 0 auto;
        &__delete-button {
            color: $white;
            background: $dark-gray;
        }
        &__close-button {
            color: $white;
            background: $palette-pink;
        }
    }
</style>