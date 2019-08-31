<template lang="pug">
  .maplist__card
    img.maplist__card__img(:src="mapCard.img_url")
    .maplist__card__content
      .map_title {{ mapCard.title }}
      UserInfo(
        :username="mapCard.author"
        :mulch_user="mapCard.editors"
      )
      .maplist__card__layers
        font-awesome-icon.maplist__card__icon(icon="layer-group")
        tag-item(v-for="layer in mapCard.layers" v-bind="layer" :key="`maplist_layer_${layer.id}`")
      .maplist__card__tags
        font-awesome-icon.maplist__card__icon(icon="tag")
        tag-item(v-for="tag in mapCard.tags" v-bind="tag" :key="`maplist_tag_${tag.id}`")
      .maplist__card__comments
        Comment(:comment_count="mapCard.comments.length")
</template>

<script>

export default {
  name: "CardTile",
  components: {
    //components
    UserInfo: () => import('~/components/atoms/UserInfo'),
    TagItem: () => import('~/components/atoms/TagItem'),
    Comment: () => import('~/components/atoms/CardTile/Comment')
  },
  props: ["mapCard"]
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

$card-width : $sidemenu-width * 1.4;
$card-height : $card-width / 3;

.maplist__card {
  width: $card-width;
  margin: 18px 6px;
  background: $white;
}
.maplist__card__img {
  display: block;
  width: $card-width;
  height: $card-height;
  object-fit: cover;
}
.maplist__card__content {
  padding: 4px 18px 12px;
}
.map_title {
  @include noto-font(1.8rem,$text-black);
  padding: 6px 0;
}
</style>
