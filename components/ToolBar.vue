<template lang="pug">
    .container
        button(type="button" @click="addExample") addExample
</template>

<script>
export default {
    methods: {
        addExample() {
            this.$store.dispatch('board/add', { type: 'circle', x: 50, y: 50, r: 20})
        },
    }
}
</script>