import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class AcademicBodyPage extends Vue {
    title = 'A';

    mounted() {
        this.title = this.$route.params.id;
    }
}
