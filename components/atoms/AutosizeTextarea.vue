<template lang="pug">
  textarea.autosize-textarea(v-model="localText" :rows="rows" :class="{'x-scrollable': XScrollable}")
</template>

<script>
export default {
  name: 'AutosizeTextareaVue',
  props: {
    text: String,
    maxSize: Number,
    defaultSize: Number,
    xScrollable: Boolean,
  },
  data() {
    return {
      localText: this.text,
    };
  },
  computed: {
    rows() {
      return Math.max(
        Math.min(
          Math.max(
            this.localText.split('\n').length,
            Math.ceil(this.localText.length / 20)
          ),
          this.maxSize
        ),
        this.defaultSize
      );
    },
  },
  watch: {
    localText(value) {
      this.$emit('update:text', value);
    },
    text(value) {
      this.localText = this.text;
    },
  },
};
</script>

<style lang="scss" scoped>
.autosize-textarea {
  width: 100%;
  outline: none;
  resize: none;
  color: #6d646a;
}
.x-scrollable {
  white-space: nowrap;
}
</style>
