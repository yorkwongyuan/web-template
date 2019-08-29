<style scoped lang="scss">
.set-medical-alliance-dept {
  .dept-setting-box {
    overflow-y: hidden;
    width: 700px;
    margin: 0 auto !important;
    .dept-info {
      width: 345px;
      height: 100%;
      border-right: 1px solid #d1dbe5;
      .add-child-dept,
      .del-dept {
        width: 100px;
      }
    }
    .child-dept {
      position: relative;
      flex: 1;
      overflow-y: auto;
      .child-dept-table {
        position: absolute;
        top: 60px;
        bottom: 20px;
        overflow-y: auto;
        left: 0;
        right: 0;
      }
      .child-dept-btn {
        position: absolute;
        top: 20px;
        padding-left: 10px;
        width: 100%;
        z-index: 2;
      }
    }
    .new-dept {
      padding: 20px 10px;
      .cancel-add-btn,
      .confirm-add-btn {
        width: 100px;
      }
    }
  }
}
</style>
<style lang="scss">
.set-medical-alliance-dept {
  .dept-setting-form {
    padding: 20px 27px 0;
    .el-input__inner {
      width: 166px;
    }
  }
  .new-dept-form {
    background-color: #f2f2f6;
    padding: 5px 15px 10px;
    border-radius: 4px;
    .el-form-item {
      margin-bottom: 10px !important;
      .el-input--mini {
        width: 166px !important;
      }
    }
  }
  .el-table::before {
    height: 0;
  }
  .el-table th {
    padding: 10px 0;
    box-shadow: 0px 1px 0px 0px #d8dce5;
  }
  .el-table th > .cell {
    color: #2d2f33;
    font-size: 14px;
    line-height: 20px;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgb(219, 233, 249) !important;
  }
  .el-table .cell {
    font-size: 14px;
    color: #5a5e66;
    line-height: 20px;
  }
  .el-table td {
    padding: 10px 0;
    border-bottom: 1px solid #f2f2f6;
  }
  .el-dialog {
    margin-top: 0 !important;
    position: absolute !important;
    top: 90px;
    bottom: 40px;
    border: 1px solid #d8dce5;
    .el-dialog__header {
      position: absolute;
      top: 0;
      padding-top: 10px;
      border-bottom: 1px solid #d8dce5;
      width: 100%;
    }
    .el-dialog__body {
      position: absolute;
      top: 45px;
      bottom: 48px;
      width: 100%;
      overflow: auto;
      padding: 0;
      display: flex;
    }
    .el-dialog__footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding-bottom: 10px;
      background-color: #f2f2f6;
      .save-btn,
      .cancel-btn {
        width: 100px;
      }
      .el-button + .el-button {
        margin-left: 25px;
      }
    }
  }
}
</style>

