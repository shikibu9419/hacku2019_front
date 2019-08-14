<template lang="pug">
    .container
        tool-bar
        .board(ref="board" id="container")
            svg.graph(@mousemove="moveTools" @mousedown="clearSelection" @mouseup="unGrab")
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
import ToolBar from '~/components/ToolBar'

export default {
    components: {
        Example,
        ToolBar
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
        moveTools(e) {
            const selectedNum = Object.keys(this.$store.state.board.selected).length
            if (this.$store.state.isGrabbing && selectedNum) {
                const prop = {
                    x: e.pageX - this.offset.x,
                    y: e.pageY - this.offset.y
                }
                this.$store.dispatch('board/setPosition', prop)
            }
        },
        clearSelection() {
            this.$store.dispatch('toggleGrabbing')
            this.$store.dispatch('board/clearSelection', {user_id: 'hoge'})
        },
        unGrab() {
            if(this.$store.state.isGrabbing)
                this.$store.dispatch('toggleGrabbing')
        },
        setOffset() {
            const rect = this.$refs.board.getBoundingClientRect()

            this.offset = {
                x: window.pageXOffset + rect.left,
                y: window.pageYOffset + rect.top
            }
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
