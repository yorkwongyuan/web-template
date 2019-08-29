<style scoped lang="scss">
.no-data {
  text-align: center;
  padding: 50px;
  .no-data-main-text {
    color: #555555;
    font-size: 16px;
    line-height: 24px;
    margin-top: 30px;
  }
  .no-data-text {
    font-size: 14px;
    line-height: 22px;
    margin-top: 30px;
    color: #888888;
  }
}
</style>
<template>
  <div class="no-data">
    <div>
      <img v-if="imgType === 'imgType1'" src="../assets/big-pic/no-data.png" alt="" :width="imgWidth">
      <img v-else src="../assets/big-pic/no-message.png" alt="" :width="imgWidth">
      <div class="no-data-main-text" v-if="mainTitle"
           :style="` margin-top: ${textMarginTop}px;`">{{mainTitle}}</div>
      <div class="no-data-text" :style="!mainTitle ? ` margin-top: ${textMarginTop}px;` : 'margin-top: 0px;'">{{title}}</div>
    </div>
  </div>
</template>

<script>
/*
* 说明：无数据缺省组件
* @date：2019/1/29 17:42
* */
export default {
  name: 'no-data',
  props: {
    /* 有些缺省页设计有两行文字，这里是两行文字中的第一行文字，没传就不显示 */
    mainTitle: {
      default: ''
    },
    /* 缺省页只有一行文字，或者缺省页有两行文字中的第二行文字 */
    title: {
      default: '暂无记录'
    },
    imgType: {
      default: 'imgType2'// 同于控制不同的图，imgType1 || imgType2
    },
    imgWidth: {
      default: '150'// 图片大小
    },
    textMarginTop: {
      default: '30' // 文字与图片间隔
    }
  },
  data () {
    return {}
  },
  methods: {
  /* ======事件部分===↓=== */
  /* ======逻辑处理部分===↓=== */
  /* ======请求接口部分===↓=== */
  }
}
</script>
