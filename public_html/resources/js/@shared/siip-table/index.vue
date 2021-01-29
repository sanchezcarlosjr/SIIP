<template>
    <div class="container m-0">
        <div class="card-header b-0">
            <b-container class="card-title p-0">
                <b-row align-h="between">
                    <b-col cols="4" style="padding: 0">
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
                                size="sm"
                                variant="success"
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
                    @row-clicked="rowClicked"
                >
                    <template #row-details="row">
                        <b-container class="mt-3">
                            <b-row align-h="between">
                                <b-col class="pl-0" cols="4">
                                    <h4>Detalles de {{row.item.name}}</h4>
                                </b-col>
                                <b-col cols="4">
                                    <b-button-group>
                                        <router-link
                                            v-for="(value, key) in links" :key="key"
                                            v-b-tooltip.hover
                                            :title="value.tooltip"
                                            :to="value.link.replace('*', row.item.id)" class="pointer"
                                            tag="b-button">
                                            <i class="fas" style="font-size:20px"
                                               v-bind:class="'fa-'+key"></i>
                                        </router-link>
                                    </b-button-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="pl-0">
                                    <vue-form-generator :model="infoModal.model" :schema="schema"></vue-form-generator>
                                </b-col>
                            </b-row>
                        </b-container>
                    </template>
                    <template #cell(actions)="row">
                        <a v-if="toolbar.has('archive')" v-b-tooltip.hover :title="'Archivar ' + infoModal.resource"
                           class="pointer" style="font-size:20px"
                           @click="archive(row.item, row.index, $event.target)">
                            <i class="fas fa-archive"></i>
                        </a>
                        <a v-if="toolbar.has('edit')" v-b-tooltip.hover :title="'Editar ' + infoModal.resource"
                           class="pointer" style="font-size:20px"
                           @click="edit(row.item, row.index, $event.target)"><i class="fa fa-edit"></i></a>
                        <a v-if="toolbar.has('remove')" v-b-tooltip.hover :title="'Eliminar ' + infoModal.resource"
                           class="pointer" style="font-size:20px"
                           @click="remove(row.item, row.index, $event.target)"><i class="fa fa-trash"></i></a>
                        <a v-if="toolbar.has('remove-relation')" v-b-tooltip.hover
                           :title="'Remover ' + infoModal.resource"
                           class="pointer" style="font-size:20px"
                           @click="removeRelation(row.item, row.index, $event.target)"><i class="fa fa-trash"></i></a>
                    </template>
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
            <b-modal id="create" :title="infoModal.title" cancel-title="Cancelar" ok-title="Añadir" scrollable
                     @hide="resetModal" @ok="execute">
                <vue-form-generator :model="infoModal.model" :schema="schema"></vue-form-generator>
            </b-modal>
            <b-modal id="edit" :title="infoModal.title" cancel-title="Cancelar" ok-title="Aceptar cambios" scrollable
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
