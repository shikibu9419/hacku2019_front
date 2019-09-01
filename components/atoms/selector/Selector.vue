<template lang="pug">
    .selector(v-bind:style="{ width: width || '200px' }")
        .selector--text-only(v-if="!component")
            .selector__selected(@click="selectorEnable(!isShowing)") {{ nowSelectedText() }}
                img.selector__select-icon(width="16px" src="~/assets/svgs/select.svg")
            .selector__selecting-wrapper(v-if="isShowing")
                .selector__selecting(
                v-for="(item, i) in items" :key="`item_${i}`"
                @click="selectingAndClose(i)"
                v-bind:class="{ selected: item.selected }"
                ) {{ item.text }}
        .selector--with-component(v-if="component")
            .selector__selected(v-on:click="selectorEnable(!isShowing)")
                component(v-bind:is="component" v-bind:item.async="getSelected")
                    img.selector__select-icon(width="16px" src="~/assets/svgs/select.svg")
            .selector__selecting-wrapper(v-if="isShowing")
                component.selector__selecting(
                v-bind:is="component"
                v-for="(item, i) in items" :key="`item_${i}`"
                v-bind:item.async="item"
                @click="selectingAndClose(i)"
                v-bind:class="{ selected: item.selected }"
                ) {{ item.text }}
</template>

<script>
    import selectColorItem from './selectColorItem'
    export default {
        name: "Selector.vue",
        components: {
            selectColorItem
        },
        data() {
            return {
                isShowing: false,
            }
        },
        props: {
            component: String,
            items: [Object],
            // text only
            // {
            //  text: string,
            //  value: any,
            //  selected: boolean
            // }
            // with component
            // {
            //  param: Object
            //  value: any,
            //  selected: boolean
            // }
            width: String
            // ex. '200px'
        },
        created() {
            this.initSelected()
        },
        methods: {
            initSelected() {
                if (this.getSelected().length !== 1) {
                    let isFirstSelected = true
                    this.items = this.items.map(item => {
                        if (item.selected){
                            if (isFirstSelected) isFirstSelected = false
                            else item.selected = false
                        }
                        return item
                    })
                }
            },
            selectorEnable(bool) {
                this.isShowing = bool
                console.log(this.isShowing)
            },
            nowSelectedText() {
                return this.getSelected()[0].text
            },
            getSelected() {
                return this.items.filter(item => {
                    return item.selected
                })
            },
            clearSelected() {
                this.items = this.items.map(item => {
                    item.selected = false
                    return item
                })
            },
            selectingAndClose(index) {
                this.clearSelected()
                this.items[index].selected = true
                this.selectorEnable(false)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/styles/variables";
    .selector {
        margin: 8px;
        &__selected {
            display: flex;
            justify-content: space-between;
            padding-left: 4px;
            background: $white;
            border: solid 2px $dark-gray;
        }
        &__select-icon {
            margin-right: 8px;
        }
        &__selecting-wrapper {
            border-left: solid 2px $dark-gray;
            border-right: solid 2px $dark-gray;
            border-bottom: solid 2px $dark-gray;
        }
        &__selecting {
            padding-left: 4px;
            &:hover {
                background: $back-gray;
            }
            &.selected {
                background: $back-gray;
            }
        }
    }
</style>