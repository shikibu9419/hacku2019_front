<template lang="pug">
    .popup-modal
        .popup-modal__popup-content
            component(v-bind:is="params.component", v-bind:closeModal="closeModal", v-bind:params="params.property")
</template>

<script>
    import ModalService from '~/services/ModalSvc'
    export default {
        components: {
            BoxAndPinPopup: () => import('~/components/atoms/mapEdit/BoxAndPinPopup')
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
                this.modalSvc.close()
            }
        },
        created() {
            this.modalSvc = new ModalService(this.$store)
        }
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
            background: $white;
            height: auto;
            max-height: calc(100vh - (20px * 2));
            width: auto;
            padding: 8px;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
        }
    }
</style>