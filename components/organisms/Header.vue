<template lang="pug">
  .header
    .header_logo
      nuxt-link(to="/maplists/search").header_logo__a
        img(src="~/assets/svgs/logo_mini.svg").header_logo__img
    .return_btn(v-if="returnLink!==null")
      nuxt-link(:to="returnLink")
        ReturnBtn.back_btn__image.back_btn__image--on
    .search
      HeaderSearch(:placeholder="placeholder")
</template>
<script>
export default {
  props:['placeholder','returnLink'],
  components:{
    //svg
    ReturnBtn: () => import('~/assets/svgs/return.svg?inline'),
    //components
    HeaderSearch: () => import('~/components/atoms/headers/headerSearch.vue'),
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

.header {
  position: relative;
  width: 100%;
  height: $header-height;
  display: flex;
  align-items: center;
}
.header_logo{
  width: $sidemenu-width;
}
.header_logo__img {
  height: $header-height - 22px;
  padding: 8px 18px 4px;
}

.return_btn {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: $sidemenu-width - $header-height + 24px;
  width: min-content;
  height: min-content;
}
.back_btn__image {
  display: block;
  width: $header-height - 38px;
  height: $header-height - 38px;
  padding: 8px;
}
.search {
  padding-left: 20px;
}
</style>