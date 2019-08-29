<style lang="scss">
  .tooltip {
    position: fixed;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 15px;
    border-radius: 4px;
    font-size: 16px;
    color: #FFFFFF;
    background-color: rgba(0, 0, 0, .35);
    z-index: 2018;
  }
</style>
<template>
  <div class="tooltip" v-text="text" v-show="flag" :style="style">
  </div>
</template>

<script>
export default {
  name: 'tooltip',
  data () {
    return {
      text: '',
      flag: true,
      time: 0,
      style: {}
    }
  },
  methods: {
    close () {
      this.flag = false
    },
    show (options) {
      if (options) {
        this.text = options.text
        if (options.time) {
          setTimeout(this.close, options.time)
        }
      }
      this.flag = true
    }
  },
  mounted () {
    if (this.time) setTimeout(this.close, this.time)
    if (!this.text) this.close()
  }
}
</script>
