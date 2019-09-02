<script>
export default {
    methods: {
        openPopup(component, property, onOk) {
            this.$store.dispatch('modal/openModal', {
                component: 'PopupModal',
                params: {
                    component: component,
                    property: property,
                    onOk: onOk
                }
            })
        },
        closePopup() {
            this.$store.dispatch('modal/closeModal')
        }
    }
}
</script>
