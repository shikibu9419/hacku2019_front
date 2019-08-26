<template lang="pug">
    .map_edit__sidebar__layer_selector_item(@click="selectLayer")
        img.map_edit__sidebar__layer_selector_item_icon(src="~assets/svgs/layer.svg")
        p.map_edit__sidebar__layer_selector_item_name {{ name }}
</template>

<script>
export default {
    props: ['id', 'name', 'color', 'isActive'],
    methods: {
        selectLayer(id) {
            this.$store.dispatch('mapEdit/selectLayer', this.id)
        }
    }
}
</script>

<style lang="scss">
.map_edit__sidebar__layer_selector_item {
    height: 20px;
    // align elements
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;

    &_icon {
        display: inline-block;
        max-width: 30px;
    }

    &_name {
        display: inline;
        max-width: 30px;
    }
}
</style>
