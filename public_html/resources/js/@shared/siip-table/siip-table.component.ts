import Vue from "vue"
import Component from "vue-class-component"
import axios from 'axios';

@Component
export default class SiipTableComponent extends Vue {
    items = [
        {isActive: true, age: 40, name: {first: 'Dickerson', last: 'Macdonald'}, city: 'Ensenada'},
        {isActive: false, age: 21, name: {first: 'Larsen', last: 'Shaw'}, city: 'Mexicali'}
    ];
    fields = [
        {key: 'name', label: 'Person full name', sortable: true, sortDirection: 'desc'},
        {key: 'age', label: 'Person age', sortable: true, class: 'text-center'},
        {
            key: 'isActive',
            label: 'Is Active',
            formatter: (value: string, key: string, item: string) => {
                return value ? 'Yes' : 'No'
            },
            sortable: true,
            sortByFormatted: true,
            filterByFormatted: true
        },
        {key: 'actions', label: 'Actions'}
    ];
    totalRows = 1;
    currentPage = 1;
    perPage = 5;
    pageOptions = [5, 10, 15, {value: 100, text: "Show a lot"}];
    sortBy = '';
    sortDesc = false;
    sortDirection = 'asc';
    filter = null;
    filterOn = [];
    infoModal = {
        id: 'info-modal',
        title: '',
        content: ''
    }
    cities = [
        {value: 'Ensenada', text: 'Ensenada'},
        {value: 'Mexicali', text: 'Mexicali'},
    ];

    get sortOptions() {
        // Create an options list from our fields
        return this.fields
            .filter(f => f.sortable)
            .map(f => {
                return {text: f.label, value: f.key}
            })
    }

    mounted() {
        this.index();
        this.totalRows = this.items.length;

    }

    info(item: any, index: any, button: any) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    }

    resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
    }

    onFiltered(filteredItems: any) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
    }

    index() {
        axios.get('/api/academic-units').then((response) => {
            console.log(response.data);
        });
    }
}

