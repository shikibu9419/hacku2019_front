<template lang="pug">
    .map_edit__sidebar
        h2 this is sidebar
        ul
            li(v-for="[id, layer] in Object.entries(layers)" :key="id") {{ layer }}
        button(@click="addLayer") レイヤー追加
</template>

<script>
export default {
    computed: {
        layers () {
            return this.$store.state.mapEdit.layers
        }
    },
    methods: {
        // あとでmodalとかに移行
        addLayer() {
            const prop = {
                name: "layer",
                color: "red",
            }
            this.$store.dispatch('mapEdit/addLayer', prop)
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.map_edit__sidebar {
    background-color: $back-gray;
    position: absolute;
    top: 0;
    width: 200px;
    height: 100%;
    z-index: 10;
}
</style>
