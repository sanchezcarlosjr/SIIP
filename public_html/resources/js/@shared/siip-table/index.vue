<template>
    <div class="w-100 m-0">
        <div class="b-0" style="padding: 1rem 1.25rem 1rem 1.25rem;">
            <b-container class="card-title p-0">
                <b-row align-h="between">
                    <b-col cols="6" style="padding: 0">
                        <siip-breadcrumb :title="title" isAPage="true"></siip-breadcrumb>
                    </b-col>
                    <b-col cols="5">
                        <b-button-group class="float-right">
                            <b-dropdown
                                v-b-tooltip.hover
                                no-caret
                                title="Filtros"
                                toggle-class="text-decoration-none"
                                variant="secondary-link"
                            >
                                <template #button-content>
                                    <b-button class="text-muted b-0" size="sm" variant="outline-light">
                                        <i class="fas fa-search"></i>
                                        Buscar
                                    </b-button>
                                </template>
                                <b-dropdown-form style="width: 500px">
                                    <b-input-group>
                                        <b-form-tags
                                            v-model="criteria"
                                            addButtonText="Añadir"
                                            input-id="tags-pills"
                                            placeholder="Añadir filtro"
                                            remove-on-delete
                                            tag-pills
                                            tag-variant="primary"
                                        ></b-form-tags>
                                    </b-input-group>
                                    <b-form-checkbox-group
                                        v-model="criteria"
                                        :options="originalFilter"
                                    ></b-form-checkbox-group>
                                </b-dropdown-form>
                            </b-dropdown>
                            <b-dropdown
                                v-b-tooltip.hover
                                no-caret
                                size="sm"
                                title="Otras acciones"
                                toggle-class="text-decoration-none"
                                variant="secondary-link"
                            >
                                <template #button-content>
                                    <font-awesome-icon class="text-muted b-0" icon="ellipsis-h"/>
                                </template>
                                <b-dropdown-item>
                                    <pdf-button></pdf-button>
                                    <csv-button></csv-button>
                                </b-dropdown-item>
                            </b-dropdown>
                            <b-button
                                v-b-tooltip.hover
                                :title="isVisibleChart ? 'Ocultar gráfico' : 'Mostrar  gráfico'"
                                size="sm"
                                variant="link-secondary"
                                @click="toggleChart">
                                <font-awesome-icon :icon="chartIcon" class="text-muted"></font-awesome-icon>
                            </b-button>
                            <b-button
                                v-if="toolbar.has('add')"
                                v-permission="['admin']"
                                v-b-tooltip.hover
                                :title="'Agregar '+infoModal.resource"
                                class="b-0"
                                size="sm"
                                squared
                                variant="outline-success"
                                @click="create($event.target)">
                                +Nuevo
                            </b-button>
                            <b-button
                                v-if="toolbar.has('add-relation')"
                                v-b-tooltip.hover
                                :title="'Agregar '+infoModal.resource"
                                class="b-0"
                                size="sm"
                                variant="outline-success"
                                @click="add($event.target)">
                                +Nuevo
                            </b-button>
                        </b-button-group>
                    </b-col>
                </b-row>
                <b-row v-if="isVisibleChart">
                    <p class="p-0 m-0 ml-3">Mostrando 1 a {{perPage}} de {{rows}} resultados.</p>
                    <siip-chart></siip-chart>
                </b-row>
            </b-container>
        </div>
        <b-container fluid class="p-0 m-0">
            <div class="b-table-sticky-header">
                <b-table
                    id="main-table"
                    ref="table"
                    emptyText="Sin elementos"
                    empty-filtered-text="Sin resultados"
                    :busy="$apollo.loading"
                    :items="items"
                    :fields="tableFields"
                    :current-page="currentPage"
                    :filter="criteria"
                    :filter-function="search"
                    :per-page="perPage"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection"
                    head-variant="light"
                    hover
                    responsive="sm"
                    small
                    stacked="md"
                    sticky-header
                    striped
                    show-empty
                    @row-clicked="edit"
                    @row-contextmenu="rowContextMenu"
                >
                    <template #table-busy>
                        <b-skeleton-table
                            :columns="fields.length"
                            :rows="2"
                        ></b-skeleton-table>
                    </template>
                    <template #cell()="data">
                        <div class="cell">
                            {{ data.value }}
                        </div>
                    </template>
                </b-table>
            </div>
            <b-container class="bv-example-row">
                <b-row align-h="between">
                    <b-col cols="4">
                        <p>
                            <b-form-select id="perPageSelected" v-model="perPage" :options="[5, 10, 25]" size="sm" class="mt-0 w-25"></b-form-select>
                            resultados por página.
                        </p>
                    </b-col>
                    <b-col cols="4">
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="rows"
                            class="d-flex justify-content-end"
                            :per-page="perPage"
                            aria-controls="main-table"
                        ></b-pagination>
                    </b-col>
                </b-row>
            </b-container>
            <context-menu
                :ref="'vueSimpleContextMenu1'"
                :elementId="'myFirstMenu'"
                :options="options"
                :links="links"
                @option-clicked="optionClicked"
            >
            </context-menu>
            <create-modal-component
                :form-options="formOptions"
                :model="infoModal.model"
                :ok-disabled="okDisabled"
                :schema="schema"
                :title="infoModal.title"
                @ok="execute"
                @onValidated="onValidated"
                @reset="resetModal"
            ></create-modal-component>
            <b-modal
                :id="'editCollapse'+infoModal.resource"
                :hide-footer="!hasPermissions(['admin'])"
                :title="infoModal.title"
                cancel-title="Cancelar"
                ok-title="Aceptar"
                scrollable
                size="xl"
                @hide="hideModal"
                @cancel="resetModal"
                @ok="execute">
                <b-nav tabs>
                    <b-nav-item
                        v-for="(value, key) in links" :key="key"
                        :to="value.link.replace('*', infoModal.itemId)"
                        active-class="active">
                        <i class="fas" style="font-size:20px"
                           v-bind:class="'fa-'+key"></i>
                        {{ value.tooltip }}
                    </b-nav-item>
                </b-nav>
                <router-view :key="$route.path"></router-view>
            </b-modal>
            <edit-modal-component
                :title="infoModal.title"
                :model="infoModal.model"
                :schema="schema"
                @reset="resetModal"
                @ok="execute"
            ></edit-modal-component>
            <b-modal id="remove" :title="infoModal.title" cancel-title="Cancelar" ok-title="Si, deseo eliminar"
                     scrollable @hide="resetModal" @ok="execute">
                <p>¿Realmente desea eliminar a este {{ infoModal.resource }}?</p>
                <p class="text-warning"><small>Esta acción no puede ser revertida.</small></p>
            </b-modal>
            <b-modal id="removeRelation" :title="infoModal.title" cancel-title="Cancelar" ok-title="Si, deseo removerlo"
                     scrollable @hide="resetModal" @ok="execute">
                <p>¿Realmente desea remover a este {{ infoModal.resource }}?</p>
                <p class="text-warning"><small>Esta acción no puede ser revertida.</small></p>
            </b-modal>
            <b-modal id="archive" :title="infoModal.title" cancel-title="Cancelar" ok-title="Si, deseo archivarlo"
                     scrollable @hide="resetModal" @ok="execute">
                <p>¿Realmente desea archivar a este {{ infoModal.resource }}?</p>
            </b-modal>
        </b-container>
    </div>
</template>

<script lang="ts" src="./siip-table.component.ts"></script>
<style lang="scss" scoped src="./siip-table.component.scss"></style>
