<template lang="pug">
    .popup-modal
        .popup-modal__popup-content(v-bind:class="{ 'for-box-and-pin-popup': params.component === 'BoxAndPinPopup' }")
            component(v-bind:is="params.component", :closeModal="closeModal", v-bind:params="params.property")
</template>

<script>
    import ModalSvc from '~/services/ModalSvc'
    import BoxAndPinPopup from '~/components/organisms/Popup/BoxAndPinPopup'
    import LayerSettingPopup from '~/components/organisms/Popup/LayerSettingPopup'
    import ShareSettingPopup from '~/components/organisms/Popup/ShareSettingPopup'
    import LayerPopup from '~/components/organisms/Popup/LayerPopup'
    export default {
        components: {
            BoxAndPinPopup,
            LayerSettingPopup,
            ShareSettingPopup,
            LayerPopup
        },
        props: {
            params: {
                component: String,
                property: Object,
                onOk: () => {}
            }
        },
        methods: {
            closeModal() {
                this.closeModal()
            }
        },
        mixins: [ ModalSvc ]
    }
</script>

<style lang="scss">
    @import "~/assets/styles/variables.scss";
    .popup-modal {
        z-index: 5000000000000000;
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        &__popup-content {
            background: $back-gray;
            height: auto;
            max-height: calc(100vh - (20px * 2));
            width: auto;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
        }
        .for-box-and-pin-popup {
            background: $white;
            padding: 8px;
        }
    }
</style>
