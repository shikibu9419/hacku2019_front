<template lang="pug">
    div
        tags-input(
            element-id="tags"
            v-model="choosingTags"
            :existing-tags="existingTags"
            :typeahead="true"
            @initialized="onInitialized"
        )
        button.buttons(v-on:click="updateTags()") Save
</template>

<script>
    export default {
        name: "VueTagsInput.vue",
        props: { selectedTags: Array, existingTags: Array },
        data() {
            return {
                choosingTags: []
            }
        },
        methods: {
            updateTags() {
                this.$store.dispatch('mapEdit/updateTags', this.choosingTags)
                this.$emit('edit-tags-finish')
            },
            onInitialized() {
                this.choosingTags = this.selectedTags
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>
