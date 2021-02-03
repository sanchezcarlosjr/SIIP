import Vue from "vue";

const state = Vue.observable({
    user: {
        name: '',
        token: '',
        role: 'admin'
    }
});

export const updateUser = (user: any) => state.user = {
    ...user
};

export default state;
