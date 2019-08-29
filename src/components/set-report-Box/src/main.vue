<style lang="scss">
.popup-box {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top:0;
  z-index: 3;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  .popup-box-in {
    border-radius: 4px;
    position: relative;
    background-color: #FFFFFF;
    overflow: hidden;
    margin-left: 50%;
    transform: translateX(-50%) translateY(-50%);
    top: 50%;
    width: 500px;
    .popup-box-head {
      height: 50px;
      width: 100%;
      box-shadow:0 1px 0 0 rgba(242,242,246,1);
      .popup-box-head-span {
        display: inline-block;
        text-align: center;
        line-height: 50px;
        width: 100%;
        color: #2D2F33;
        font-size: 16px;
      }
    }
    .popup-box-body {
      padding: 20px 20px 20px 20px;
      text-align: center;
      .pop-box-main {
        display: inline-block;
        text-align: left;
        .el-switch__core {
          line-height: 19px;
          color: white;
          padding: 0 4px;
        }
        .text-right {
          text-align: right;
        }
      }
    }
    .popup-box-footer {
      position: absolute;
      background-color: #FFFFFF;
      bottom: 0;
      height: 50px;
      width: 100%;
      box-shadow:0 1px 0 0 rgba(242,242,246,1);
      .popup-box-footer-span {
        display: inline-block;
        text-align: center;
        line-height: 50px;
        width: 100%;
        .popup-box-footer-cancel {
          font-size: 14px;
          cursor: pointer;
          background-color: #FFFFFF;
          color: #5A5E66;
          padding: 5px 25px 5px 25px;
          border-radius:15px;
          margin-right: 10px;
          border: 1px solid #D8DCE5;
          &:hover{
            opacity: 0.8;
          }
        }
        .popup-box-footer-sure {
          font-size: 14px;
          cursor: pointer;
          background-color: #4990E2;
          color: #FFFFFF;
          padding: 5px 25px 5px 25px;
          border-radius:15px;
          margin-left: 10px;
          &:hover{
            opacity: 0.8;
          }
        }
      }
    }
  }
}

</style>
<template>
    <div class="popup-box" v-if="showBox">
      <div class="popup-box-in">
        <div class="popup-box-head">
          <span class="popup-box-head-span">{{title}}</span>
        </div>
        <div class="popup-box-body">
          <div class="pop-box-main">
            <el-form label-width="150px"
                     label-position="left">
              <el-form-item label="定时推送:">
                <el-switch v-model="openReport"
                           @change="_change(300)"
                           active-color="#4990E2"
                           inactive-color="#B4BCCC">
                </el-switch>
              </el-form-item>
              <el-form-item label="设置重复周期:">
<!--                <el-select v-model="reportDataType">-->
<!--                  <el-option label="每周" value="week"></el-option>-->
<!--                  <el-option label="每月" value="month"></el-option>-->
<!--                </el-select>-->
                <el-select v-model="reportDataWeek" style="width: 90px">
                  <el-option v-for="(week, index) in weekList" :key="index" :label="week.label" :value="week.value"></el-option>
                </el-select>
<!--                <el-select v-model="reportDataMonth">-->
<!--                  <el-option v-for="(month, index) in monthList" :key="index" :label="month.label" :value="month.value"></el-option>-->
<!--                </el-select>-->
              </el-form-item>
              <el-form-item label="选择定时发送的时间:">
                <el-select v-model="reportTimeHour" style="width: 70px">
                  <el-option v-for="(hour, index) in hourList" :key="index" :label="hour.label" :value="hour.value"></el-option>
                </el-select>&ensp;时&ensp;
                <el-select v-model="reportTimeMinute" style="width: 70px">
                  <el-option v-for="(minute, index) in minuteList" :key="index" :label="minute.label" :value="minute.value"></el-option>
                </el-select>&ensp;分
              </el-form-item>
            </el-form>
          </div>
          <div style="height: 50px"></div>
        </div>
        <div class="popup-box-footer">
          <span class="popup-box-footer-span">
              <span class="popup-box-footer-cancel" @click="clickCancel">取消</span>
              <span class="popup-box-footer-sure" @click="clickConfirm">{{confirmText}}</span>
          </span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'popupBox',
  data () {
    return {
      showBox: false,
      title: '设置报表',
      confirmText: '确定',
      openReport: false, // 是否定时推送
      reportDataType: 'week', // 推送周期
      reportDataWeek: '2', // 推送周期周一-周日
      reportDataMonth: '3', // 推送周期1号-31号
      reportTimeHour: '4', // 推送时间
      reportTimeMinute: '5', // 推送时间
      cancel: null,
      confirm: null
    }
  },
  computed: {
    weekList () {
      return [
        {label: '周一', value: '周一'},
        {label: '周二', value: '周二'},
        {label: '周三', value: '周三'},
        {label: '周四', value: '周四'},
        {label: '周五', value: '周五'},
        {label: '周六', value: '周六'},
        {label: '周日', value: '周日'}
      ]
    },
    monthList () {
      let list = []
      let i = 0
      while (i < 30) {
        list.push({
          label: `${++i}号`,
          value: `${++i}号`
        })
      }
      return list
    },
    hourList () {
      let list = []
      let i = 0
      while (i < 24) {
        list.push({
          label: i < 10 ? '0' + i : i,
          value: i < 10 ? '0' + i : i
        })
        i++
      }
      return list
    },
    minuteList () {
      let list = []
      let i = 0
      while (i < 60) {
        list.push({
          label: i < 10 ? '0' + i : i,
          value: i < 10 ? '0' + i : i
        })
        i++
      }
      return list
    }
  },
  methods: {
    clickCancel () {
      this.cancel()
    },
    clickConfirm () {
      this.confirm()
    },
    _change (seconds) {
      let objList = document.getElementsByClassName('el-switch__core')
      let obj = objList[2]
      if (this.openReport) {
        obj.classList.remove('text-right')
      } else {
        obj.classList.add('text-right')
      }
      obj.innerHTML = ''
      setTimeout(() => {
        obj.innerHTML = this.openReport ? '开' : '关'
      }, seconds)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._change(0)
    })
  }
}
</script>
