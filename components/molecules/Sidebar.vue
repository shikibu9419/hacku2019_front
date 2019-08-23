<template lang="pug">
    .container
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
