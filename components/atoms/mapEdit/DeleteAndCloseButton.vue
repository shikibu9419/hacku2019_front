<template lang="pug">
    .delete-and-close-button
        CustomButton.delete-and-close-button__delete-button(v-bind:handler="deleteHandler") 削除
        CustomButton.delete-and-close-button__close-button(v-bind:handler="closeHandler") 閉じる
</template>

<script>
import CustomButton from '~/components/atoms/CustomButton';
export default {
  name: 'DeleteAndCloseButtonVue',
  components: {
    CustomButton,
  },
  props: {
    deleteHandler: () => {},
    closeHandler: () => {},
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
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
