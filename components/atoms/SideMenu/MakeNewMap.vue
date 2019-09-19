<template lang="pug">
  .side-menu-btn
    button(@click="makeNewMap()").sidemenu_button
      .sidemenu_button__icon
        fa-icon(icon="plus").sidemenu_button__icon__svg
      .sidemenu_button__text マップを作る
</template>

<script>
export default {
  methods: {
    makeNewMap() {
      this.$axios
        .post(process.env.API_URL + '/maps', {
          name: '新しい地図',
          description: '説明',
          publish_setting: 0,
        })
        .then(response => {
          this.$router.push({
            name: 'maps-edit',
            params: { mapId: response.data.id },
          });
        })
        .catch(err => {
          console.log(err);
          alert('Woops! An error occurred!');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
@import '~/assets/styles/mixin.scss';

$padding: 28px;

.side-menu-btn {
  padding: 16px $padding;
}

.sidemenu_button {
  width: $sidemenu-width - ($padding * 2);
  padding: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  background: $theme-pink;
  color: $white;
  border: none;
  border-radius: 4px;
}

.sidemenu_button__icon {
  padding: 0 8px;
  color: $white;
}
</style>
