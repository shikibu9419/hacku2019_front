<template lang="pug">
    .box-and-pin-popup
        button.close(@click="closeModal")
</template>

<script>
    export default {
        name: "BoxAndPinPopup",
        props: {
            params: Object,
            closeModal: () => {}
        }
    }
</script>

<style lang="scss">
    .box-and-pin-popup {

    }
</style>