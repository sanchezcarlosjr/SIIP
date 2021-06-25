import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class LoginPage extends Vue {
    year = new Date().getFullYear();
    passwordStatus = 0;
    password = {
        0: {
            icon: 'eye',
            type: 'password'
        },
        1: {
            icon: 'eye-slash',
            type: 'text'
        }
    };

    changePasswordStatus() {
        this.passwordStatus = this.passwordStatus == 0 ? 1 : 0;
    }
}

