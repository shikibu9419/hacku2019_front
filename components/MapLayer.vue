<template lang="pug">
    .container
        toolbar.toolbar
        .board(ref="board" id="container")
        svg.graph(@mousemove="onMousemove" @mousedown="onMousedown" @mouseup="onMouseup")
            tool(v-for="[id, attr] in Object.entries(tools)" :key="attr.id"
                 :id="id" :attr="attr")
</template>

<style lang="scss">
    .graph {
        width: 100%;
        height: 500px;
    }
    .toolbar {
        position: absolute;
        z-index: 10;
    }
</style>

<script>
import Tool from "~/components/Tool";
import Toolbar from "~/components/Toolbar";

export default {
    components: {
        Tool,
        Toolbar
    },
    methods: {
        onMousemove(e) {
            const prop = {
            x: e.pageX - this.$store.state.offset.x,
            y: e.pageY - this.$store.state.offset.y
        };

        this.$store.dispatch("setMousePosition", prop);

        if (!this.$store.state.grabbing && !this.$store.state.plotting) return;
        if (!Object.keys(this.$store.getters["board/selecting"]).length) return;
        this.$store.dispatch("board/setPosition", prop);
    },
    onMousedown() {
        this.$store.dispatch("board/clearSelection");
    },
    onMouseup() {
        if (this.$store.state.grabbing) this.$store.dispatch("toggleGrabbing");
    },
    setOffset() {
            const rect = this.$refs.board.getBoundingClientRect();
            const prop = {
                x: window.pageXOffset + rect.left,
                y: window.pageYOffset + rect.top
            };
            this.$store.dispatch("setOffset", prop);
        }
    },
    mounted() {
        this.setOffset();
        window.addEventListener("resize", () => this.setOffset());
        window.addEventListener("scroll", () => this.setOffset());
    },
    computed: {
        tools() {
            return this.$store.state.board.tools;
        }
    }
};
</script>
