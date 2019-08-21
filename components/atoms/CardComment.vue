<template lang="pug">
    .container
        font-awesome-icon.icon(icon="comment-dots", style="margin-right: 10px;")
        span {{ comment_count }} Comments
</template>

<script>
    export default {
        name: "CardComment",
        props: {
            comment_count: {
                type: Number,
                require: true
            },
        },
    }
</script>

<style scoped>

</style>
