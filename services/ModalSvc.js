import PopupModal from '~/components/molecules/PopupModal'

export default class ModalService {
    constructor(store) {
        this.store = store
    }
    openPopup(component, property, onOk) {
        this.store.dispatch('modal/openModal', {
            component: 'PopupModal',
            params: {
                component: component,
                property: property,
                onOk: onOk
            }
        })
    }
    close() {
        this.store.dispatch('modal/closeModal')
    }
}
