<template lang="pug">
  .sunaba
    .sunaba_wrapper
      BoxToolBlock(:box_datas="box_data_1")
    .sunaba_wrapper
      BoxToolBlock(:box_datas="box_data_2")
    .sunaba_wrapper
      BoxToolBlock(:box_datas="box_data_3")
    .sunaba_wrapper
      BoxToolBlock(:box_datas="box_data_4")
    .sunaba_wrapper
      BoxToolBlock(:box_datas="box_data_5")
    .sunaba_wrapper
      BoxToolBlock(:box_datas="box_data_6")
</template>
<script>
export default {
  components:{
    BoxToolBlock: () => import('~/components/atoms/sunaba/BoxToolBlock')
  },
  data(){
    return {
      box_data_1:{
        title: 'タイトル',
        data: [
          {
            type: 'text',
            text: 'テキスト\nテキスト\nテキスト\nテキスト\nテキスト\nテキスト\nテキスト\nテキスト'
          }
        ]
      },
      box_data_2:{
        title: 'タイトル',
        data: [
          {
            type: 'image',
            src: ['./icon.png']
          }
        ]
      },
      box_data_3:{
        title: 'タイトル',
        data: [
          {
            type: 'comment',
            icon: null,
            username: 'tanakataro',
            text: 'テキストテキストテキスト'
          }
        ]
      },
      box_data_4:{
        title: 'タイトル',
        data: [
          {
            type: 'link',
            link: 'https://google.com',
            text: 'テキストテキストテキスト'
          }
        ]
      },
      box_data_5:{
        title: 'タイトル',
        data: [
          {
            type: 'image',
            src: ['./icon.png','./icon.png','./icon.png']
          },
          {
            type: 'text',
            text: 'テキスト\nテキスト\nテキスト\nテキスト\nテキスト\nテキスト\nテキスト\nテキスト'
          },
          {
            type: 'text',
            text: 'テキスト\nテキスト\nテキスト\nテキスト\nテキスト\nテキスト\nテキスト\nテキスト'
          }
        ]
      },
      box_data_6:{
        title: 'タイトル',
        data: null
      },
    }
  }
}
</script>
<style lang="scss" scoped>
.sunaba_wrapper {
  padding: 20px;
}
</style>