import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class LoginPage extends Vue {
    year = new Date().getFullYear();
}

