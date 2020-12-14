<template>
    <div class="container">
        <div class="card-header">
            <b-container style="padding: 0" class="card-title">
                <b-row>
                    <b-col style="padding: 0" cols="7">Gestión de cuerpos académicos</b-col>
                    <b-col cols="3"><button class="btn btn-success" size="sm"  data-toggle="modal"><i class="material-icons"></i> <span>Agregar cuerpo académico</span></button></b-col>
                    <b-col cols="2"><b-form-select v-model="citySelected" :options="cities"></b-form-select></b-col>
                </b-row>
            </b-container>
        </div>
        <b-container fluid>
            <b-row>
                <b-col lg="6" class="my-1">
                    <b-form-group
                        label="Sort"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="sortBySelect"
                        class="mb-0"
                    >
                        <b-input-group size="sm">
                            <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
                                <template #first>
                                    <option value="">-- none --</option>
                                </template>
                            </b-form-select>
                            <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
                                <option :value="false">Asc</option>
                                <option :value="true">Desc</option>
                            </b-form-select>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col lg="6" class="my-1">
                    <b-form-group
                        label="Initial sort"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="initialSortSelect"
                        class="mb-0"
                    >
                        <b-form-select
                            v-model="sortDirection"
                            id="initialSortSelect"
                            size="sm"
                            :options="['asc', 'desc', 'last']"
                        ></b-form-select>
                    </b-form-group>
                </b-col>

                <b-col lg="6" class="my-1">
                    <b-form-group
                        label="Filter"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="filterInput"
                        class="mb-0"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                v-model="filter"
                                type="search"
                                id="filterInput"
                                placeholder="Type to Search"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col lg="6" class="my-1">
                    <b-form-group
                        label="Filter On"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        description="Leave all unchecked to filter on all data"
                        class="mb-0">
                        <b-form-checkbox-group v-model="filterOn" class="mt-1">
                            <b-form-checkbox value="name">Name</b-form-checkbox>
                            <b-form-checkbox value="age">Age</b-form-checkbox>
                            <b-form-checkbox value="isActive">Active</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                </b-col>

                <b-col sm="5" md="6" class="my-1">
                    <b-form-group
                        label="Per page"
                        label-cols-sm="6"
                        label-cols-md="4"
                        label-cols-lg="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="perPageSelect"
                        class="mb-0"
                    >
                        <b-form-select
                            v-model="perPage"
                            id="perPageSelect"
                            size="sm"
                            :options="pageOptions"
                        ></b-form-select>
                    </b-form-group>
                </b-col>

                <b-col sm="7" md="6" class="my-1">
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        align="fill"
                        size="sm"
                        class="my-0"
                    ></b-pagination>
                </b-col>
            </b-row>

            <!-- Main table element -->
            <b-table
                show-empty
                small
                stacked="md"
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filter-included-fields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
            >
                <template #cell(name)="row">
                    {{ row.value.first }} {{ row.value.last }}
                </template>

                <template #cell(actions)="row">
                    <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                        Info modal
                    </b-button>
                    <b-button size="sm" @click="row.toggleDetails">
                        {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                    </b-button>
                </template>

                <template #row-details="row">
                    <b-card>
                        <ul>
                            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                        </ul>
                    </b-card>
                </template>
            </b-table>

            <!-- Info modal -->
            <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
                <pre>{{ infoModal.content }}</pre>
            </b-modal>
        </b-container>
    </div>
</template>

<script src="./academic-unit-management.page.ts" lang="ts"></script>
<style src="./academic-unit-management.page.scss" scoped lang="scss"></style>
