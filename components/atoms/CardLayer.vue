<template lang="pug">
    .container
        font-awesome-icon.icon(icon="layer-group", style="margin-right: 10px;")
        span {{ layers.join('  ') }}
        span(style="text-align: right") {{ layers.length }} Layers
</template>

<script>
    export default {
        name: "CardLayer",
        props: {
            layers: {
                type: Array,
                require: true
            }
        }
    }
</script>

<style scoped>

</style>
