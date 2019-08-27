var ymap = {}
var markers = []

const pixelToLatLng = function(position) {
    const yLatLng = ymap.fromContainerPixelToLatLng(new Y.Point(position.x, position.y))
    return {lat: yLatLng.Lat, lng: yLatLng.Lon}
}

const latLngToPixel = function(position) {
    const yPixel = ymap.fromLatLngToContainerPixel(new Y.LatLng(position.lat, position.lng))
    return {x: yPixel.x, y: yPixel.y}
}


export const state = () => ({
    center: {lat: 35.71, lng: 139.72},
    zoom: 18
})

export const mutations = {
    setMarkers(state, latlngs) {
        markers = latlngs.map(function(latlng) {
            const marker = new Y.Marker(new Y.LatLng(...latlng))
            ymap.addFeature(marker)
            return marker
        })
    },
    resetMarkers(state) {
        for (const marker of markers)
            ymap.removeFeature(marker)
        markers.length = 0
    },
    scroll(state, mousePosition) {
        const dlat = mousePosition.now.lat - mousePosition.prev.lat
        const dlng = mousePosition.now.lng - mousePosition.prev.lng

        const center = Object.assign({}, state.center)
        center.lat = center.lat - dlat
        center.lng = center.lng - dlng

        state.center = center
        ymap.panTo(new Y.LatLng(...Object.values(center)))
    }
}

export const actions = {
    setMarkers(context, latlngs) {
        context.dispatch('resetMarkers')
        context.commit('setMarkers', latlngs)
    },
    resetMarkers(context) {
        context.commit('resetMarkers')
    },
    scroll(context, mousePosition) {
        context.commit('scroll', mousePosition)
    },
    init(context, prop) {
        ymap = new Y.Map('map-canvas')
        ymap.drawMap(new Y.LatLng(...Object.values(context.state.center)),
                    context.state.zoom,
                    Y.LayerSetId.NORMAL);
    }
}

export const getters = {
    pixelToLatLng() {
        return pixelToLatLng
    },
    latLngToPixel() {
        return latLngToPixel
    }
}
