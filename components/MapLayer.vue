<template lang="pug">
    .container
        button(type="button" @click="addCircle") addCircle
        .board(ref="board" id="container")
            svg.graph(@mousemove="onMousemove" @mousedown="onMousedown" @mouseup="onMouseup" @click.right="onRightClick")
                example(v-for="[id, attr] in Object.entries(tools)" :key="attr.id"
                        :id="id" :attr="attr")
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
        onMousemove(e) {
            const selectedNum = Object.keys(this.$store.state.board.selected).length
            if (this.$store.state.isGrabbing && selectedNum) {
                const prop = {
                    x: e.pageX - this.offset.x,
                    y: e.pageY - this.offset.y
                }
                this.$store.dispatch('board/setPosition', prop)
            }
        },
        onMousedown() {
            this.$store.dispatch('toggleGrabbing')
            this.$store.dispatch('board/clearSelection', {user_id: 'hoge'})
        },
        onMouseup() {
            this.$store.dispatch('toggleGrabbing')
        },
        onRightClick() {
            this.$store.dispatch('board/clearSelection', {user_id: 'hoge'})
        },
        setOffset() {
            const rect = this.$refs.board.getBoundingClientRect()

            this.offset = {
                x: window.pageXOffset + rect.left,
                y: window.pageYOffset + rect.top
            }
        },
        addCircle() {
            this.$store.dispatch('board/add', { type: 'circle', x: 50, y: 50, r: 20})
        },
    },
    mounted() {
        this.setOffset()
        window.addEventListener('resize', () => this.setOffset())
        window.addEventListener('scroll', () => this.setOffset())
    },
    computed: {
        tools() {
            return this.$store.state.board.tools
        }
    },
}
</script>
