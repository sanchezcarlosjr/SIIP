import Vue from "vue";

const state = Vue.observable({
    user: {
        name: '',
        token: '',
        routes: []
    }
});

export const mutations = {
    updateUser: (user: any) => {
        state.user = {
            ...user
        };
        sessionStorage.setItem('token', `Bearer ${state.user.token}`);
    },
    loadTokenFromStorage: () => {
        const token = sessionStorage.getItem('token');
        state.user = {
            ...state.user,
            token: token === null ? "" : token
        }
    }
}

mutations.loadTokenFromStorage();

export default state;
