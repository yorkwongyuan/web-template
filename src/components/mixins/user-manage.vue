<script>
// 用户管理和管理人员设置
export default {
  data () {
    return {
      checkList: [], // 被选中的权限
      userInfo: [], // 点击一行的信息
      pageNum: 1,
      pageSize: 10,
      personInfo: null, // 被选中的用户完整信息
      tenantId: ''
    }
  },
  methods: {
    // 弹窗删除用户
    dialogDelUserName (empId) {
      let index = this.userInfo.findIndex(item => item.empId === empId)
      console.log(empId, 'empId')
      this.userInfo.splice(index, 1)
    },
    scrollFunc () {
      this.pageNum++
      return this.getList()
    },
    search (keyword) {
      this.pageNum = 1
      this.getList(keyword)
    },
    getRoles (roles) {
      if (this.isAllSelected(roles)) {
        return '全部'
      }
      let arr = []
      roles.forEach(role => {
        if (role.status) {
          // 转为中文名
          let name = this.transformRoles(role.handleRoleType)
          arr.push(name)
        }
      })
      return arr.join(',')
    },
    transformRoles (handleRoleType) {
      let obj =
        {
          USER_MANAGER: '用户管理',
          DOCTOR_MANAGER: '医生管理',
          ORG_MANAGER: '科室管理',
          BIZ_PARAM_SETTING: '业务参数设置',
          BIZ_APPLYER_STATISTICS: '业务申请统计',
          BIZ_RECEIVE_STATISTICS: '业务接收统计',
          EXTEND_STATISTICS: '推广统计',
          PERFORMANCE_STATISTICS: '绩效考核统计',
          APPOINTMENT_HANDLER: '预约安排',
          REFERRAL_HANDLER: '转诊安排',
          CONSULTATION_HANDLER: '会诊安排',
          PATIENT_REGISTER_HANDLER: '患者报到',
          APPLICATION_AUDIT: '人员申请审核',
          VERIFICATION_AUDIT: '资质认证审核',
          NOTICE_ISSUER: '发布通知者',
          COURSE_MANAGER: '课程管理',
          LEARNING_MATERIALS_MANAGER: '学习资料管理',
          PAT_ARCHIVE_MANAGER: '患者档案管理',
          UNIT_MANAGER: '组织管理',
          ADMIN_SETTING: '管理员设置',
          PLATFORM_PARAM_SETTING: '平台参数设置',
          DOCTOR_BIZ_STATISTICS: '医务统计',
          EXTEND_EMP_SETTING: '推广人员设置'
        }
      return obj[handleRoleType]
    },
    // 复选表格中的数据
    selectionChange (selectedData) {
      this.personInfo = selectedData
      this.selectedTableRow = selectedData.map(item => item.userId)
    },
    // 删除
    delXhr () {
      let data = { roleType: this.roleType, userIds: this.selectedTableRow }
      this.axios.post(this.API_URL.platform.deletePlatformUser, data)
        .then(res => {
          if (res.resultCode === 20000) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.pageNum = 1
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.resultDesc
            })
          }
        })
    }
  }
}
</script>
