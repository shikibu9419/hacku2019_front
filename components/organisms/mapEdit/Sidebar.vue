<template lang="pug">
<<<<<<< HEAD:components/molecules/Sidebar.vue
    .map_edit__sidebar(:class="{'map_edit__sidebar--close':menu_close}")
        .map_edit__sidebar__wrapper
            .toggle_sidebar
                button(@click="toggleBar()").toggle_sidebar__button
                    fa-icon(icon="angle-left").toggle_sidebar__button_icon
            h2 this is sidebar
            ul
                li(v-for="[id, layer] in Object.entries(layers)" :key="id") {{ layer }}
            button(@click="addLayer") レイヤー追加
=======
    .map_edit__sidebar
        h2 this is sidebar
        layer-selector
>>>>>>> master:components/organisms/mapEdit/Sidebar.vue
</template>

<script>
export default {
<<<<<<< HEAD:components/molecules/Sidebar.vue
    data(){
        return{
            menu_close:false
        }
=======
    components: {
        LayerSelector: () => import('~/components/molecules/LayerSelector')
>>>>>>> master:components/organisms/mapEdit/Sidebar.vue
    },
    computed: {
        layers () {
            return this.$store.state.mapEdit.layers
        }
    },
    methods: {
        // あとでmodalとかに移行
        addLayer() {
            const prop = {
                name: "layer",
                color: "red",
            }
            this.$store.dispatch('mapEdit/addLayer', prop)
        },
        toggleBar(){
            this.menu_close = (this.menu_close ? false:true)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit__sidebar {
    background-color: $back-gray;
    position: absolute;
    top: 0;
    left: 0;
    width: $sidemenu-width;
    height: 100%;
    z-index: 10;
    transform: translateX(0);
    transition: .2s $bezier-ease-out;
    &--close{
        transform: translateX(-$sidemenu-width);
        .toggle_sidebar__button_icon{
            transform: scale(-1,1);
        }
    }
}
.map_edit__sidebar__wrapper{
    position: relative;
}

.toggle_sidebar {
    position: absolute;
    top:12px;
    left: $sidemenu-width;
}
.toggle_sidebar__button {
    background: $white;
    border: 2px solid $dark-gray;
    border-radius: 0 8px 8px 0;
    border-left: none;
    color: $dark-gray;
    padding: 4px 8px;
    padding-left: 4px;
    &:focus{
        outline: none;
        border-color: $theme-pink;
        color: $theme-pink;
    }
}
.toggle_sidebar__button_icon{
    transition: .2s $bezier-ease-out;
    font-size: 1.8rem;
    transform: scale(1);
}
</style>
