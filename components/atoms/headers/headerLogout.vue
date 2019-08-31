<template lang="pug">
  .header_logout_button__main
    button(@click="pushLogout()").header_logout_button
      .header_logout_button__text ログアウト
</template>
 
<script>
import Vue from 'vue'

export default {
  methods:{
    async pushLogout(){
      const response = await this.$axios.get('https://api.mille-feuille.app/logout')
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

$padding: 28px;

.header_logout_button__main{
  padding: 10px $padding;
}

.header_logout_button{
  width: 150px;
  padding: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  background: #ffffff;
  color: $black;
  border-color: $black;
  border-radius: 4px;
}
</style>