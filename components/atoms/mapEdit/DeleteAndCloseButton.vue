<template lang="pug">
    .delete-and-close-button
        .delete-and-close-button__delete-button(@click="deleteHandler") 削除
        .delete-and-close-button__close-button(@click="closeHandler") 閉じる
</template>

<script>
    export default {
        name: "DeleteAndCloseButton.vue",
        props: {
            deleteHandler: () => {},
            closeHandler: () => {},
        }
    }
</script>

<style lang="scss" scoped>
    @import "~/assets/styles/variables.scss";
    .delete-and-close-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 12px;
        margin: 0 0 0 auto;
        &__delete-button {
            display: flex;
            justify-content: center;
            align-items: center;
            color: $white;
            background: $dark-gray;
            border-radius: 4px;
            height: 28px;
            width: 96px;
            margin: 4px;
        }
        &__close-button {
            display: flex;
            justify-content: center;
            align-items: center;
            color: $white;
            background: $palette-pink;
            border-radius: 4px;
            height: 28px;
            width: 96px;
            margin: 4px;
        }
    }
</style>