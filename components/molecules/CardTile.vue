<template lang="pug">
    div.card
        img.card-img(:src="img_url")
        .contents
            h3.title {{ title }}
            card-username(:username="username" :src="usericon_url")
            card-layer(:layers="layers")
            card-tag(:tags="tags")
            card-comment(:comment_count="comments.length")
</template>

<script>
    import CardUsername from '../atoms/CardUsername'
    import CardLayer from '../atoms/CardLayer'
    import CardTag from '../atoms/CardTag'
    import CardComment from '../atoms/CardComment'

    export default {
        name: "CardTile",
        components: {CardComment, CardTag, CardLayer, CardUsername},
        props: {
            title: {
                type: String,
                require: true
            },
            img_url: {
                type: String,
                require: true
            },
            username: {
                type: String,
                require: true
            },
            usericon_url: {
                type: String,
                require: true
            },
            layers: {
                type: Array,
                require: true
            },
            tags: {
                type: Array,
                require: true
            },
            comments: {
                type: Array,
                require: true
            }
        }
    }
</script>

<style scoped>
    .card {
        margin: 30px auto;
        width: 350px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 5px #ccc;
    }
    .card-img {
        border-radius: 5px 5px 0 0;
        max-width: 100%;
        height: auto;
    }
    .title {
        margin: 5px;
    }
    .contents {
        margin: 10px;
    }
    .parent >>> .icon {
        margin-right: 10px;
    }
</style>
