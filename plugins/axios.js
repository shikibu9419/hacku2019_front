import Vue from 'vue'

export default function({ $axios, store, redirect }) {
  $axios.onRequest(config => {
    config.headers.common['x-api-key'] = store.state.apiToken
  })
  $axios.onResponse(config => {
    $axios.setHeader('Access-Control-Allow-Origin',  'https://api.mille-feuille.app')
  })
}