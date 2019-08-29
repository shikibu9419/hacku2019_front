// import store from '~/store/index'
import PopupModal from '~/components/molecules/PopupModal'

export default class ModalService {
    constructor(store) {
        this.store = store
    }
    openPopup(message, onOk) {
        this.store.dispatch('modal/openModal', {
            component: 'PopupModal',
            params: {
                message: message,
                onOk: onOk
            }
        })
    }
    close() {
        this.store.dispatch('modal/closeModal')
    }
}
