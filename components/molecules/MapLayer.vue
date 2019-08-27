<template lang="pug">
    .map_edit__map__layer
        svg.map_edit__map__svg(@mousemove="move" @mousedown="grabMap" @mouseup="resetGrabbing" @click.right="resetEditting" cursor="grab")
            rect.map_edit__map__svg_filter(v-if="isActive")
            tool(v-for="[id, attr] in unSelectingTools" :key="attr.id" :id="id" :attr="attr" :selected="false" :layer-active="isActive")
            toolbar(v-if="isActive")
            tool(v-for="[id, attr] in selectingTools"   :key="attr.id" :id="id" :attr="attr" :selected="true" :layer-active="isActive")
</template>

<script>
export default {
    components: {
        Tool: () => import('~/components/atoms/mapTools/ToolWrapper'),
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
        move(e) {
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
        grabMap() {
            this.$store.dispatch('mapEdit/toggleMapGrabbing')
            this.$store.dispatch('mapEdit/clearSelection')
        },
        resetGrabbing() {
            if(this.$store.state.mapEdit.grabbing)
                this.$store.dispatch('mapEdit/toggleGrabbing')
            if(this.$store.state.mapEdit.mapGrabbing)
                this.$store.dispatch('mapEdit/toggleMapGrabbing')
        },
        resetEditting() {
            if (this.$store.state.mapEdit.plotting)
                this.$store.dispatch('mapEdit/togglePlotting')
            this.resetGrabbing()
        },
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
    top: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: 100%;
}

.map_edit__map__svg {
    position: absolute;
    width: 100%;
    height: 100%;

    &_filter {
        fill: white;
        fill-opacity: 0.5;
        width: 100%;
        height: 100%;
    }
}
</style>
