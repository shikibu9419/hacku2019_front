<script>
const baseUrl = process.env.API_URL + '/maps';

export default {
  methods: {
    toolSvcCreate(mapId, layerId, toolType, data) {
      return this.$axios.post(
        `${baseUrl}/${mapId}/layers/${layerId}/tools`,
        JSON.stringify({ tool_type: toolType, data: data }),
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.$store.getters['user/getToken'],
          },
        }
      );
    },
  },
};
</script>