<template>
  <div class="set-medical-alliance-dept">
    <el-dialog :before-close="close"
               :close-on-click-modal="false"
               :close-on-press-escape="true"
               :show-close="false"
               class="dept-setting-box"
               title="部门设置"
               :visible.sync="showBox"
               width="100%"
               center>
      <div class="fl dept-info">
        <div>
          <el-form label-width="90px"
                   size="small"
                   class="dept-setting-form">
            <el-form-item label="部门名称"
                          required
                          class="por">
              <el-input v-model.trim="localOrgName"
                        maxlength="20"
                        :disabled="currentDepSetting.parentId === '0'"></el-input>
            </el-form-item>
            <el-form-item label="部门位置"
                          class="por"
                          v-if="currentDepSetting.parentId !== '0'">
              <el-input v-model.trim="localOrgPosition"
                        maxlength="20"></el-input>
            </el-form-item>
          </el-form>
          <div class="tc">
            <el-button :type="showNewDept ? 'info' : 'primary'"
                       size="mini"
                       :disabled="showNewDept"
                       @click="showNewDept = true"
                       class="add-child-dept">
              添加下级部门
            </el-button>
            <el-button size="mini"
                       @click="deleteCurrentDept"
                       class="del-dept"
                       :disabled="currentDepSetting.parentId === '0'">
              删除此部门
            </el-button>
          </div>
        </div>
        <div class="new-dept"
             v-show="showNewDept">
          <el-form label-width="90px"
                   size="small"
                   class="new-dept-form">
            <el-form-item label="上级部门"
                          class="por">
              <span class="fc-222326"
                    v-text="currentDepSetting.orgName">
              </span>
            </el-form-item>
            <el-form-item label="部门名称"
                          required
                          class="por">
              <el-input v-model.trim="newDeptName"
                        size="mini"
                        maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="部门位置"
                          class="por">
              <el-input v-model.trim="newDeptPosition"
                        size="mini"
                        maxlength="20"></el-input>
            </el-form-item>
            <div class="tc">
              <el-button class="cancel-add-btn"
                         round
                         size="mini"
                         @click="cancelNewDept">
                取消
              </el-button>
              <el-button class="confirm-add-btn"
                         round
                         @click="confirmAddChildNode"
                         type="primary"
                         size="mini">
                添加
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="child-dept fr">
        <div class="child-dept-btn">
          <el-button :type="selectDept.length <= 0 ? 'info' : 'primary'"
                     size="mini"
                     :disabled="selectDept.length <= 0"
                     @click="deleteDept">
            删除部门
          </el-button>
        </div>
        <el-table class="child-dept-table"
                  ref="depList"
                  :data="childDepartment"
                  tooltip-effect="light"
                  style="width: 100%"
                  height="auto"
                  @selection-change="handleDeptSelection">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column label="部门名称"
                           prop="orgName"
                           width="200"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="allNum"
                           label="人数">
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button class="cancel-btn"
                   round
                   size="mini"
                   @click="cancel()">
          取消
        </el-button>
        <el-button class="save-btn"
                   round
                   type="primary"
                   @click="$emit('save',{orgName:localOrgName,orgPosition:localOrgPosition})"
                   size="mini">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'setMedicalAllianceDept',
  data () {
    return {
      showNewDept: false,
      selectDept: [],
      /* 父页面是否要刷新 */
      needFresh: false,
      showBox: true,
      newDeptName: '',
      newDeptPosition: ''
    }
  },
  props: {
    relId: {
      required: true,
      type: String
    },
    currentDepSetting: {
      required: true,
      type: Object
    },
    childDepartment: {
      type: Array,
      default: () => []
    },
    addDepart: {
      type: Function,
      default: () => ({})
    },
    deleteAllianceOrg: {
      type: Function,
      default: () => ({})
    },
    orgName: {
      required: true,
      type: String
    },
    orgPosition: {
      required: true,
      type: String
    }
  },
  computed: {
    localOrgName: {
      get () {
        return this.orgName
      },
      set (val) {
        this.$emit('update:orgName', val)
      }
    },
    localOrgPosition: {
      get () {
        return this.orgPosition
      },
      set (val) {
        this.$emit('update:orgPosition', val)
      }
    }
  },
  methods: {
    /* 删除本部门以及下级部门 */
    deleteCurrentDept () {
      this.$confirm('此操作将永久删除' + this.currentDepSetting.orgName + '以及下级部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        cancelButtonClass: 'custom-cancel-btn',
        confirmButtonClass: 'custom-confirm-btn',
        roundButton: true,
        type: 'warning'
      }).then(async () => {
        let orgIdList = [this.currentDepSetting.orgId]
        await this.deleteAllianceOrg(orgIdList)
        this.$message({
          type: 'success',
          message: '删除' + this.currentDepSetting.orgName + '以及下级部门成功'
        })
        /* 返回父页面并刷新 */
        this.$emit('update')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /* 删除选中的子部门 */
    deleteDept () {
      this.$confirm('此操作将永久删除选中的部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        cancelButtonClass: 'custom-cancel-btn',
        confirmButtonClass: 'custom-confirm-btn',
        roundButton: true,
        type: 'warning'
      }).then(async () => {
        let orgIdList = []
        this.selectDept.forEach(item => {
          orgIdList.push(item.orgId)
        })
        await this.deleteAllianceOrg(orgIdList)
        this.$message({
          type: 'success',
          message: '删除选中部门成功'
        })
        /* 刷新部门列表 */
        this.needFresh = true
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    cancelNewDept () {
      this.showNewDept = false
      this.newDeptName = ''
      this.newDeptPosition = ''
    },
    /* 确认添加下级部门 */
    async confirmAddChildNode () {
      if (!this.newDeptName.trim()) {
        this.$message({
          type: 'warning',
          message: '部门名称不能为空'
        })
        return
      }
      await this.addDepart({ orgName: this.newDeptName, orgPosition: this.newDeptPosition })
      this.cancelNewDept()
    },
    /* 勾选下级部门 */
    handleDeptSelection (val) {
      this.selectDept = val
    },
    /* 更新部门名称或编码 */
    async updateNode () {
      this.$emit('update')
    },
    close () {
      this.$emit('close', this.needFresh)
    },
    cancel () {
      this.$emit('cancel', this.needFresh)
    }
  },
  async mounted () {
  }
}
</script>
