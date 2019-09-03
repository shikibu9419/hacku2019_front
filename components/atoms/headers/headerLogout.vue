<template lang="pug">
  .header_logout_button__main
    button(@click="pushLogout()").header_logout_button ログアウト
</template>

<script>
import Vue from 'vue'

export default {
  methods:{
    async pushLogout(){
      const response = await this.$axios.get(process.env.API_URL + '/logout')
      .then(response => {
        if(response.data.success) {
          Vue.toasted.success('ログアウトに成功しました')
          this.$store.commit('user/removeToken')
          this.$router.push('/login')
        } else {
          this.$store.commit('user/removeToken')
          this.$router.push('/login')
        } 
      })
      .catch(err => {
        this.$store.commit('user/removeToken')
          this.$router.push('/login')
      })
    }
  },
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

.header_logout_button__main {
  height: auto;
  padding-right: 24px;
}

.header_logout_button {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding: 6px 18px;
  background: $white;
  min-height: 40px;
  @include noto-font(1.6rem,$black);
  line-height: 28px;
  border: 1px solid $black;
  border-radius: 4px;
  transition: .3s $bezier-ease-out;
  :focus{
    outline: none;
  }
  &:hover {
    background: $back-light-gray;
  }
}
</style>
