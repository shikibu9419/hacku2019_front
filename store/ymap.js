var ymap = {};
var markers = [];

const pixelToLatLng = function(position) {
  const yLatLng = ymap.fromContainerPixelToLatLng(
    new Y.Point(position.x, position.y)
  );
  return { lat: yLatLng.Lat, lng: yLatLng.Lon };
};

const latLngToPixel = function(position) {
  const yPixel = ymap.fromLatLngToContainerPixel(
    new Y.LatLng(position.lat, position.lng)
  );
  return { x: yPixel.x, y: yPixel.y };
};

const state = () => ({
  center: { lat: 34.7, lng: 135.49 },
  now: {},
  zoom: 18,
});

const mutations = {
  setMarkers(state, latlngs) {
    markers = latlngs.map(function(latlng) {
      const marker = new Y.Marker(new Y.LatLng(...latlng));
      ymap.addFeature(marker);
      return marker;
    });
  },
  resetMarkers(state) {
    for (const marker of markers) ymap.removeFeature(marker);
    markers.length = 0;
  },
  scroll(state, mousePosition) {
    const dlat = mousePosition.now.lat - mousePosition.prev.lat;
    const dlng = mousePosition.now.lng - mousePosition.prev.lng;

    const now = Object.assign({}, state.now);
    now.lat = now.lat - dlat;
    now.lng = now.lng - dlng;

    state.now = now;
    ymap.panTo(new Y.LatLng(...Object.values(now)));
  },
  panTo(state, latlng) {
    ymap.panTo(new Y.LatLng(...Object.values(latlng)));
    state.now = latlng;
  },
  setCenter(state, latlng) {
    state.center = latlng;
  },
  updateNow(state) {
    const yLatLng = ymap.center;
    state.now = { lat: yLatLng.Lat, lng: yLatLng.Lon };
  },
  init(state, prop) {
    state.now = Object.assign({}, state.center);
    ymap = new Y.Map('map-canvas');
    ymap.drawMap(
      new Y.LatLng(...Object.values(state.now)),
      state.zoom,
      Y.LayerSetId.NORMAL
    );
  },
};

const actions = {
  setMarkers(context, latlngs) {
    context.dispatch('resetMarkers');
    context.commit('setMarkers', latlngs);
  },
  resetMarkers(context) {
    context.commit('resetMarkers');
  },
  scroll(context, mousePosition) {
    context.commit('scroll', mousePosition);
  },
  panTo(context, latlng) {
    context.commit('panTo', latlng);
  },
  setCenter(context, latlng) {
    context.commit('setCenter', latlng);
  },
  init(context, prop) {
    context.commit('init');
  },
};

const getters = {
  pixelToLatLng() {
    return pixelToLatLng;
  },
  latLngToPixel() {
    return latLngToPixel;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
