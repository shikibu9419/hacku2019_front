<template lang="pug">
    .home
        Header(
        :returnLink="'/maplists/search'"
        :placeholder="'マップを検索する'"
        :type="'maplists/search'"
        )
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
export default {
    layout: "MapListsLayout",
    name: "home",
    components: {
        Header: () => import("~/components/organisms/Header.vue"),
        CardTile: () => import("~/components/molecules/CardTile")
    },
    data() {
        return {
            title: '俺的ラーメン屋まとめ',
            img_url: 'https://picsum.photos/400/300',
            username: 'username',
            usericon_url: 'https://picsum.photos/200',
            layers: ['豚骨', '塩', '醤油', '味噌'],
            tags: ['ラーメン', '大阪', '激戦区'],
            comments: [...Array(16).keys()],
            array: [...Array(9).keys()] // とりあえず9個絵画
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.card-pages{
    padding: 2.5% 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>
