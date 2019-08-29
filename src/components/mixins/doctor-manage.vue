<script>
import manageDialog from '@component/checkDialogs/dialog.vue'
import setMedicalAllianceDept from '@component/medicalAllianceDept/set-medical-alliance-dept.vue'
export default {
  methods: {
    // 添加医生树形弹窗
    async addDoc () {
      await this.getDocTreeData()
      let vm = this
      this.$selection({
        text: '选择医生',
        model: [],
        empMode: true,
        theme: '#597EF7',
        multiselect: true,
        treeData: vm.empTreeData,
        onConfirm (data) { // 点击确定
          let empList = data.map(item => item.empId)
          vm.empList = empList
          vm.addallianceDoctor()
        }
      })
    },
    // 点击输入框下拉部分
    handleSelect (data) {
      this.keyword = data.empName
      this.nodeKey = [data.orgId]
      this.orgId = data.orgId
      this.$refs.medicalAllianceDeptTree.setCurrentKey(this.orgId)
      this.tableData = [data]
      this.total = 1
    },
    // 搜索框搜索
    async querySearch (keyword, cb) {
      let input = document.querySelector('.autoInput')
      let arr = []
      cb(arr)
      input.onkeyup = async (e) => {
        if (e.keyCode === 13) {
          if (this.keyword) {
            this.search().then(res => {
              if (res.resultCode === 20000) {
                if (!res.resultData.dataList.length) {
                  this.$message({ type: 'warning', message: '匹配不到相关人员' })
                  return
                }
                console.log(res.resultData.dataList[0].orgId, '结果')
                cb(res.resultData.dataList)
              } else {
                this.$message({
                  type: 'warning',
                  message: res.resultDesc
                })
              }
            })
          }
        }
      }
    },
    // 添加医生
    addallianceDoctor () {
      let data = {
        orgId: this.orgId,
        empList: this.empList
      }
      this.axios.post(this.API_URL.doctor.addallianceDoctor, data).then(res => {
        if (res.resultCode === 20000) {
          console.log(res.resultData.length, 'strs')
          if (res.resultData && res.resultData.length) {
            let repeatUsers = res.resultData
            repeatUsers.join(',')
            this.$message({
              type: 'warning',
              message: `${repeatUsers}已经存在医联体,不能重复添加`
            })
            return
          }
          this.getList()
          this.getTreeNodeData()
        }
      })
    },
    // 点击左侧树形列表
    nodeClick ({ orgId, relId }) {
      this.orgId = orgId
      this.relId = relId
      this.keyword = ''
      this.getList()
    },
    // 表格复选框
    selectionChange (selectedPerson) {
      this.selectedPerson = selectedPerson
    },
    // 调整部门
    reSetPart (targetOrgInfo) {
      this.targetOrgInfo = targetOrgInfo // 被选中的机构信息
    },
    // 保存调整部门
    saveResetPart () {
      // 复选框选中的用户empId
      console.log(this.selectedPerson, this.targetOrgInfo, 'person')
      let empList = this.selectedPerson.map(item => item.empId)
      let data = {
        empList: empList,
        relId: this.targetOrgInfo.relId,
        toOrgId: this.targetOrgInfo.orgId
      }
      // 接口请求
      this.axios.post(this.API_URL.doctor.allianceDoctorMove, data).then(res => {
        if (res.resultCode === 20000) {
          // 被选中的医生全部清空
          this.targetOrgInfo = null
          this.orgDialogVisible = false
          this.getList()
          this.getTreeNodeData()
        } else {
          this.$message({
            type: 'error',
            message: res.resultDesc
          })
        }
      })
    },
    // 显示调整部门弹窗
    resetPartDialog () {
      console.log(this.selectedPerson, 'preson')
      if (this.selectedPerson.length) {
        this.orgDialogVisible = true
      } else {
        this.$message({
          type: 'info',
          message: '请选择人员'
        })
      }
    },
    // 取消调整部门
    cancelResetPart () {
      this.targetOrgInfo = null
      this.orgDialogVisible = false
    },
    // 删除医生
    delDoctor () {
      if (this.selectedPerson.length) {
        this.$confirm(`确定删除?`, `提示`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          this.allianceDoctorDelete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '请选择要删除的医生'
        })
      }
    },
    // 删除医生请求
    allianceDoctorDelete () {
      let empList = this.selectedPerson.map(item => item.empId)
      let data = {
        empList: empList,
        orgId: this.orgId,
        relId: this.relId
      }
      this.axios.post(this.API_URL.doctor.allianceDoctorDelete, data).then(res => {
        if (res.resultCode === 20000) {
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: res.resultDesc
          })
        }
      })
    },
    // 翻页
    changePage (page) {
      this.pageNum = page
      this.getList()
    },
    // 关闭医生信息弹窗
    beforeCloseInfoDialog () {
      this.infoDialogVisible = false
      this.$refs.form.clearValidate()
    },
    // 关闭机构弹窗
    beforeCloseOrgDialog () {
      console.log('close?')
      this.orgDialogVisible = false
    },
    // 保存
    save () {
      this.infoDialogVisible = false
    },
    // 暂时未做
    rowClick (scope) {
      // this.userInfo = scope
      // this.infoDialogVisible = true
      // console.log(scope)
    },
    // 获取列表
    getList () {
      let data = {
        keyword: this.keyword,
        orgId: this.orgId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      return new Promise(resolve => {
        this.xhrList(data).then(res => {
          if (res.resultCode === 20000) {
            this.total = res.resultData.total
            this.tableData = res.resultData.dataList
            console.log(res.resultData, 'daa')
          }
        })
      })
    },
    // 搜索列表
    search () {
      this.pageNum = 1
      let data = {
        keyword: this.keyword,
        relId: this.relId,
        pageNum: 1,
        pageSize: 10
      }
      return this.xhrList(data)
    },
    // 根据部门id获取医生列表公共请求
    xhrList (data) {
      return this.axios.post(this.API_URL.doctor.getListByOrgId, data)
    },
    cancel () {
      console.log('adf')
      this.orgDialogVisible = false
    }
  },
  components: {
    manageDialog,
    setMedicalAllianceDept
  },
  mounted () {

  }
}
</script>
