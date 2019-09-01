<template lang="pug">
  .sidebar__map_tags
    img.sidebar__title_icon(src="~assets/svgs/tag.svg")
    p.sidebar__title {{ selectedTags.length }} Tags
    .sidebar__map_tags__tags
        tags-input(
            element-id="tags"
            v-model="selectedTags"
            :existing-tags="existingTags"
            :typeahead="true"
            @tag-added="onTagAdded"
            @tag-removed="onTagRemoved"
        )
</template>

<script>

export default {
    data() {
        return {
            selectedTags: this.$store.getters['mapEdit/getTags']
        }
    },
    methods: {
        onTagAdded(tag) {
            this.$store.dispatch('mapEdit/addTag', {key: tag.key, value: tag.value})
        },
        onTagRemoved(tag) {
            this.$store.dispatch('mapEdit/removeTag', {key: tag.key, value: tag.value})
        }
    },
    computed: {
        existingTags() {
            return [{key: 1, value: 'tag1'}, {key: 2, value: 'tag2'}, {key: 3, value: 'tag3'}]
        },
    },
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/atoms/vueTagsInput.scss";

.sidebar__map_tags {
}
</style>
