import { createStore } from 'vuex';

export default createStore({
  state: {
    authenticated: !!localStorage.getItem('jwt'), 
    token: localStorage.getItem('jwt') || null,  
  },
  mutations: {
    setAuthenticated(state, value) {
      state.authenticated = value;
    },
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('jwt', token);
      } else {
        localStorage.removeItem('jwt');
      }
    }
  },
  actions: {
    login({ commit }, token) {
      commit('setAuthenticated', true);
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('setAuthenticated', false);
      commit('setToken', null);
      localStorage.removeItem('jwt');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
    }
  },
  getters: {
    isAuthenticated: state => state.authenticated,
    getToken: state => state.token,
  }
});
