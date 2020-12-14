import Vue from "vue"
import Component from "vue-class-component"
import axios from 'axios';

@Component
export default class AcademicUnitManagementPage extends Vue {
    items = [
        {isActive: true, age: 40, name: {first: 'Dickerson', last: 'Macdonald'}},
        {isActive: false, age: 21, name: {first: 'Larsen', last: 'Shaw'}},
        {
            isActive: false,
            age: 9,
            name: {first: 'Mini', last: 'Navarro'},
        },
        {isActive: false, age: 89, name: {first: 'Geneva', last: 'Wilson'}},
        {isActive: true, age: 38, name: {first: 'Jami', last: 'Carney'}},
        {isActive: false, age: 27, name: {first: 'Essie', last: 'Dunlap'}},
        {isActive: true, age: 40, name: {first: 'Thor', last: 'Macdonald'}},
        {
            isActive: true,
            age: 87,
            name: {first: 'Larsen', last: 'Shaw'},
        },
        {isActive: false, age: 26, name: {first: 'Mitzi', last: 'Navarro'}},
        {isActive: false, age: 22, name: {first: 'Genevieve', last: 'Wilson'}},
        {isActive: true, age: 38, name: {first: 'John', last: 'Carney'}},
        {isActive: false, age: 29, name: {first: 'Dick', last: 'Dunlap'}}
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
    citySelected = 0;
    cities = [
        {value: 0, text: 'Ensenada'},
        {value: 1, text: 'Mexicali'},
        {value: 2, text: 'Tijuana'},
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

