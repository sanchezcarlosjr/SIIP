import Vue from "vue";

const state = Vue.observable({
    user: {
        name: '',
        token: '',
        permissions: {} as any
    }
});

export const mutations = {
    logout: () => {
        state.user = {
            name: '',
            token: '',
            permissions: {} as any
        }
        sessionStorage.clear();
    },
    updateUser: (user: { name: string, token: string, permissions: [{ module: string }] }) => {
        state.user = {
            ...user,
            permissions: user.permissions.reduce((previousValue, actual) => {
                return {
                    ...previousValue,
                    [`${actual.module}`]: {
                        ...actual
                    }
                };
            }, {})
        };
        sessionStorage.setItem('token', `Bearer ${state.user.token}`);
        sessionStorage.setItem('permissions', JSON.stringify(state.user.permissions));
    },
    loadTokenFromStorage: () => {
        const token = sessionStorage.getItem('token');
        const permissions = sessionStorage.getItem('permissions');
        state.user = {
            ...state.user,
            permissions: permissions === null ? {} : JSON.parse(permissions),
            token: token === null ? "" : token
        }
    }
}

mutations.loadTokenFromStorage();

export default state;
