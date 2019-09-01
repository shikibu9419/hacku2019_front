<template lang="pug">
  textarea.autosize-textarea(v-model="localText" :rows="rows" :class="{'x-scrollable': XScrollable}")
</template>

<script>
export default {
  name: "AutosizeTextarea.vue",
  data() {
    return {
      localText: this.text,
    }
  },
  props: {
    text: String,
    maxSize: Number,
    defaultSize: Number,
    XScrollable: Boolean
  },
  computed: {
    rows() {
      return Math.max(Math.min(this.localText.split('\n').length, this.maxSize), this.defaultSize)
    }
  },
  watch: {
    localText(value) {
      this.$emit('update:text', value);
    },
    text(value) {
      this.localText = this.text
    }
  }
}
</script>

<style lang="scss" scoped>
.autosize-textarea {
  height: 100%;
  width: 100%;
  outline: none;
  resize: none;
  color: #6D646A;
}
.x-scrollable {
  white-space: nowrap;
}
</style>
