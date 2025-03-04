import { createStore } from 'vuex';

export default createStore({
    state: {
        authenticated: false
    },
    mutations: {
        setAuthenticated(state, value) {
            state.authenticated = value;
        }
    },
    actions: {
        login({ commit }) {
            commit('setAuthenticated', true);
        },
        logout({ commit }) {
            commit('setAuthenticated', false);
            localStorage.removeItem('jwt');
        }
    }
});
