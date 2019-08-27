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
        },
        selected: {
            type: Boolean,
            required: true
        },
        layerActive: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        select() {
            if(!this.selected)
                this.$store.dispatch('mapEdit/select', {toolId: this.id})
        },
        multiSelect() {
            // 今回は出番なし?
            if(!this.selected)
                this.$store.dispatch('mapEdit/select', {toolId: this.id, multiple: true})
        },
        grab() {
            if(this.selected)
                this.$store.dispatch('mapEdit/toggleGrabbing')
        }
    },
    computed: {
        plotting () {
            return this.$store.state.mapEdit.plotting
        }
    },
}
</script>
