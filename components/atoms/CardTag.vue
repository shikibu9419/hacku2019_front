<template lang="pug">
    .container
        font-awesome-icon.icon(icon="tag" style="margin-right: 10px;")
        span {{ tags.join('  ')}}
        span(style="text-align: right") {{ tags.length }} Tags
</template>

<script>
    export default {
        name: "CardTag",
        props: {
            tags: {
                type: Array,
                require: true
            },
        },
    }
</script>

<style scoped>

</style>
