<template lang="pug">
    map-edit.map_edit
</template>

<script>
export default {
    layout: 'MapHeader',
    components: {
        MapEdit: () => import('~/components/organisms/MapEdit'),
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit{
    width: 100%;
    height: calc(100vh - $header-height);
    overflow: hidden;
}
</style>