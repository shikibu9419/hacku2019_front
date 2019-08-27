<template lang="pug">
  .maplists
    .maplist(v-for="(list,list_id) in lists" :key="`maplist_${list_id}`")
</template>
<script>
export default {
  props:['lists'],
  data(){
    return{

    }
  }
}
</script>