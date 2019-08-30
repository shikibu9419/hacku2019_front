<template lang="pug">
    textarea(v-model="text" :rows="rows")
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
                console.log(this.text)
                return Math.min(this.text.split('\n').length, this.maxSize)
            }
        }
    }
</script>

<style scoped>

</style>