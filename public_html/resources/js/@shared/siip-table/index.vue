<template>
    <div class="container m-0">
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
                    :busy.sync="isBusy"
                    :current-page="currentPage"
                    :fields="tableFields"
                    :filter="criteria"
                    :filter-function="search"
                    :items="items"
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
                    @row-clicked="edit"
                    @row-contextmenu="rowContextMenu"
                >
                    <template #cell()="data">
                        <div class="cell">
                            {{ data.value }}
                            <b-dropdown
                                v-if="data.field.editable"
                                id="dropdown-form" ref="dropdown" class="update"
                                no-caret toggle-class="text-decoration-none p-0" variant="link">
                                <template #button-content>
                                    <i class="fas fa-pen"></i>
                                </template>
                                <b-dropdown-form style="width: 250px">
                                    <b-form-group :label="data.field.label"
                                                  :label-for="'dropdown-form-'+data.field.key+'-'+data.index"
                                                  @submit.stop.prevent>
                                        <b-form-input
                                            :id="'dropdown-form-'+data.field.key+'-'+data.index"
                                            :value="data.value"
                                            size="sm"
                                        ></b-form-input>
                                    </b-form-group>
                                    <b-button size="sm" variant="primary">Guardar</b-button>
                                </b-dropdown-form>
                            </b-dropdown>
                        </div>
                    </template>
                </b-table>
                <b-skeleton-table
                    v-if="items.length === 0"
                    :columns="fields.length"
                    :rows="10"
                ></b-skeleton-table>
            </div>
            <b-pagination
                v-model="currentPage"
                :per-page="perPage"
                :total-rows="rows"
                aria-controls="main-table"
                class="d-flex justify-content-end"
                first-text="First"
                last-text="Last"
                next-text="Next"
                prev-text="Prev"
            ></b-pagination>
            <context-menu
                :ref="'vueSimpleContextMenu1'"
                :elementId="'myFirstMenu'"
                :options="options"
                :links="links"
                @option-clicked="optionClicked"
            >
            </context-menu>
            <b-modal id="create" :title="infoModal.title" cancel-title="Cancelar" ok-title="Añadir" scrollable
                     @hide="resetModal" @ok="execute">
                <vue-form-generator :model="infoModal.model" :schema="schema"></vue-form-generator>
            </b-modal>
            <b-modal id="edit"
                     :title="infoModal.title"
                     cancel-title="Cancelar"
                     :hide-footer="!infoModal.canEdit"
                     ok-title="Aceptar cambios"
                     scrollable
                     @hide="resetModal" @ok="execute">
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
