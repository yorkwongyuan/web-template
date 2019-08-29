<template>
  <div>
    <el-table v-bind="$attrs"
              @selection-change="$emit('selection-change',$event)"
              @row-click="$emit('row-click',$event)">
      <el-table-column type="selection"
                       width="70">
      </el-table-column>
      <el-table-column :prop="item.prop"
                       :label="item.label"
                       v-for="(item,index) in tableHeaders"
                       :key="index">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    tableHeaders: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
