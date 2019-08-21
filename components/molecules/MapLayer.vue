<template lang="pug">
    .map-edit__map--container
        tool-bar
        svg.map-edit__layer(@mousemove="onMousemove" @mousedown="onMousedown" @mouseup="onMouseup" ref="layer")
            tool(v-for="[id, attr] in Object.entries(tools)" :key="attr.id"
                :id="id" :attr="attr" :selected="selected(id)"
                :grabbing="grabbing" :plotting="plotting")
</template>

<style lang="scss">
.map-edit__map {
    &--container {
        position: absolute;
        z-index: 10;
        top: 0px;
        left: 0px;
    }
}

.map-edit__layer {
    width: 100%;
    height: 100%;
}
</style>

<script>
import Tool from '~/components/atoms/mapTools/Tool'
import ToolBar from './ToolBar'

export default {
    components: {
        Tool,
        ToolBar
    },
    methods: {
        onMousemove(e) {
            const prop = {
                x: e.pageX - this.$store.state.mapEdit.offset.x,
                y: e.pageY - this.$store.state.mapEdit.offset.y
            }

            this.$store.dispatch('mapEdit/setMousePosition', prop)

            if (!this.$store.state.mapEdit.grabbing && !this.$store.state.mapEdit.plotting)
                return
            if (!Object.keys(this.$store.getters['mapEdit/selecting']).length)
                return
            this.$store.dispatch('mapEdit/setPosition', prop)
            this.$emit('scroll')
        },
        onMousedown() {
            this.$store.dispatch('mapEdit/clearSelection')
        },
        onMouseup() {
            if(this.$store.state.mapEdit.grabbing)
                this.$store.dispatch('mapEdit/toggleGrabbing')
        },
        setOffset() {
            const rect = this.$refs.layer.getBoundingClientRect()
            const prop = {
                x: window.pageXOffset + rect.left,
                y: window.pageYOffset + rect.top
            }
            this.$store.dispatch('mapEdit/setOffset', prop)
        },
    },
    mounted() {
        this.setOffset()
        window.addEventListener('resize', () => this.setOffset())
        window.addEventListener('scroll', () => this.setOffset())
    },
    computed: {
        tools() {
            return this.$store.state.mapEdit.tools
        },
        selected(id) {
            return function (id) {
                return id in this.$store.state.mapEdit.selected
            };
        },
        grabbing() {
            return this.$store.state.mapEdit.grabbing
        },
        plotting() {
            return this.$store.state.mapEdit.plotting
        }
    }
}
</script>
