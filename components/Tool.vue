<template lang="pug">
    example(v-if="attr.type === 'circle'" :id="id" :attr="attr")
</template>

<script>
import Example from '~/components/map_tools/Example.vue'

export default {
    components: {
        Example
    },
    props: {
        id: {
            type: String,
            required: true
        },
        attr: {
            type: Object,
            required: true
        }
    },
}
</script>
