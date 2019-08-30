<template lang="pug">
  .signup
    .login_container
      LoginLogo
      .login_form
        .login_input__box
          LoginInput(v-model="email" :placeholder="'E-mail'" :type="'email'" :name="'email'")
        .login_input__box
          LoginInput(v-model="name" :placeholder="'Name'" :type="'text'" :name="'name'")
        .login_input__box
          LoginInput(v-model="password" :placeholder="'Password'" :type="'password'" :name="'password'")
        .login_input__box
          LoginInput(v-model="passwordconfirm" :placeholder="'Password(confirm)'" :type="'password'" :name="'passwordconfirm'")
      .login_button__box
          button.login_button.login_button--signup(@click="signup()") アカウント作成
</template>
<script>
//components
import LoginLogo from '~/components/atoms/login/loginLogo.vue'
import LoginInput from '~/components/atoms/login/loginInput.vue'
import Vue from 'vue'

export default {
  layout: "LoginPage",
  components:{
    LoginLogo,
    LoginInput
  },
  data(){
    return {
      email: "",
      name: "",
      password: "",
      passwordconfirm: ""
    }
  },
  methods: {
    async signup() {
      if(this.password == this.passwordconfirm) {
        const response = await this.$axios.post('/api/users',
                                                     { email: this.email,
                                                       user_name: this.name,
                                                       user_password: this.password })
        .then( response => {
          Vue.toasted.success('登録に成功しました')
          this.$router.push('/login')
        })
        .catch(err => {
          if(this.name == "") {
            Vue.toasted.error('名前を入力してください')
          }
          if(this.password == "") {
            Vue.toasted.error('パスワードを入力してください')
          }
          if(this.email.match(/.+@.+\..+/) == null) {
            Vue.toasted.error('メールアドレスを正しく入力してください')
          }
        }) 
      } else {
        Vue.toasted.error('パスワードが一致しません')
      }
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
  &--signup{
    background: $theme-pink;
    color: $white;
    border: none;
    border: 2px solid $theme-pink;
  }
}

</style>