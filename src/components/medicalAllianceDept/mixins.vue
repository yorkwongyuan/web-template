<script>
export default {
  data () {
    return {
      showDeptSettingBox: false,
      currentDepSetting: null,
      childDepartment: [] // 子部门
    }
  },
  methods: {
    renderContent (h, { node, data, store }, isNoRightIcon) {
      let args = Array.from(arguments)
      if (args.length === 3) {
        [isNoRightIcon, h, { node, data, store }] = args
      }
      if (isNoRightIcon) {
        return (
          <span class="orgStruction" style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span class="orgStructionName">{node.label}</span>
            <span class="orgStruction-right">
              <span style="font-size: 12px;" type="text" class="org-count">{data.memberSum}</span>
            </span>
          </span>)
      } else {
        return (
          <span class="orgStruction" style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span class="orgStructionName">{node.label}</span>
            <span class="orgStruction-right">
              <i on-click={e => this.nodeSetting(e, node, data)}>
                <svg-icon icon-class="orgstruction" class="org-icon"></svg-icon>
              </i>
              <span style="font-size: 12px;" type="text" class="org-count">{data.memberSum}</span>
            </span>
          </span>)
      }
    },
    // 点击设置部门图标
    async nodeSetting (e, node, data) {
      e.stopPropagation()
      console.log(data, 'data')
      this.orgId = data.orgId
      this.currentDepSetting = JSON.parse(JSON.stringify(data))
      await this.allianceOrgList()
      this.showDeptSettingBox = true
    },
    // 添加部门
    addDepart (params) {
      let data = { parentId: this.currentDepSetting.id, ...params }
      return new Promise(resolve => {
        this.axios.post(this.API_URL.platform.addAllianceOrg, data).then(res => {
          if (res.resultCode === 20000) {
            resolve()
            // 弹窗右侧列表更新
            this.allianceOrgList()
            this.getTreeNodeData()
          } else {
            this.$message({ type: 'error', message: res.resultDesc })
          }
        })
      })
    },
    // 删除子部门
    deleteAllianceOrg (orgList) {
      console.log('删除', this.currentDepSetting)

      let data = { relId: this.currentDepSetting.relId, orgList: orgList }
      return new Promise(resolve => {
        this.axios.post(this.API_URL.platform.deleteAllianceOrg, data).then(res => {
          if (res.resultCode === 20000) {
            resolve()
            // 弹窗右侧列表更新
            this.allianceOrgList()
            this.orgId = this.currentDepSetting.parentId
          } else {
            this.$message({ type: 'error', message: res.resultDesc })
          }
        })
      })
    },
    // 保存部门设置
    async saveDeptSetting (val) {
      this.showDeptSettingBox = false
      if (this.currentDepSetting.parentId !== '0') {
        await this.updateAllianceOrg(val)
      }
      this.getTreeNodeData()
    },
    update () {
      this.showDeptSettingBox = false
      this.getTreeNodeData()
    },
    // 取消部门设置
    cancelDeptSetting () {
      this.showDeptSettingBox = false
    },
    // 关闭部门设置
    closeDeptSetting () {
      this.showDeptSettingBox = false
    },
    // 获取部门列表
    allianceOrgList () {
      let data = {
        orgId: this.currentDepSetting.orgId,
        relId: this.currentDepSetting.relId
      }
      return new Promise(resolve => {
        this.axios.post(this.API_URL.platform.allianceOrgList, data).then(res => {
          if (res.resultCode === 20000) {
            this.childDepartment = res.resultData
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: res.resultDesc
            })
          }
        })
      })
    },
    // 更新部门列表
    updateAllianceOrg (val) {
      let data = {
        orgId: this.currentDepSetting.orgId,
        ...val
      }
      return new Promise(resolve => {
        this.axios.post(this.API_URL.platform.updateAllianceOrg, data).then(res => {
          if (res.resultCode === 20000) {
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: res.resultDesc
            })
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
.doctor-manage__main__l {
  .el-tree-node__content {
    height: auto;
    &:hover {
      background: #e7ebfc !important;
      .org-icon {
        display: inline-block;
      }
      .org-count {
        display: none;
      }
    }
    .org-icon {
      display: none;
    }
    .orgStruction {
      .orgStructionName {
        display: inline-block;
        white-space: pre-wrap;
      }
      .orgStruction-right {
      }
    }
  }
}
</style>
