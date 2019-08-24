<template lang="pug">
  .top
    .top_container
      TopLogo
      .top_login_form
        .login_input__box
          TopInput(:value="login.mail" :placeholder="'E-mail'" :type="'mail'")
        .login_input__box
          TopInput(:value="login.password" :placeholder="'Password'" :type="'password'")
      .top_button__wrapper
        .top_button__box
          button.top_button.top_button--login() ログイン
        .top_button__box
          button.top_button.top_button--signup(@click="linkToSignUpPage()") アカウント作成
</template>
<script>
//components
import TopLogo from '~/components/atoms/top/topLogo.vue'
import TopInput from '~/components/atoms/top/topInput.vue'

export default {
  layout: "TopPage",
  components:{
    TopLogo,
    TopInput
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

.top_container {
  padding: 12px;
  margin: auto;
  width: 400px;
  height: 100%;
}

.top_login_form {
  margin-top: 80px;
}
.login_input__box{
  margin: 20px 0;
}

.top_button__wrapper{
  margin: 48px 0;
}

.top_button__box{
  margin: 18px 0;
}
.top_button{
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