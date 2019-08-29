<template>
  <div>
    <div class="org-manage-content white_bg">
      <div class="control-bar white_bg">
        <el-button class="control-bar__left"
                   size="medium"
                   type="primary"
                   @click="$emit('clickleft')">{{leftBtnText}}</el-button>
        <el-button class="control-bar__left"
                   size="medium"
                   @click="$emit('clickright')">{{rightBtnText}}</el-button>
        <el-input :placeholder="placeholder"
                  class="control-bar__right"
                  suffix-icon="el-icon-search"
                  size="small"
                  @input="$emit('input',$event)"></el-input>
      </div>
      <main class="scroll-el"
            @scroll="_scroll">
        <slot>
          <!-- table -->
        </slot>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  props: ['leftBtnText', 'rightBtnText', 'placeholder', 'scrollFunc'],
  methods: {
    async _scroll () {
      let scrollEl = document.querySelector('.scroll-el')
      if (scrollEl.scrollTop + scrollEl.offsetHeight >= scrollEl.scrollHeight) {
        this.isLoading = true
        await this.scrollFunc()
        this.isLoading = true
      }
    },
    bindScroll () {

    }
  }
}
</script>

<style lang="scss">
@import './common.scss';
.pointer {
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
$blue: #466ef0;
.org-manage-content {
  padding: 24px;
  .control-bar {
    margin-bottom: 16px;
    .control-bar__left {
    }
    .control-bar__right {
      width: 240px;
      float: right;
    }
  }
  .actions {
    cursor: pointer;
    font-size: 14px;
    color: $blue;
  }
}
.scroll-el {
  height: calc(100vh - 236px);
  overflow-y: scroll;
}
</style>
