<template>
    <div class="container m-0">
        <div class="card-header b-0">
            <b-container class="card-title p-0">
                <b-row align-h="between">
                    <b-col style="padding: 0">
                        <siip-breadcrumb :title="title"></siip-breadcrumb>
                    </b-col>
                    <b-col cols="3">
                        <b-dropdown block size="sm" text="De 1/13/2021 a 1/21/2021" variant="outline-success">
                            <b-dropdown-item href="#">Action</b-dropdown-item>
                            <b-dropdown-item href="#">Another action</b-dropdown-item>
                            <b-dropdown-item href="#">Something else here...</b-dropdown-item>
                        </b-dropdown>
                    </b-col>
                </b-row>
                <b-row v-if="isVisibleChart">
                    <siip-chart></siip-chart>
                </b-row>
                <b-row align-h="between">
                    <b-col align-self="start" cols="10">
                        <b-row align-h="start">
                            <b-col :cols="(toolbar.has('add') || toolbar.has('add-relation')) ? 2 : 1" class="pr-0">
                                <b-button
                                    v-if="toolbar.has('add')"
                                    v-b-tooltip.hover
                                    :title="'Agregar '+infoModal.resource"
                                    style="border-radius:100%;" variant="outline-success"
                                    @click="create($event.target)"
                                >
                                    <i aria-hidden="false" class="fa fa-plus"></i>
                                </b-button>
                                <b-button
                                    v-if="toolbar.has('add-relation')"
                                    v-b-tooltip.hover
                                    :title="'Agregar '+infoModal.resource"
                                    style="border-radius:100%;" variant="outline-success"
                                    @click="add($event.target)"
                                >
                                    <i aria-hidden="false" class="fa fa-plus"></i>
                                </b-button>
                                <b-dropdown
                                    v-b-tooltip.hover
                                    no-caret
                                    title="Filtros"
                                    toggle-class="text-decoration-none"
                                    variant="secondary-link"
                                >
                                    <template #button-content>
                                        <i aria-hidden="false" class="pointer fa fa-filter"></i>
                                    </template>
                                    <b-dropdown-form style="width: 200px">
                                        <b-form-checkbox-group
                                            v-model="criteria"
                                            :options="originalFilter"
                                        ></b-form-checkbox-group>
                                    </b-dropdown-form>
                                </b-dropdown>
                            </b-col>
                            <b-col class="pl-0">
                                <b-form-group
                                    class="mb-0 p-0"
                                >
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
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="2" style="    text-align-last: end;">
                        <pdf-button></pdf-button>
                        <csv-button></csv-button>
                        <b-button
                            v-b-tooltip.hover
                            :title="isVisibleChart ? 'Ocultar gráfico' : 'Mostrar  gráfico'"
                            variant="link-secondary"
                            @click="toggleChart">
                            <font-awesome-icon :icon="chartIcon"></font-awesome-icon>
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <b-container fluid>
            <div class="b-table-sticky-header">
                <b-table
                    id="main-table"
                    ref="table"
                    :fields="tableFields"
                    :filter="criteria"
                    :filter-function="search"
                    :items="items"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    @row-dblclicked="goTo"
                    :sort-direction="sortDirection"
                    head-variant="light"
                    hover
                    responsive
                    small
                    stacked="md"
                    sticky-header
                >
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
