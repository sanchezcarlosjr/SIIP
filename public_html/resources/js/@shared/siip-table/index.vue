<template>
    <div class="w-100 m-0">
        <div class="card-header b-0">
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
                                        Filtros
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

                            <b-button class="text-muted b-0" size="sm" variant="outline-light">
                                <font-awesome-icon icon="search"/>
                                Buscar
                            </b-button>
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
                                Nuevo
                            </b-button>
                            <b-button
                                v-if="toolbar.has('add-relation')"
                                v-b-tooltip.hover
                                :title="'Agregar '+infoModal.resource"
                                class="b-0"
                                size="sm"
                                variant="outline-success"
                                @click="add($event.target)">
                                Nuevo
                            </b-button>
                        </b-button-group>

                    </b-col>
                </b-row>
                <b-row v-if="isVisibleChart">
                    <siip-chart></siip-chart>
                </b-row>
            </b-container>
        </div>
        <b-container fluid>
            <div class="b-table-sticky-header">
                <b-table
                    id="main-table"
                    ref="table"
                    emptyText="Sin elementos"
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
                            :rows="10"
                        ></b-skeleton-table>
                    </template>
                    <template #cell()="data">
                        <div class="cell">
                            {{ data.value }}
                        </div>
                    </template>
                </b-table>
            </div>
            <b-pagination
                v-model="currentPage"
                :per-page="perPage"
                :total-rows="rows"
                aria-controls="main-table"
                class="d-flex justify-content-end"
                first-text="Primero"
                last-text="Ultimo"
                next-text="Siguiente"
                prev-text="Anterior"
            ></b-pagination>
            <context-menu
                :ref="'vueSimpleContextMenu1'"
                :elementId="'myFirstMenu'"
                :options="options"
                :links="links"
                @option-clicked="optionClicked"
            >
            </context-menu>
            <b-modal id="create"
                     :title="infoModal.title"
                     :ok-disabled="okDisabled"
                     cancel-title="Cancelar"
                     ok-title="Añadir"
                     scrollable
                     @cancel="resetModal"
                     @ok="execute">
                <vue-form-generator
                    :model="infoModal.model"
                    :options="formOptions"
                    :schema="schema"
                    @validated="onValidated"></vue-form-generator>
            </b-modal>
            <b-modal id="edit"
                     :title="infoModal.title"
                     cancel-title="Cancelar"
                     :hide-footer="!hasPermissions(['admin'])"
                     ok-title="Aceptar cambios"
                     scrollable
                     @cancel="resetModal"
                     @ok="execute"
            >
                <b-button-group v-if="links" tag="b-list-group-item" class="b-0">
                    <router-link
                        v-for="(value, key) in links" :key="key"
                        v-b-tooltip.hover
                        :title="value.tooltip"
                        v-if="infoModal.item"
                        :to="value.link.replace('*', infoModal.itemId)"
                        class="pointer" tag="b-button"
                        varant="secondary">
                        <i class="fas" style="font-size:20px"
                           v-bind:class="'fa-'+key"></i>
                    </router-link>
                </b-button-group>
                <vue-form-generator :model="infoModal.model" :schema="schema"></vue-form-generator>
            </b-modal>
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
