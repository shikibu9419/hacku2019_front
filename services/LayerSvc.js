import axios from 'axios'
const baseUrl = 'https://api.mille-feuille.app/maps'
export default {
    create(token, mapId, layerName, description) {
        return axios.post(
            `${baseUrl}/${mapId}/layers`,
            JSON.stringify({ layer_name: layerName, description: description }),
            { headers: {
                'Content-Type': 'application/json',
                'x-api-key': token
            }}
        )
    },
    display(mapId, layerId) {
        return axios.get(`${baseUrl}/${mapId}/layers/${layerId}`)
    },
    edit(token, mapId, layerId, layerName, description) {
        return axios.patch(
            `${baseUrl}/${mapId}/layers/${layerId}`,
            JSON.stringify({ layer_name: layerName, description: description }),
            { headers: {
                'Content-Type': 'application/json',
                'x-api-key': token
            }}
        )
    },
    delete(token, mapId, layerId) {
        return axios.delete(
            `${baseUrl}/${mapId}/layers/${layerId}`,
            { headers: {
                'x-api-key': token
            }}
        )
    }
}
/* curl --location --request POST "https://api.mille-feuille.app/maps/:map_id/layers" \
  --header "Content-Type: application/json" \
  --header "x-api-key: {{key}}" \
  --data "{
	\"layer_name\": \"sample\",
	\"description\": \"sample sample\"
}"*/