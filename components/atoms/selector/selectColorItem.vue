<template lang="pug">
    .select-color-item
        LayerIcon.select-color-item__icon(v-bind:class="[item.value]")
        slot
</template>

<script>
    import LayerIcon from '~/assets/svgs/layer.svg?inline'
    export default {
        name: "selectColorItem.vue",
        components: {
            LayerIcon
        },
        props: {
            item: Object,
            // {
            //  param: Object,
            //  value: any,
            //  selected: boolean
            // }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/styles/variables";
    @import "../../../assets/styles/atoms/layerSvg";
    .select-color-item {
        height: 32px;
        display: flex;
        align-items: center;
        &__icon {
            width: 24px;
            margin-right: 8px;
        }
    }
</style>