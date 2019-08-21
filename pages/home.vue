<template lang="pug">
    .container
        .card-pages
            card-tile(
                v-for="(data, index) in array" :key="`card_test_${index}`"
                :title="title"
                :img_url="img_url"
                :username="username"
                :usericon_url="usericon_url"
                :layers="layers"
                :tags="tags"
                :comments="comments"
                :id="data"
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
                comments: [...Array(16).keys()],
                array: [...Array(9).keys()]
            }
        }
    }
</script>

<style scoped>
    .container {
        background: #eee;
    }
    .card-pages{
        padding: 2.5% 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
