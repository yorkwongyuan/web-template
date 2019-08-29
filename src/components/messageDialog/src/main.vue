<style scoped lang="scss">
.message-dialog-box {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 999;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  .dialog-block {
    border-radius: 4px;
    position: relative;
    background-color: #FFFFFF;
    overflow: hidden;
    margin-left: 50%;
    transform: translateX(-50%) translateY(-50%);
    top: 50%;
    width: 400px;
    height: 176px;
    padding: 24px 24px 24px 60px;
    .type-icon{
      position: absolute;
      left: 24px;
      top: 24px;
      width: 24px;
      height: 24px;
    }
    .title{
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #000000;
      line-height: 24px;
      margin-bottom: 4px;
    }
    .content{
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: #555555;
      line-height: 22px;
    }
    .footer {
      position: absolute;
      background-color: #FFFFFF;
      right: 24px;
      bottom: 24px;
      height: 32px;
    }
  }
}

</style>
<template>
    <div class="message-dialog-box" v-if="showMessageDialogBox">
      <div class="dialog-block">
        <img src="../icon/dialog.png" class="type-icon" alt="" v-if="type === 'dialog'">
        <img src="../icon/success.png" class="type-icon" alt="" v-if="type === 'success'">
        <img src="../icon/error.png" class="type-icon" alt="" v-if="type === 'error'">
        <img src="../icon/info.png" class="type-icon" alt="" v-if="type === 'info'">
        <img src="../icon/warning.png" class="type-icon" alt="" v-if="type === 'warning'">
        <div class="title" v-text="title"></div>
        <div class="content" v-text="content1"></div>
        <div class="content" v-text="content2" v-if="content2"></div>
        <div class="footer">
          <el-button size="medium" v-text="cancelText" v-if="type === 'dialog'" @click="clickCancel"></el-button>
          <el-button size="medium" type="primary" v-text="confirmText" @click="clickConfirm"></el-button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'messageDialogBox',
  data () {
    return {
      showMessageDialogBox: true,
      /* type必填，有五种情况：
      *  1.success：成功的信息提示，只有一个知道了的按钮
      *  2.error：  错误的信息提示，只有一个知道了的按钮
      *  3.info：   通知的信息提示，只有一个知道了的按钮
      *  4.warning：警告的信息提示，只有一个知道了的按钮
      *  5.dialog： 对话框比如删除，有取消和确定两个按钮 */
      type: '',
      /* title必填 */
      title: '',
      /* content1必填 */
      content1: '',
      /* content2非必填 */
      content2: '',
      /* type为dialog才有取消按钮 */
      cancelText: '取消',
      confirmText: '确定',
      confirm: null
    }
  },
  methods: {
    clickCancel () {
      this.showMessageDialogBox = false
    },
    clickConfirm () {
      this.confirm()
      this.showMessageDialogBox = false
    }
  }
  /*
    用法一：删除对话框
     this.$messageDialog({
      type: 'dialog',
      title: '确认删除',
      content1: '删除患者将永久删除该患者资料且无法恢复，是否确定删除该患者信息？',
      cancelText: '取消',
      confirmText: '确定',
      confirm () {
        alert('确定')
      }
    })
    用法二：成功信息提示
     this.$messageDialog({
      type: 'success',
      title: '成功提示',
      content1: '成功',
      content2: '成功可不填',
      confirmText: '知道了',
      confirm () {
        alert('知道了')
      }
    })
    用法三：错误信息提示
     this.$messageDialog({
      type: 'error',
      title: '错误提示',
      content1: '错误',
      content2: '错误可不填',
      confirmText: '知道了',
      confirm () {
        alert('知道了')
      }
    })
    用法四：警告信息提示
     this.$messageDialog({
      type: 'warning',
      title: '警告提示',
      content1: '警告',
      content2: '警告可不填',
      confirmText: '知道了',
      confirm () {
        alert('知道了')
      }
    })
    用法五：通知信息提示
     this.$messageDialog({
      type: 'info',
      title: '通知提示',
      content1: '通知',
      content2: '通知可不填',
      confirmText: '知道了',
      confirm () {
        alert('知道了')
      }
    })
  * */
}
</script>
