<template lang="pug">
    example(v-if="attr.type === 'circle'" :id="id" :attr="attr")
    ex-poly(v-else-if="attr.type === 'polygon'" :id="id" :attr="attr")
    ex-rect(v-else-if="attr.type === 'rect'" :id="id" :attr="attr")
</template>

<script>
import Example from '~/components/map_tools/Example.vue'
import ExPoly from '~/components/map_tools/ExPoly.vue'
import ExRect from '~/components/map_tools/ExRect.vue'

export default {
    components: {
        ExPoly, ExRect, Example
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
