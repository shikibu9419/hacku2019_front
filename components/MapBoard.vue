<template lang="pug">
    .container
        button(type="button" @click="addCircle") addCircle
        .preview(ref="preview" id="container")
            svg.graph(@mousemove="mousemoveOnBoard" @mouseup="mouseupOnBoard")
                circle-element(v-for="(property, index) in elements.circle" :key="index"
                               :property="property" :id="index")
                // bezier-curve
</template>

<style lang="scss">
.graph {
    width: 100%;
    height: 500px;
}
</style>

<script>
import CircleElement from '~/components/map_elements/CircleElement.vue'
import BezierCurve from '~/components/map_elements/BezierCurve.vue'

export default {
    components: {
        CircleElement,
        BezierCurve
    },
    data() {
        return {
            offset: {
                x: 0,
                y: 0
            },
        }
    },
    methods: {
        mousemoveOnBoard(e) {
            if (this.$store.state.board.selected.length) {
                const x = e.pageX - this.offset.x
                const y = e.pageY - this.offset.y
                this.$store.dispatch('board/setPosition', {x: x, y: y})
            }
        },
        mouseupOnBoard() {
            // this.$store.dispatch('board/clearSelection')
        },
        setOffset() {
            const rect = this.$refs.preview.getBoundingClientRect()

            this.offset = {
                x: window.pageXOffset + rect.left,
                y: window.pageYOffset + rect.top
            }
        },
        addCircle() {
            this.$store.dispatch('board/addElement', { type: 'circle', position: {x: 50, y: 50, r: 20}})
        },
    },
    mounted() {
        this.setOffset()
        window.addEventListener('resize', () => this.setOffset())
        window.addEventListener('scroll', () => this.setOffset())
    },
    computed: {
        elements() {
            return this.$store.getters['board/elements']
        }
    },
}
</script>
