let performance = {
  state: {
    performanceLists: []
  },
  mutations: {
    // 获取绩效明细列表数据
    getPerformanceLists (state, value) {
      state.performanceLists = value
    }
  }
}

export default performance
