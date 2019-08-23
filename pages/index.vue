<template lang="pug">
    map-edit
</template>

<script>
export default {
    layout: 'MapHeader',
    components: {
        MapEdit: () => import('~/components/organisms/MapEdit'),
    }
}
</script>
