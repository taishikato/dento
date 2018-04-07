import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = () => new Vuex.Store({

  state: {
    loginStatus: false
  },
  mutations: {
    changeLoginStatus (state, isLogin) {
      state.loginStatus = isLogin.status;
    }
  },
  getters: {
    getLoginStatus(state) {
      return state.loginStatus;
    }
  }
});

export default store