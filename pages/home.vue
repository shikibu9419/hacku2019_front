<template lang="pug">
    .container
        card-tile(
            :title="title"
            :img_url="img_url"
            :username="username"
            :usericon_url="usericon_url"
            :layers="layers"
            :tags="tags"
            :comments="comments"
        )
</template>

<script>
    import CardTile from '../components/molecules/CardTile'
    export default {
        name: "home",
        components: {CardTile},
        data() {
            return {
                title: '俺的ラーメン屋まとめ',
                img_url: 'https://placehold.jp/400x300.png',
                username: 'username',
                usericon_url: 'https://placehold.jp/100x100.png',
                layers: ['豚骨', '塩', '醤油', '味噌'],
                tags: ['ラーメン', '大阪', '激戦区'],
                comments: [...Array(16).keys()]
            }
        }
    }
</script>

<style scoped>
    .container {
        background: #eee;
    }
</style>
