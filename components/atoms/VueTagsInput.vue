<template lang="pug">
    tags-input(
        element-id="tags"
        v-model="selectedTags"
        :existing-tags="existingTags"
        :typeahead="true"
    )
</template>

<script>
    export default {
        name: "VueTagsInput.vue",
        props: ['selectedTags', 'existingTags'],
        computed: {
        }
    }
</script>

<style lang="scss" scoped>
</style>

