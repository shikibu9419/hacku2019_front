<template lang="pug">
    textarea.autosize-textarea(v-model="text" :rows="rows")
</template>

<script>
    export default {
        name: "AutosizeTextarea.vue",
        props: {
            text: String,
            maxSize: Number
        },
        computed: {
            rows() {
                return Math.min(this.text.split('\n').length, this.maxSize)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .autosize-textarea {
        width: 100%;
        resize: none;
    }
</style>