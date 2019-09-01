<template lang="pug">
    .select-color-item
        LayerIcon.select-color-item__icon(v-bind:class="[item.value]")
        img.select-color-item__icon(src="~/assets/svgs/layer.svg?data" v-bind:class="[item.value]")
</template>

<script>
    import LayerIcon from '~/assets/svgs/layer.svg?inline'
    export default {
        name: "selectColorItem.vue",
        modules: [
            '@nuxtjs/svg'
        ],
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
    .select-color-item {
        &__icon {
            width: 20px;
        }
        .light-pink {
            color: $palette-light-pink;
        }
        .pink {
            color: $palette-pink;
        }
        .red {
            color: $palette-red;
            fill: $palette-red;
            stroke: red;
        }
        .light-orange {
            color: $palette-light-orange;
        }
        .orange {
            color: $palette-orange;
        }
    }
</style>