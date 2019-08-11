<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        attr: {
            type: Object,
            required: true
        }
    },
    methods: {
        select() {
            this.$store.dispatch('toggleGrabbing')
            if(!this.isSelected()) this.$store.dispatch('board/selectElement', {type: this.type, id: this.id})
        },
        isSelected() {
            var selectedElems = this.$store.getters['board/selected']
            var filteredElems = selectedElems.filter(elem => elem.type === this.type && elem.id === this.id)
            return filteredElems.length > 0
        }
    }
}
</script>
