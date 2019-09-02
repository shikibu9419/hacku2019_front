<template lang="pug">
    .vue_tags_input
        tags-input(
            element-id="tags"
            v-model="choosingTags"
            :add-tags-on-blur="true"
            :existing-tags="existingTags"
            :typeahead="true"
            :typeahead-style="'dropdown'"
            :typeahead-activation-threshold="2"
            @initialized="onInitialized"
        )
        button.buttons(v-on:click="updateFinish()") Save
</template>

<script>
import { async } from 'q';
    export default {
        name: "VueTagsInput.vue",
        props: { selectedTags: Array, existingTags: Array },
        data() {
            return {
                choosingTags: []
            }
        },
        methods: {
            onInitialized() {
                this.choosingTags = this.selectedTags
            },
            updateFinish(){
                this.$store.dispatch('mapEdit/updateTags', this.choosingTags)
                this.$emit('edit-tags-finish')
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "~assets/styles/variables.scss";
.buttons {
    display: block;
    border: none;
    border-top: none;
    border-radius: 0 0 8px 8px;
    padding: 4px 12px 6px;
    margin-left: auto;
    margin-right: 0;
    background: $theme-pink;
    color: $white;
    &:hover{
        background: $palette-light-pink;
    }
}
</style>
