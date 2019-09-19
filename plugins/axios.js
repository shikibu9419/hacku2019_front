import Vue from 'vue';

export default function({ $axios, store, redirect }) {
  $axios.onRequest(config => {
    config.headers.common['x-api-key'] = store.state.user.apiToken;
  });
}
