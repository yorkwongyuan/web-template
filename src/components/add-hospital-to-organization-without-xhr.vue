<style scoped lang="scss">
.add-hospital-to-organization {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(45, 47, 51, 0.5);
  width: 100%;
  height: 100%;
  z-index: 99999;
  .box {
    position: fixed;
    z-index: 90;
    background-color: #ffffff;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-44%);
    border-radius: 4px;
    width: 930px;
    height: 530px;
    padding-bottom: 90px;
    .title {
      position: absolute;
      top: 0;
      background-color: #ffffff;
      width: 100%;
      height: 50px;
      font-size: 16px;
      color: #2d2f33;
      line-height: 50px;
      text-align: center;
      box-shadow: 0px 1px 0px 0px #f2f2f6;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    .handle-btn {
      position: absolute;
      left: 20px;
      top: 60px;
      .toSearch {
        width: 240px;
      }
    }
    .box-content {
      margin-top: 100px;
      height: 370px;
      width: 100%;
      overflow-y: auto;
    }
    .pagination {
      position: absolute;
      bottom: 15px;
      right: 40px;
    }
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      padding-top: 10px;
      padding-bottom: 10px;
      text-align: center;
      background-color: #ffffff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-top: 1px solid #f2f2f6;
    }
    .submit.el-button {
      width: 135px;
      color: #ffffff;
      border-radius: 100px;
      padding: 4px 10px;
      font-size: 14px;
      line-height: 20px;
      background-color: #4990e2;
      border: 1px solid #4990e2;
    }
    .submit.el-button:focus,
    .submit.el-button:hover {
      color: #ffffff;
      border-color: #64a6f0;
      background-color: #64a6f0;
    }
    .cancel.el-button {
      width: 135px;
      border-radius: 100px;
      padding: 4px 24px;
      color: #5a5e66;
      font-size: 14px;
      line-height: 20px;
      border: 1px solid #d8dce5;
    }
    .cancel.el-button:focus,
    .cancel.el-button:hover,
    .cancel.el-button:active {
      color: #4990e2;
      border-color: #4990e2;
      background-color: #ffffff;
    }
  }
}
</style>
<style lang="scss">
.add-hospital-to-organization {
  .el-table th {
    border-top: 1px solid #f2f2f6;
    padding: 10px 0;
    box-shadow: 0px 1px 0px 0px #d8dce5;
    background-color: #ffffff;
  }
  .el-table th > .cell {
    color: #2d2f33;
    font-size: 14px;
    line-height: 20px;
    padding-left: 20px;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgb(219, 233, 249);
  }
  .el-table .cell {
    font-size: 14px;
    color: #5a5e66;
    line-height: 20px;
    padding-left: 20px;
  }
  .el-table td {
    padding: 10px 0;
    border-bottom: 1px solid #f2f2f6;
  }
  .row-class-name {
    cursor: pointer;
  }
}
</style>
<template>
  <div class="add-hospital-to-organization"
       @click.self="close()">
    <div class="box">
      <header class="title">添加医联体医疗机构</header>
      <div class="handle-btn">
        <el-input placeholder="输入医院名称或医院ID搜索"
                  prefix-icon="el-icon-search"
                  v-model="keyword"
                  class="toSearch fl"
                  size="mini"
                  @change="toSearch"></el-input>
      </div>
      <div class="box-content">
        <el-table ref="multiple"
                  :data="list"
                  tooltip-effect="light"
                  height="100%"
                  :row-class-name="rowClassName"
                  @row-click="$emit('select',$event)"
                  @selection-change="handleSelectionChange">
          <el-table-column prop="tenantId"
                           :label="labelName"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="hospitalName"
                           label="医院名称"
                           width="241">
          </el-table-column>
          <el-table-column prop="contact"
                           label="联系人"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="contactPhone"
                           label="联系电话">
          </el-table-column>
          <el-table-column prop="hospitalLevel"
                           label="医院等级"
                           show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <footer class="pagination">
        <el-pagination @current-change="currentPageChange"
                       :current-page.sync="pageNum"
                       :page-size="pageSize"
                       layout="total, prev, pager, next"
                       :total="total">
        </el-pagination>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageNum: 1,
      pageSize: 20,
      keyword: '',
      list: [],
      total: 0,
      selectList: [],
      num: 0,
      labelName: '医院ID（0/300）'
    }
  },
  props: {
    allianceId: {
      required: true,
      default: ''
    }
  },
  watch: {
    selectList (newList) {
      this.labelName = '医院ID（' + newList.length + '/' + this.total + '）'
    }
  },
  methods: {
    toSearch () {
      this.getList()
    },
    close () {
      this.$emit('close')
    },
    add () {
      if (this.selectList.length <= 0) {
        this.$message({
          message: '您还未选择医联体医疗机构，无法添加',
          type: 'error'
        })
        return
      }
      this.$emit('add', this.selectList)
    },
    handleSelectionChange (val) {
      this.selectList = val
    },
    currentPageChange (val) {
      this.pageNum = val
      this.getList()
    },
    /* 设置默认选中的不能修改 */
    checkboxInit (row) {
      if (row.existed) {
        return 0 // 有些已经添加过不可再添加
      } else {
        return 1
      }
    },
    getList () {
      this.axios.post(this.API_URL.public.getHospitalList, {
        allianceId: this.allianceId,
        keyword: this.keyword,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        hasRelTenant: true
      }).then(res => {
        if (res.resultCode === 20000) {
          this.list = res.resultData.dataList
          this.total = res.resultData.total
          this.labelName = '医院ID（0/' + this.total + '）'
          /* 不加nextTick不生效，将默认选中的初始化 */
          this.$nextTick(() => {
            this.list.forEach(item => {
              if (item.existed === true) {
                this.$refs.multiple.toggleRowSelection(item, true)
              }
            })
          })
        }
      })
    },
    rowClassName () {
      return 'row-class-name'
    }
  },
  mounted () {
    this.keyword = ''
    this.pageNum = 1
    this.pageSize = 20
    this.getList()
  }
}
</script>
