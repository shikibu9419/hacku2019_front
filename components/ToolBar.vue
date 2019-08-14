<template lang="pug">
    .container
        button(type="button" @click="addCircle") addCircle
</template>

<script>
export default {
    methods: {
        addCircle() {
            this.$store.dispatch('board/add', { type: 'circle', x: 50, y: 50, r: 20})
        },
    }
}
</script>