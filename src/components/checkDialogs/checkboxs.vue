<template>
  <div class="user-manage-form-wrap">
    <div v-if="dialogType === 'edit'">
      <el-form-item label="姓名"
                    size="small"
                    prop="name">
        <el-input v-model="localUserInfo.empName"
                  :disabled="true" />
      </el-form-item>
      <el-form-item label="性别"
                    size="small"
                    :rules="[{required:true}]">
        <el-radio-group :disabled="true"
                        v-model="userInfo.gender">
          <el-radio label="M">男</el-radio>
          <el-radio label="F">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机"
                    prop="phone"
                    size="small">
        <el-input v-model="localUserInfo.phone"
                  :disabled="true"
                  type="number" />
      </el-form-item>
    </div>
    <div v-if="dialogType === 'add'">
      <div class="users"
           @click="$emit('dialogAddUserName')">
        <div class="user"
             v-show="users.length>0"
             @click.stop=""
             v-for="(user,index) in users"
             :key="index">{{user.empName}}
          <svg-icon icon-class="miniclose"
                    @click.native.stop="$emit('dialogDelUserName',user.empId)"></svg-icon>
        </div>
        <span v-show="users.length=== 0"
              class="add-user-tips">{{addPlacerholder}}</span>
      </div>
    </div>

    <div class="assign-auth__title">
      <i class="assign-auth__left-icon"></i>
      <span class="assign-auth__right-text">
        分配权限
      </span>
      <div class="assign-auth__content">
        <el-checkbox class="checkAll"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全部权限</el-checkbox>
        <el-checkbox-group v-model="localCheckLists"
                           @change="handleCheckedAuthChange">
          <el-form-item label-width="100px"
                        label="系统设置:"
                        size="small">
            <div>
              <el-checkbox label="USER_MANAGER">用户管理</el-checkbox>
            </div>
            <div>
              <el-checkbox label="DOCTOR_MANAGER">医生管理</el-checkbox>
            </div>
            <div>
              <el-checkbox label="BIZ_PARAM_SETTING">业务参数设置</el-checkbox>
            </div>
          </el-form-item>
          <el-form-item label-width="100px"
                        label="接诊管理:"
                        size="small">
            <div>
              <el-checkbox label="APPOINTMENT_HANDLER">预约安排</el-checkbox>
            </div>
            <div>
              <el-checkbox label="CONSULTATION_HANDLER">会诊安排</el-checkbox>
            </div>
            <div>
              <el-checkbox label="REFERRAL_HANDLER">转诊安排</el-checkbox>
            </div>
            <div>
              <el-checkbox label="PATIENT_REGISTER_HANDLER">患者报到</el-checkbox>
            </div>

          </el-form-item>
          <el-form-item label-width="100px"
                        label="统计分析:"
                        size="small">
            <div>
              <el-checkbox label="BIZ_APPLYER_STATISTICS">业务申请统计</el-checkbox>
            </div>
            <div>
              <el-checkbox label="BIZ_RECEIVE_STATISTICS">业务接收统计</el-checkbox>
            </div>
            <!-- <div>
              <el-checkbox label="EXTEND_STATISTICS">推广统计</el-checkbox>
            </div>
            <div>
              <el-checkbox label="PERFORMANCE_STATISTICS">绩效考核统计</el-checkbox>
            </div> -->
            <div>
              <el-checkbox label="DOCTOR_BIZ_STATISTICS">医务统计</el-checkbox>
            </div>
          </el-form-item>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      allPowers: ['USER_MANAGER', 'DOCTOR_MANAGER', 'BIZ_PARAM_SETTING', 'APPOINTMENT_HANDLER', 'CONSULTATION_HANDLER', 'REFERRAL_HANDLER', 'PATIENT_REGISTER_HANDLER', 'BIZ_APPLYER_STATISTICS', 'BIZ_RECEIVE_STATISTICS', 'DOCTOR_BIZ_STATISTICS'],
      checkAll: false
    }
  },
  methods: {
    // 全选
    handleCheckAllChange (val) {
      let checkList = val ? this.allPowers : []
      this.updateCheckList(checkList)
    },
    // 单独点击
    handleCheckedAuthChange (value) {
      this.checkAll = this.isAllSelected()
    },
    // 更新权限列表
    updateCheckList (checkList) {
      this.$emit('update:checkList', checkList)
    },
    // 更新权限列表
    updateUserInfo (userInfo) {
      this.$emit('update:userInfo', userInfo)
    },
    // 判断初始化时是否全部选中
    isAllSelected () {
      let isAllSelected = this.allPowers.map(item => this.localCheckLists.includes(item))
      return isAllSelected.every(item => item === true)
    }
  },
  computed: {
    localCheckLists: {
      get () {
        return this.checkList
      },
      set (value) {
        this.updateCheckList(value)
      }
    },
    localUserInfo: {
      get () {
        return this.userInfo
      },
      set (value) {
        this.updateUserInfo(value)
      }
    }
  },
  mounted () {
    this.checkAll = this.isAllSelected()
  },
  props: ['dialogType', 'users', 'form', 'checkList', 'userInfo', 'addPlacerholder']
}
</script>
<style lang="scss" scoped>
.user-manage-form-wrap {
  height: 100%;
  padding-top: 16px;
  overflow-y: auto;
  .assign-auth__title {
    margin-bottom: 15px;
    .assign-auth__left-icon {
      display: inline-block;
      vertical-align: text-bottom;
      width: 2px;
      height: 16px;
      background: rgba(89, 126, 247, 1);
    }
    .assign-auth__right-text {
      width: 56px;
      height: 22px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 22px;
    }
  }
  .assign-auth__content {
    .checkAll {
      line-height: 50px;
    }
  }
}
.users {
  position: relative;
  width: 448px;
  min-height: 40px;
  padding: 3px 24px 0 3px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(221, 221, 221, 1);
  margin-bottom: 24px;
  max-height: 113px;
  overflow-y: scroll;
  cursor: pointer;
  .add-user-tips {
    height: 35px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(187, 187, 187, 1);
    line-height: 35px;
    margin-left: 12px;
  }
  .user {
    position: relative;
    display: inline-block;
    min-width: 78px;
    height: 32px;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: 1px solid rgba(221, 221, 221, 1);
    margin-right: 4px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(85, 85, 85, 1);
    text-align: center;
    line-height: 32px;
    padding-right: 22px;
    padding-left: 12px;
    margin-bottom: 4px;
    .svg-icon {
      position: absolute;
      top: 52%;
      transform: translateY(-50%);
      right: 8px;
      vertical-align: middle;
      width: 8px;
      height: 8px;
      cursor: pointer;
    }
  }
}
</style>
