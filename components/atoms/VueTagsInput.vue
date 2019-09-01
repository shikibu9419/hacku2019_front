<template lang="pug">
    div
        tags-input(
            element-id="tags"
            v-model="selectedTags"
            :existing-tags="existingTags"
            :typeahead="true"
            @Initialized="onInitialized"
        )
        button.buttons(v-on:click="updateTags()")
</template>

<script>
    export default {
        name: "VueTagsInput.vue",
        props: { selectedTags: Array, existingTags: Array },
        data() {
            return {
                selectedTags: []
            }
        },
        methods: {
            updateTags() {
                this.$store.dispatch('mapEdit/updateTags', this.selectedTags)
                this.$emit('edit-tags-finish')
            },
            onInitialized() {
                this.data.selectedTags = this.props.selectedTags
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "~/assets/styles/atoms/vueTagsInput.scss";
</style>
