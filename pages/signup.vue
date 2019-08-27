<template lang="pug">
  .signup
    .login_container
      LoginLogo
</template>
<script>
//components
import LoginLogo from '~/components/atoms/login/loginLogo.vue'
import LoginInput from '~/components/atoms/login/loginInput.vue'

export default {
  layout: "LoginPage",
  components:{
    LoginLogo,
    LoginInput
  },
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

.login_container {
  padding: 12px;
  margin: auto;
  width: 400px;
  height: 100%;
}
</style>