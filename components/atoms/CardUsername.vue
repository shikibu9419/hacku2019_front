<template lang="pug">
    .container
        img.icon(:src="src" width="30px" height="30px")
        span.username {{ username }}
</template>

<script>
    export default {
        name: "CardUsername",
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
