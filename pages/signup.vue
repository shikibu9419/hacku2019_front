<template lang="pug">
  .signup
    .top_container
      TopLogo
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
</style>