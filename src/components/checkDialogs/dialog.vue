<template>
  <div class="component-dialog">
    <el-dialog v-bind="$attrs"
               @update:visible="update"
               :visible="visible"
               :lock-scroll="false"
               :before-close="close">
      <slot v-if="visible">

      </slot>
      <span slot="footer"
            class="dialog-footer">
        <div class="manage-dialog__footer">
          <el-button @click="$emit('cancel')">
            取消
          </el-button>
          <el-button type="primary"
                     @click="$emit('save')">
            保存
          </el-button>
        </div>
      </span>
    </el-dialog>
  </div>

</template>
<script>
export default {
  name: 'manage-dialog',
  data () {
    return {
      bool: true
    }
  },
  props: {
    confirmText: { default: '确定', type: String },
    cancelText: { default: '取消', type: String },
    visible: { default: false, type: Boolean }
  },
  methods: {
    update (newStatus) {
      this.$emit('update:visible', newStatus)
    },
    close () {
      console.log('sadness')
      this.$emit('close')
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>
<style lang="scss">
.component-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #eeeeee;
  }
  .el-dialog__body {
    padding-top: 0px;
  }
}
</style>
