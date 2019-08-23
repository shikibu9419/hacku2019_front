<template lang="pug">
    .container
        svg.map__map--map-svg(@mousemove="onMousemove" @mousedown="onMousedown" @mouseup="onMouseup" ref="layer" cursor="grab")
            tool(v-for="[id, attr] in Object.entries(tools)" :key="attr.id"
                :id="id" :attr="attr" :selected="selected(id)"
                :grabbing="grabbing" :plotting="plotting")
        tool-bar.map__map--map-toolbar
</template>

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

            if (this.$store.state.mapEdit.grabbing || this.$store.state.mapEdit.mapGrabbing || this.$store.state.mapEdit.plotting) {
                if (this.$store.state.mapEdit.mapGrabbing)
                    this.$emit('scroll', prop)
                else
                    this.$store.dispatch('mapEdit/setPosition', prop)
            }

            this.$store.dispatch('mapEdit/setMousePosition', prop)
        },
        onMousedown() {
            this.$store.dispatch('mapEdit/toggleMapGrabbing')
            this.$store.dispatch('mapEdit/clearSelection')
        },
        onMouseup() {
            if(this.$store.state.mapEdit.grabbing)
                this.$store.dispatch('mapEdit/toggleGrabbing')
            if(this.$store.state.mapEdit.mapGrabbing)
                this.$store.dispatch('mapEdit/toggleMapGrabbing')
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
