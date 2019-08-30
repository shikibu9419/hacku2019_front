<template lang="pug">
  textarea.map_edit__commentbar__form_textarea(v-model="message")
</template>

<script>
export default {
  data() {
    return {
      message: '',
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit__commentbar__form_textarea {
  width: 80%;
}
</style>
