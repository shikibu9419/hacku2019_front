<style lang="scss">
.tool {
    fill: #fff;
    cursor: pointer;
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
                this.$store.dispatch('board/select', {tool_id: this.id, user_id: 'hoge'})
        },
        grab() {
            if(this.isSelected())
                this.$store.dispatch('toggleGrabbing')
        },
        isSelected() {
            return this.$store.state.board.selected[this.id]
        }
    }
}
</script>
