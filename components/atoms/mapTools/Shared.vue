<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    attr: {
      type: Object,
      required: true
    },
    layerActive: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    select() {
      if(!this.selected)
        this.$store.dispatch('mapEdit/selectTool', {toolId: this.id})
    },
    multiSelect() {
      // 今回は出番なし?
      if(!this.selected)
        this.$store.dispatch('mapEdit/selectTool', {toolId: this.id, multiple: true})
    },
    grab() {
      this.select()
      this.$store.dispatch('mapEdit/toggle', 'grabbing')
    }
  },
  computed: {
    plotting() {
      return this.$store.state.mapEdit.plotting
    },
    grabbing() {
      return this.$store.state.mapEdit.grabbing
    },
    selected() {
      return Object.keys(this.$store.state.mapEdit.selected).includes(this.id)
    }
  },
}
</script>
