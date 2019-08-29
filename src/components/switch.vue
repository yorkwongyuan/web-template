<template>
  <div class="kd-switch"
       ref="kdSwitch">
    <el-switch v-model="localChecked"
               :class="{checkedClass:!localChecked}"
               @change="$emit('change',$event)"
               v-bind="$attrs">
    </el-switch>
  </div>
</template>
<script>
export default {
  name: 'kd-switch',
  data () {
    return {

    }
  },
  computed: {
    localChecked: {
      get () {
        return this.checked
      },
      set (value) {
        this.$emit('update:checked', value)
      }
    }
  },
  props: {
    checked: Boolean
  },
  methods: {
    _switch () {

    }
  },
  mounted () {

  }
}
</script>
<style lang="scss">
.kd-switch {
  display: inline-block;
  text-align: left;
  .el-switch__core {
    padding-left: 4px;
    color: white;
    line-height: 1.4em;
    &:before {
      content: '开';
      display: block;
    }
  }
  .checkedClass {
    .el-switch__core {
      padding-right: 4px;
      text-align: right;
      &:before {
        content: '关';
        display: block;
      }
    }
  }
}
</style>
