<template lang="pug">
    textarea.autosize-textarea(v-model="text" :rows="rows" :class="{'x-scrollable': XScrollable}")
</template>

<script>
    export default {
        name: "AutosizeTextarea.vue",
        props: {
            text: String,
            maxSize: Number,
            XScrollable: Boolean
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