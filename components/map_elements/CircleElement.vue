<template lang="pug">
    circle.pointer(
        v-bind="property"
        :cx="property.x" :cy="property.y"
        @mousedown="select"
        @mouseup="clear"
    )
</template>

<style lang="scss">
.pointer {
    fill: #42b983;
    cursor: pointer;
}
</style>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        property: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            type: 'circle'
        }
    },
    methods: {
        select() {
            this.$store.dispatch('board/selectElement', {type: this.type, id: this.id})
        },
        clear() {
            this.$store.dispatch('board/clearSelection')
        }
    }
}
</script>
