<template lang="pug">
  .login
    .login_container
      LoginLogo
      .login_form
        .login_input__box
          LoginInput(:value="login.mail" :placeholder="'E-mail'" :type="'mail'")
        .login_input__box
          LoginInput(:value="login.password" :placeholder="'Password'" :type="'password'")
      .login_button__wrapper
        .login_button__box
          button.login_button.login_button--login() ログイン
        .login_button__box
          button.login_button.login_button--signup(@click="linkToSignUpPage()") アカウント作成
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
  data(){
    return{
      login:{
        mail: "",
        password: ""
      }
    }
  },
  methods:{
    linkToSignUpPage(){
      this.$router.push('/signup')
    }
  }
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

.login_form {
  margin-top: 80px;
}
.login_input__box{
  margin: 20px 0;
}

.login_button__wrapper{
  margin: 48px 0;
}

.login_button__box{
  margin: 18px 0;
}
.login_button{
  display: block;
  width: 100%;
  padding: 4px 12px;
  @include noto-font(1.7rem,$text-black);
  &--login{
    background: $theme-pink;
    color: $white;
    border: none;
    border: 2px solid $theme-pink;
  }
  &--signup{
    background: $white;
    color: $theme-pink;
    border: 2px solid $theme-pink;
  }
}

</style>