import axios from 'axios';
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from 'vue-property-decorator';
import { InfoModal } from './info-modal';

@Component
export default class SiipTableComponent extends Vue {
    @Prop() resource!: string;
    @Prop() fields!: any[];
    @Prop() tableTitle!: string;
    @Prop() spanishResourceName!: string;
    @Prop() schema!: any;
    items: any = [];
    totalRows = 1;
    sortBy = '';
    sortDesc = false;
    sortDirection = 'asc';
    filter: string[] = [];
    infoModal: InfoModal = new InfoModal();
    get sortOptions() {
        return this.fields
            .filter(field => field.sortable)
            .map(field => {
                return { text: field.label, value: field.key }
            })
    }

    mounted() {
        this.infoModal.resource = this.spanishResourceName;
        this.infoModal.loadModel(this.schema);
        axios.get(`/api/${this.resource}`).then(
            (response) => {
                this.items = response.data;
                this.totalRows = this.items.length;
            }
        );
    }

    execute() {
        let strategy: any = null;
        switch (this.infoModal.id) {
            case 'remove': strategy = this['removeElement'](); break;
            case 'add': strategy = this['addElement'](); break;
        }
        if (strategy) {
            strategy.then(() => this.showSuccessToast());
        }
    }

    search(row: any, criteria: string[]) {
        const values: string[] = Object.values(row);
        const valueString = values.toString();
        return criteria.filter(value => valueString.toLowerCase().indexOf(value.toLowerCase()) !== -1).length > 0;
    }


    add(button: any) {
        this.infoModal.id = 'add';
        this.showModal(null, null, button);
    }

    edit(item: any, index: any, button: any) {
        this.infoModal.id = 'edit';
        this.showModal(item, index, button);
    }

    remove(item: any, index: any, button: any) {
        this.infoModal.id = 'remove';
        this.showModal(item, index, button);
    }


    resetModal() {
        this.infoModal.reset();
    }


    private showModal(item: any, index: any, button: any) {
        this.infoModal.setModal(item, index);
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    }


    private removeElement() {
        this.items.splice(this.infoModal.rowId, 1);
        return axios.delete(`api/${this.resource}/${this.infoModal.itemId}`);
    }

    private addElement() {
        console.log(this.infoModal.model);
    }

    private showSuccessToast() {
        this.$bvToast.toast(`Su operación fue '${this.infoModal.title}'`, {
            title: 'Operación exitosa',
            variant: 'success',
            solid: true
        })
    }

}

