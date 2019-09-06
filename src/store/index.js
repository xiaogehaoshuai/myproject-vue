import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store=new Vuex.Store({
  state:{
    count:1
  },
  mutations:{
    add:function (state,n) {
      state.count=state.count+n
    },
    reduction:function (state) {
      state.count=state.count-1
    }
  },
  getters:{
    set:function (state) {
      return state.count+1
    }
  },
  actions:{
    addFun:function (context,n) {
      context.commit("add",n)
    },
    reductionFun:function (context) {
      context.commit("reduction")
    }
  }
})
export default store
