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
        },
        selected: {
            type: Boolean,
            required: true
        },
        grabbing: {
            type: Boolean,
            required: true
        },
        plotting: {
            type: Boolean,
            required: true
        },
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
        color() {
            return this.selected ? '#42b983' : '#000'
        }
    }
}
</script>
