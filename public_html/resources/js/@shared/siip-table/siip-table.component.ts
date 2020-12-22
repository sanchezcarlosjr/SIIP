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
    items: any = [];
    totalRows = 1;
    sortBy = '';
    sortDesc = false;
    sortDirection = 'asc';
    filter: string[] = [];
    infoModal = new InfoModal();
    get sortOptions() {
        return this.fields
            .filter(field => field.sortable)
            .map(field => {
                return { text: field.label, value: field.key }
            })
    }

    mounted() {
        axios.get(`/api/${this.resource}`).then(
            (response) => {
                this.items = response.data;
                this.totalRows = this.items.length;
            }
        );
    }

    execute() {
        let strategy: any = null;
        if (this.infoModal.id === 'remove') {
            strategy = this['removeElement']();
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

    private showSuccessToast() {
        this.$bvToast.toast(`Su operación fue '${this.infoModal.title}'`, {
            title: 'Operación exitosa',
            variant: 'success',
            solid: true
        })
    }

}

