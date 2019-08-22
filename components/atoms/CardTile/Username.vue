<template lang="pug">
    .container
        img.icon(:src="src")
        span.username {{ username }}
</template>

<script>
    export default {
        name: "Username",
        props: {
            src: {
                type: String,
                require: true
            },
            username: {
                type: String,
                require: true
            }
        }
    }
</script>

<style scoped>
    .icon {
        border-radius: 50%;
        width: 1em;
        height: 1em;
        margin-right: 10px;
    }
</style>
