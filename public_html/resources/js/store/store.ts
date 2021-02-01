import Vue from "vue";

const state = Vue.observable({
    user: {
        name: '',
        token: '',
        role: 'admin',
        canSee: false,
        canEdit: false
    }
});

export const updateUser = (user: any) => state.user = {
    ...user
};

export default state;
