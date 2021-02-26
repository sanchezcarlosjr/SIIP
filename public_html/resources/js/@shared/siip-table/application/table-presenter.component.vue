<template>
    <div>
        <b-table
            id="main-table"
            ref="table"
            :busy="busy"
            :current-page="currentPage"
            :fields="fields"
            :filter="criteria"
            :filter-function="search"
            :items="items"
            :per-page="perPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            empty-filtered-text="Sin resultados"
            emptyText="Sin elementos"
            head-variant="light"
            hover
            responsive="sm"
            show-empty
            small
            stacked="md"
            sticky-header
            striped
            @row-clicked="rowClicked"
            @row-contextmenu="rowContextMenu"
        >
            <template #table-busy>
                <b-skeleton-table
                    :columns="fields.length"
                    :rows="3"
                ></b-skeleton-table>
            </template>
        </b-table>
        <context-menu
            :ref="'contextMenu'"
            :elementId="'myFirstMenu'"
            :links="rowContextLinks"
            :options="rowContextOptions"
            @option-clicked="optionClicked"
        >
        </context-menu>
    </div>
</template>

<script>
export default {
    name: "table-presenter",
    props: [
        'busy',
        'items',
        'fields',
        'currentPage',
        'criteria',
        'search',
        'perPage',
        'sortBy',
        'sortDesc',
        'sortDirection',
        'rowContextOptions',
        'rowContextLinks'
    ],
    methods: {
        rowClicked(item, index, event) {
            this.$emit('rowClicked', item, index, event);
        },
        rowContextMenu(item, index, event) {
            event.preventDefault();
            this.$refs.contextMenu.showMenu(event, {
                index,
                row: item
            });
        },
        optionClicked(event) {
            this.$emit('optionClicked', event);
        }
    }
}
</script>
