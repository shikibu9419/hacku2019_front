<script>
const baseUrl = 'https://api.mille-feuille.app/maps'

export default {
    methods: {
        layerSvcCreate(mapId, layerName, description, color) {
            return this.$axios.post(
                `${baseUrl}/${mapId}/layers`,
                JSON.stringify({ name: layerName, description: description }),
                { headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.$store.getters['user/getToken']
                }}
            )
        },
        layerSvcDisplay(mapId, layerId) {
            return this.$axios.get(`${baseUrl}/${mapId}/layers/${layerId}`)
        },
        layerSvcEdit(mapId, layerId, layerName, description, color) {
            return this.$axios.patch(
                `${baseUrl}/${mapId}/layers/${layerId}`,
                JSON.stringify({ name: layerName, description: description }),
                { headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.$store.getters['user/getToken']
                }}
            )
        },
        layerSvcDelete(mapId, layerId) {
            return this.$axios.delete(
                `${baseUrl}/${mapId}/layers/${layerId}`,
                { headers: {
                    'x-api-key': this.$store.getters['user/getToken']
                }}
            )
        }
    }
}
</script>
