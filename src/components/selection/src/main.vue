<style lang="scss">
$--color-primary: #597ef7;
.tree {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  font-size: 12px;
  .tree-dialog {
    width: 700px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border: 1px solid;
    .tree-header {
      height: 40px;
      line-height: 40px;
      color: #ffffff;
      padding-left: 15px;
      .close-icon {
        top: 0;
        right: 15px;
      }
      .close-icon:hover {
        color: #ffffff;
      }
    }
    .tree-body {
      background-color: #ffffff;
      height: 396px;
      .tree-body-left {
        position: relative;
        height: 100%;
        width: 50%;
        padding: 16px 24px;
        overflow-y: auto;
        border-right: 1px solid #e5e5e5;
        .tree-search {
          .el-input__inner {
            background-color: #f7f8fa !important;
            border: none;
            border-radius: 100px;
          }
        }
        .tree-wrap {
          .el-tree-node__content {
            height: auto;
            padding: 8px 0;
          }
        }
        .back {
          position: absolute;
          bottom: 20px;
          left: 20px;
        }
      }
      .tree-body-right {
        width: 50%;
        height: 100%;
        padding: 20px 24px 14px;
        overflow-y: auto;
        position: relative;
        .selection-list {
          padding-top: 6px;
          top: 50px;
          left: 26px;
          right: 10px;
          bottom: 50px;
          overflow-y: auto;
          .selection-item {
            text-align: center;
            display: inline-block;
            width: 44px;
            .delete-icon {
              position: absolute;
              top: -2px;
              right: -2px;
              width: 12px;
              height: 12px;
            }
          }
        }
        .bottom-btn {
          right: 14px;
          position: absolute;
          bottom: 14px;
          .el-button {
            width: 96px;
          }
        }
      }
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .depAvatar {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      text-align: center;
      background-color: $--color-primary;
      color: #ffffff;
      line-height: 40px;
    }
    .mr-0 {
      margin-right: 0;
    }
    .dialog-footer {
      clear: both;
      background: white;
      border-top: rgba(238, 238, 238, 1);
      height: 60px;
      padding: 8px;
    }
    .botbtns-wrap {
      width: 300px;
      display: inline-block;
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
    }
  }
}
</style>
<template>
  <div class="tree"
       @click="stop"
       v-if="showTreeDialog">
    <div class="tree-dialog"
         :style="{borderColor: theme}">
      <header class="tree-header por"
              :style="{backgroundColor: theme}">
        <span class="tree-text fs-14"
              v-text="text">
        </span>
        <i class="iconfont fc-fff icon-close poa close-icon fs-12"
           @click="handleCloseTree"></i>
      </header>
      <article class="tree-body">
        <div class="tree-body-left fl">
          <div class="tree-search mb-14">
            <el-input placeholder="请输入搜索关键字"
                      size="mini"
                      prefix-icon="el-icon-search"
                      v-model="filterText">
            </el-input>
          </div>
          <div class="tree-wrap">
            <el-tree :data="tree"
                     :props="defaultProps"
                     node-key="id"
                     :show-checkbox="multiselect"
                     :filter-node-method="filterNode"
                     :render-content="renderContent"
                     @check-change="handleCheck"
                     @node-click="handleNodeClick"
                     ref="tree">
            </el-tree>
          </div>
        </div>
        <div class="tree-body-right fr">
          <p class="fc-657379 mb-20">已选中（{{resultList.length}}）</p>
          <ul class="selection-list poa">
            <li class="selection-item por mr-18 mb-20"
                v-for="(item, index) in resultList"
                :key="index"
                :class="{'mr-0': (index+1)%5 == 0}">
              <img class="avatar mb-10"
                   :src="changeUrl(item.avatarUrl)"
                   v-if="empMode && item.avatarUrl">
              <div class="depAvatar mb-10 fs-18"
                   :style="{backgroundColor: theme}"
                   v-if="!empMode || !item.avatarUrl"
                   v-text="item.label.substring(0,1)">

              </div>
              <img class="delete-icon"
                   src="../../../assets/icon/delete.png"
                   @click="handleDelSelection(item, index)">
              <p class="ellipsis tc"
                 v-text="item.label"></p>
            </li>
          </ul>
          <!-- 非底部按钮 -->
          <div class="bottom-btn tr"
               v-if="!isBotBtns">
            <el-button class="mr-10"
                       round
                       size="mini"
                       @click="handleCancel">取消</el-button>
            <el-button type="primary"
                       size="mini"
                       round
                       @click="handleConfirm"
                       :style="{backgroundColor: theme,borderColor: theme}">确定</el-button>
          </div>
        </div>
        <!-- 底部按钮 -->
        <footer v-if="isBotBtns"
                class="dialog-footer">
          <el-button class="back"
                     icon="el-icon-arrow-left"
                     type="text"
                     v-if="isBack"
                     @click="back">
            返回上一步
          </el-button>
          <div class="botbtns-wrap">
            <el-button class="mr-10"
                       size="medium"
                       @click="handleCancel">取消</el-button>
            <el-button type="primary"
                       size="medium"
                       @click="handleConfirm"
                       :style="{backgroundColor: theme,borderColor: theme}"
                       v-if="resultList.length!==0">确定</el-button>
            <el-button type="info"
                       size="medium"
                       disabled
                       v-if="resultList.length===0">确定</el-button>
          </div>
        </footer>
      </article>
    </div>
  </div>
</template>

<script type="text/jsx">
export default {
  name: 'tree',
  data () {
    return {
      showTreeDialog: true,
      onConfirm: null,
      onBack: null,
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label',
        id: 'id'
      },
      resultList: [],
      isBotBtns: false,
      isBack: false,
      // 是否有做选择
      isSelected: false
    }
  },
  methods: {
    back () {
      this.onBack()
      this.handleCancel()
    },
    changeUrl (url) {
      // console.log(this.util)
      return this.util.changeUrl(url)
    },
    stop (e) {
      e.stopPropagation()
    },
    // 输入框输入时筛选
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    renderContent (h, { node, data }) {
      return (
        <span
          style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;" on-click={e => this.selectEmp(e, node, data)}>
          <span>
            {node.isLeaf && data.openId ? (data.avatarUrl ? <img class="avatar mr-10" src={this.changeUrl(data.avatarUrl)} alt="" />
              : <span class="depAvatar mr-10">{data.label.substring(0, 1)}</span>) : ''}
            <span>{node.label}</span>
          </span>
        </span>)
    },
    /* 多选选人，可以不仅仅点checkbox选人，支持选整行来选人 */
    selectEmp (e, node, data) {
      if (this.multiselect && this.empMode && node.isLeaf && data.openId) {
        e.stopPropagation()
        this.$refs.tree.setChecked(data, !node.checked)
        this.resultList = this.$refs.tree.getCheckedNodes(this.empMode)
        for (var i = 0; i < this.resultList.length; i++) {
          if (!this.resultList[i].empId) {
            this.resultList.splice(i, 1)
            i--
          }
        }
      }
    },
    handleCloseTree () {
      this.showTreeDialog = false
    },
    handleCheck () {
      this.resultList = this.$refs.tree.getCheckedNodes(this.empMode)
      if (this.empMode) {
        for (var i = 0; i < this.resultList.length; i++) {
          if (!this.resultList[i].empId) {
            this.resultList.splice(i, 1)
            i--
          }
        }
      }
      /* 通过path字段筛选子部门 */
      var depResultList = []
      var flag = true
      // var currentIndex = ''
      if (!this.empMode) {
        this.resultList.forEach((item) => {
          for (var i = 0; i < this.resultList.length; i++) {
            if (item.path.indexOf(this.resultList[i].path) !== -1 && this.resultList[i].path !== item.path) {
              flag = false
              break
            }
          }
          if (flag) {
            depResultList.push(item)
          }
          flag = true
        })
        this.resultList = depResultList
      }
    },
    handleDelSelection (item, index) {
      this.resultList.splice(index, 1)
      this.$refs.tree.setChecked(item.id, false, true)
    },
    handleCancel () {
      this.showTreeDialog = false
    },
    handleConfirm () {
      this.resultList.forEach(item => {
        delete item['children']
      })
      this.onConfirm(this.resultList)
      this.showTreeDialog = false
    },
    handleNodeClick (data) {
      if (this.multiselect) {
        // return
      } else {
        if (this.empMode) {
          /* 说明是选人模式，并且是单选 */
          if (!data.empId) {
            // return
          } else {
            this.resultList = []
            this.resultList[0] = data
          }
        } else {
          /* 说明是选部门模式，并且是单选，直接选中 */
          this.resultList = []
          this.resultList[0] = data
        }
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  computed: {
    tree () {
      return this.treeData
    }
  },
  mounted () {
    this.resultList = this.model
    var keys = []
    this.model.forEach(item => {
      keys.push(item.id)
    })
    this.$refs.tree.setCheckedKeys(keys)
  }
}
</script>
