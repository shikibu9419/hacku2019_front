<template lang="pug">
    .container
        button(type="button" @click="addCircle") addCircle
        .board(ref="board" id="container")
            svg.graph(@mousemove="mousemoveOnBoard" @mousedown="mousedownOnBoard" @mouseup="mouseupOnBoard")
                example(v-for="(attr, index) in elements.circle" :key="index"
                        :attr="attr" :id="index")
</template>

<style lang="scss">
.graph {
    width: 100%;
    height: 500px;
}
</style>

<script>
import Example from '~/components/map_tools/Example.vue'

export default {
    components: {
        Example,
    },
    data() {
        return {
            offset: {
                x: 0,
                y: 0
            }
        }
    },
    methods: {
        mousemoveOnBoard(e) {
            if (this.$store.state.isGrabbing && this.$store.state.board.selected.length) {
                const x = e.pageX - this.offset.x
                const y = e.pageY - this.offset.y
                this.$store.dispatch('board/setPosition', {x: x, y: y})
            }
        },
        mousedownOnBoard() {
            this.$store.dispatch('toggleGrabbing')
            this.$store.dispatch('board/clearSelection')
        },
        mouseupOnBoard() {
            this.$store.dispatch('toggleGrabbing')
        },
        setOffset() {
            const rect = this.$refs.board.getBoundingClientRect()

            this.offset = {
                x: window.pageXOffset + rect.left,
                y: window.pageYOffset + rect.top
            }
        },
        addCircle() {
            this.$store.dispatch('board/add', { type: 'circle', attr: {x: 50, y: 50, r: 20}})
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
