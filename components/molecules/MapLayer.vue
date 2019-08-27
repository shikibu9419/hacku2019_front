<template lang="pug">
    .map_edit__map__layer
        svg.map_edit__map__svg(@mousemove="onMousemove" @mousedown="onMousedown" @mouseup="onMouseup" @click.right="stopPlot" ref="layer" cursor="grab")
            tool(v-for="[id, attr] in unSelectingTools" :key="attr.id" :id="id" :attr="attr" :selected="false")
            toolbar(v-if="isActive")
            tool(v-for="[id, attr] in selectingTools"   :key="attr.id" :id="id" :attr="attr" :selected="true")
</template>

<script>
export default {
    components: {
        Tool: () => import('~/components/atoms/mapTools/Tool'),
        Toolbar: () => import('./Toolbar')
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        tools: {
            type: Object,
            required: true
        },
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
        stopPlot() {
            if (this.$store.state.mapEdit.plotting)
                this.$store.dispatch('mapEdit/togglePlotting')
            this.onMouseup()
        }
    },
    mounted() {
        this.setOffset()
        window.addEventListener('resize', () => this.setOffset())
        window.addEventListener('scroll', () => this.setOffset())
    },
    computed: {
        unSelectingTools() {
            const toolIds = Object.keys(this.$store.getters['mapEdit/selecting'])
            return Object.entries(this.tools).filter(item => !toolIds.includes(item[0]))
        },
        selectingTools() {
            const toolIds = Object.keys(this.$store.getters['mapEdit/selecting'])
            return Object.entries(this.tools).filter(item => toolIds.includes(item[0]))
        },
        isActive() {
            return this.id === this.$store.state.mapEdit.activeLayer.id
        }
    }
}
</script>

<style lang="scss">
.map_edit__map__layer {
    position: absolute;
    top: 50px;
    width: 100%;
    height: 700px;
}

.map_edit__map__svg {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
