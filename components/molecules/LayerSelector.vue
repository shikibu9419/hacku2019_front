<template lang="pug">
    .container
        p.map_edit__sidebar__layer_selector_label レイヤーを選択
        .map_edit__sidebar__layer_selector_content
            layer-selector-item(v-for="layer in layers" :key="layer.id" v-bind="layer")
            .map_edit__sidebar__layer_selector_item(@click="addLayer")
                font-awesome-icon(icon="fa-plus-circle")
                p レイヤーを追加
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
    },
    components: {
        LayerSelectorItem: () => import('~/components/atoms/editMap/LayerSelectorItem')
    }
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.map_edit__sidebar__layer_selector {
    &_label {
        border: 2px solid $gray;
        border-style: solid solid none solid;
    }

    &_content {
        border: 2px solid $gray;
    }
}
</style>
