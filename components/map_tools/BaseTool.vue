<style lang="scss">
.tool {
    fill-opacity: 0;
    cursor: pointer;
    stroke-width: 2;
}
.plot {
    fill: white;
    cursor: pointer;
    stroke-width: 2;
}
</style>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        attr: {
            type: Object,
            required: true
        }
    },
    methods: {
        select() {
            if(!this.isSelected())
                this.$store.dispatch('board/select', {tool_id: this.id})
        },
        multiSelect() {
            // 今回は出番なし?
            if(!this.isSelected())
                this.$store.dispatch('board/select', {tool_id: this.id, multiple: true})
        },
        grab() {
            if(this.isSelected())
                this.$store.dispatch('toggleGrabbing')
        },
        isSelected() {
            return this.$store.state.board.selected[this.id]
        }
    },
    computed: {
        selected() {
            return this.isSelected()
        },
        color() {
            return this.isSelected() ? '#42b983' : '#000'
        }
    }
}
</script>
