<template lang="pug">
  .header_search
    .search_input
      button(@click="update()").search_button.button
        SearchBtn.search_button__icon
      input(v-model="query" :placeholder="placeholder" @change="update()").header_search__input
    .filter_wrapper(v-if="type.split('/')[0] === 'maplists'")
      button(
        @click="toggleFilterMenu()"
        :class="{'filter_button--on':!filterMenu_close}"
      ).filter_button.button
        FilterBtn.filter_button__icon
        .filter_button__text Filter
      .filter_menu(:class="{'filter_menu--open':!filterMenu_close}")
        .sidebar__map_tags__tags
          .filter_menu__type__text タグ：
          .sidebar__map_tags__tags__wrapper(
              v-if="!editingTags"
              @click="editTags()"
            )
            .sidebar__map_tags__tag--placeholder(v-if="filter.tags.length==0") 何も設定されていません
            .sidebar__map_tags__tag(v-for="(tag, index) in filter.tags" v-bind="filter.tags" :key="`header_search_tags_${tag.key}_${index}`")
              .sidebar__map_tags__tag__text {{tag.value}}
          .vue_tags_input__wrapper()
            VueTagsInput(
              v-if="editingTags"
              :selected-tags="filter.tags"
              :existing-tags="existingTags"
              @edit-tags-finish="editTagsFinish"
              :placeholder="'タグで検索'"
              :button_text="'決定'"
            ).filter_menu__input_text
        .filter_menu__types
          .filter_menu__type
            .filter_menu__type__text マイマップ：
            .filter_menu__type__input
              input(v-model="filter.mymap" type="checkbox")
          .filter_menu__type
            .filter_menu__type__text ストック：
            .filter_menu__type__input
              input(v-model="filter.stock" type="checkbox")
          .filter_menu__type
            .filter_menu__type__text いいね：
            .filter_menu__type__input
              input(v-model="filter.like" type="checkbox")


</template>
<script>
import Vue from 'vue';
export default {
  components: {
    //svg
    SearchBtn: () => import('~/assets/svgs/search.svg?inline'),
    FilterBtn: () => import('~/assets/svgs/filter.svg?inline'),
    //components
    VueTagsInput: () => import('~/components/atoms/VueTagsInput'),
  },
  props: ['placeholder', 'type'],
  data() {
    return {
      editingTags: false,
      filter: {
        tags: [],
        like: false,
        mymap: false,
        stock: false,
      },
      query: '',
      filterMenu_close: true,
    };
  },
  computed: {
    existingTags() {
      return [
        { key: 100, value: 'red' },
        { key: 101, value: 'blue' },
        { key: 102, value: 'green' },
      ];
    },
  },
  mounted() {
    //ページ遷移でfilterの設定を変更
    if (this.type.split('/')[1] === 'like') {
      this.filter.like = true;
    }
    if (this.type.split('/')[1] === 'mymap') {
      this.filter.mymap = true;
    }
    if (this.type.split('/')[1] === 'stock') {
      this.filter.stock = true;
    }
  },
  methods: {
    update() {
      if (this.type === 'inmap') this.searchYOLP();
      if (this.type.split('/')[0] === 'maplists') {
        this.searchMap();
      }
    },
    searchYOLP() {
      this.$store.dispatch('ymap/resetMarkers');

      const baseUrl = 'https://map.yahooapis.jp/search/local/V1/localSearch';

      this.$jsonp(baseUrl, {
        appid: process.env.YOLP_APPID,
        query: this.query,
        output: 'json',
      }).then(response => {
        if (response.ResultInfo.Count === 0) return;

        const latlngs = response.Feature.map(feature =>
          feature.Geometry.Coordinates.split(',')
            .map(c => parseFloat(c))
            .reverse()
        );
        this.$store.dispatch('ymap/setMarkers', latlngs);
      });
    },
    searchMap() {
      const baseUrl = process.env.API_URL + '/maps';
      const filter =
        (
          (this.filter.like ? 'like,' : '') +
          (this.filter.mymap ? 'mymap,' : '') +
          (this.filter.stock ? 'stock,' : '')
        ).slice(0, -1) || 'all';
      this.$axios
        .get(baseUrl, {
          params: {
            query: this.query,
            tags: this.filter.tag,
            filter: filter,
          },
        })
        .then(response => {
          this.$store.dispatch('maplist/setMaps', response.data);
        })
        .catch(err => {
          Vue.toasted.error('検索に失敗しました');
        });
    },
    toggleFilterMenu() {
      this.filterMenu_close = this.filterMenu_close ? false : true;
    },
    editTags() {
      // タグ検索inputを表示
      this.editingTags = true;
    },
    editTagsFinish(tags) {
      this.filter.tags = tags;
      //this.$store.dispatch('', tags)
      this.editingTags = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
@import '~/assets/styles/mixin.scss';

.header_search {
  position: relative;
  display: flex;
  align-items: center;
}

button {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: min-content;
  height: min-content;
  border: none;
  padding: 0;
}

.search_button {
  left: 4px;
  background: transparent;
}
.search_button__icon {
  display: block;
  width: 28px;
  height: 28px;
}
.search_cls-2 {
  fill: $gray;
}

.header_search__input {
  padding: 8px 12px;
  padding-left: 36px;
  min-width: 420px;
  border: 1px solid $gray;
  color: $gray;
  transition: 0.2s $bezier-ease-out;
  &:focus {
    color: $dark-gray;
  }
}

.filter_wrapper {
  position: relative;
  display: block;
  width: min-content;
  height: auto;
  padding: 0 10px;
  z-index: 1;
}
.filter_button {
  background: transparent;
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &--on {
    .filter_button__icon {
      .filter_cls-1 {
        fill: $theme-pink !important;
      }
    }
    .filter_button__text {
      color: $theme-pink;
    }
  }
}
.filter_button__icon {
  display: block;
  width: 28px;
  height: 28px;
}
.filter_button__text {
  padding-left: 2px;
}

.filter_menu {
  position: absolute;
  top: 0;
  right: -80px;
  background: $white;
  padding: 16px 20px;
  border-radius: 8px;
  z-index: -1;
  transform: translateY(-20px);
  opacity: 0;
  transition: 0.3s $bezier-ease-out;
  pointer-events: none;
  width: 300px;
  box-shadow: 0 4px 12px rgba($black, 0.3);
  &--open {
    transform: translateY(30px);
    opacity: 2;
    pointer-events: auto;
  }
}
.filter_menu__input_text {
  width: 100%;
}
.filter_menu__type {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.sidebar__map_tags__tags {
  width: 100%;
}
.sidebar__map_tags__tags__wrapper {
  width: 100%;
  min-height: 30px;
  background: $back-gray;
  padding: 0.5rem 0.25rem;
  border: 2px solid transparent;
  cursor: pointer;
  margin-bottom: 8px;
  &:hover {
    border: 2px solid $gray;
  }
}
.sidebar__map_tags__tags__wrapper--click {
  cursor: pointer;
  &:hover {
    background: $back-light-gray;
  }
}
.sidebar__map_tags__tag {
  display: inline-block;
  margin-bottom: 4px;
  padding: 1px 8px;
  background: $white;
  margin-right: 4px;
  border-radius: 8px;
  &__text {
    @include noto-font(1.4rem);
  }
}
</style>
