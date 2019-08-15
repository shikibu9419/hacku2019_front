<style lang="scss">
.tool {
    fill: #none;
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
        grab() {
            if(this.isSelected())
                this.$store.dispatch('toggleGrabbing')
        },
        isSelected() {
            return this.$store.state.board.selected[this.id]
        }
    },
    computed: {
        color() {
            return this.isSelected() ? '#42b983' : '#000'
        }
    }
}
</script>
