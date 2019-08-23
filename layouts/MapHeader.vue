<template lang="pug">
    .container
        map-header
        nuxt
</template>

<script>
    export default {
        components: {
            MapHeader: () => import('~/components/organisms/MapHeader')
        }
    }
</script>
