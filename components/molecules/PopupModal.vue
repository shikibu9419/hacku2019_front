<template lang="pug">
    .popup-modal
        .popup-modal__popup-content {{params.message}}
        //.popup-modal__popup-content(v-bind:is="getComponentName(popupModalParams.type)" v-bind:params.async="params")
</template>

<script>
    import ModalSvc from '~/services/ModalSvc'
    export default {
        components: {
            BoxAndPinPopup: () => import('~/components/atoms/mapEdit/BoxAndPinPopup')
        },
        props: {
            params: {
                message: String,
                onOk: null
            }
        },
        methods: {
            closeModal() {
                ModalSvc.close()
            }
        }
    }
</script>

<style lang="scss">
    .popup-modal {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        filter: brightness(0.8) blur(5px);
        &__popup-content {
            height: 100px;
            width: 100px;
        }
    }
</style>