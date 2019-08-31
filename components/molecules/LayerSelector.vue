<template lang="pug">
    .map_edit__sidebar__layer_selector
        p 4 Layers
        .map_edit__sidebar__layer_selector_content
            layer-selector-item(v-for="layer in layers" :key="layer.id" v-bind="layer")
            .map_edit__sidebar__layer_selector_item(@click="addLayer")
                font-awesome-icon(icon="plus-circle")
                p レイヤーを追加
        button(@click="popup") hogehoge
</template>

<script>
    import ModalService from '~/services/ModalSvc'
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
        },
        popup() {
            this.modalSvc.openPopup('BoxAndPinPopup', {}, null)
        }
    },
    components: {
        LayerSelectorItem: () => import('~/components/atoms/mapEdit/LayerSelectorItem')
    },
    created() {
        this.modalSvc = new ModalService(this.$store)
    },
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.map_edit__sidebar__layer_selector {
    background-color: $white;
}
</style>
