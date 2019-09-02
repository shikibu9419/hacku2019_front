import axios from 'axios'
const baseUrl = 'https://api.mille-feuille.app/maps'

export default {
    create(token, mapId, layerId, toolType, data) {
        return axios.post(
            `${baseUrl}/${mapId}/layers/${layerId}/tools`,
            JSON.stringify({ tool_type: toolType, data: data }),
            { headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': token
            }}
        )
    },
}