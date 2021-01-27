<template>
  <div class="container m-0">
      <div class="card-header">
          <b-container style="padding: 0" class="card-title">
              <b-row align-h="between">
                  <b-col :cols="toolbar.has('add') || toolbar.has('add-relation')" style="padding: 0">
                      <siip-breadcrumb :title="title"></siip-breadcrumb>
                  </b-col>
                  <b-col cols="3">
                      <b-dropdown size="sm" block split text="De 1/13/2021 a 1/21/2021" variant="outline-success">
                          <b-dropdown-item href="#">Action</b-dropdown-item>
                          <b-dropdown-item href="#">Another action</b-dropdown-item>
                            <b-dropdown-item href="#">Something else here...</b-dropdown-item>
                        </b-dropdown>
                    </b-col>
                </b-row>
                <b-row align-h="between">
                    <b-col cols="10" align-self="start">
                        <b-row align-h="start">
                            <b-col :cols="(toolbar.has('add') || toolbar.has('add-relation')) ? 2 : 1" class="pr-0">
                                <b-button
                                    v-if="toolbar.has('add')"
                                    @click="create($event.target)"
                                    style="border-radius:100%;"
                                    v-b-tooltip.hover :title="'Agregar '+infoModal.resource"
                                    variant="outline-success"
                                >
                                    <i class="fa fa-plus" aria-hidden="false"></i>
                                </b-button>
                                <b-button
                                    v-if="toolbar.has('add-relation')"
                                    @click="add($event.target)"
                                    style="border-radius:100%;"
                                    v-b-tooltip.hover :title="'Agregar '+infoModal.resource"
                                    variant="outline-success"
                                >
                                    <i class="fa fa-plus" aria-hidden="false"></i>
                                </b-button>
                                <b-dropdown
                                    v-b-tooltip.hover
                                    title="Filtros"
                                    variant="secondary-link"
                                    toggle-class="text-decoration-none"
                                    no-caret>
                                    <template #button-content>
                                        <i class="pointer fa fa-filter" aria-hidden="false"></i>
                                    </template>
                                    <b-dropdown-item
                                        v-for="(filter, index) in originalFilter"
                                        v-on:click="criteria.push(filter)"
                                        v-bind:key="index">{{ filter }}</b-dropdown-item>
                                </b-dropdown>
                            </b-col>
                            <b-col class="pl-0">
                                <b-form-group
                                    class="mb-0 p-0"
                                >
                                    <b-input-group>
                                        <b-form-tags
                                            input-id="tags-pills"
                                            v-model="criteria"
                                            tag-variant="primary"
                                            tag-pills
                                            remove-on-delete
                                            addButtonText="Añadir"
                                            placeholder="Añadir filtro"
                                        ></b-form-tags>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="1">
                        <pdf-button></pdf-button>
                        <csv-button></csv-button>
                    </b-col>
                </b-row>
            </b-container>
        </div>
         <b-container fluid>
            <div class="b-table-sticky-header">
                <b-table
                    small
                    id="main-table"
                    hover
                    ref="table"
                    stacked="md"
                    sticky-header
                    head-variant="light"
                    :items="items"
                    :fields="tableFields"
                    :filter="criteria"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :filter-function="search"
                    :sort-direction="sortDirection"
                    @row-clicked="item=>$set(item, '_showDetails', !item._showDetails)"
                >
                    <template #cell(actions)="row">
                        <router-link
                            :key="key" v-for="(value, key) in links"
                            tag="span"
                            class="pointer"
                            v-b-tooltip.hover :title="value.tooltip"
                            :to="value.link.replace('*', row.item.id)">
                                <i style="font-size:20px" class="fas" v-bind:class="'fa-'+key"></i>
                        </router-link>
                        <a class="pointer" v-b-tooltip.hover :title="'Archivar ' + infoModal.resource" style="font-size:20px" @click="archive(row.item, row.index, $event.target)" v-if="toolbar.has('archive')"><i class="fas fa-archive"></i></a>
                        <a class="pointer" v-b-tooltip.hover :title="'Editar ' + infoModal.resource" style="font-size:20px" @click="edit(row.item, row.index, $event.target)" v-if="toolbar.has('edit')"><i class="fa fa-edit"></i></a>
                        <a class="pointer" v-b-tooltip.hover :title="'Eliminar ' + infoModal.resource"style="font-size:20px" @click="remove(row.item, row.index, $event.target)" v-if="toolbar.has('remove')"><i class="fa fa-trash"></i></a>
                        <a class="pointer" v-b-tooltip.hover :title="'Remover ' + infoModal.resource"style="font-size:20px" @click="removeRelation(row.item, row.index, $event.target)" v-if="toolbar.has('remove-relation')"><i class="fa fa-trash"></i></a>
                    </template>
                    <template #row-details="row">
                        <b-card>
                        <b-list-group>
                            <b-list-group-item v-if="!key.match('id') && key !== '_showDetails'" class="d-flex justify-content-between align-items-center" v-for="(value, key) in toBeatyItem(row.item)" :key="key">
                                {{value}}
                                <b-badge variant="primary" pill>{{ key  }}</b-badge>
                            </b-list-group-item>
                        </b-list-group>
                        </b-card>
                    </template>
                </b-table>
            <b-skeleton-table
                    v-if="items.length === 0"
                    :rows="10"
                    :columns="fields.length"
                ></b-skeleton-table>
            </div>
            <b-modal id="create" scrollable :title="infoModal.title" ok-title="Añadir" cancel-title="Cancelar" @hide="resetModal" @ok="execute">
                <vue-form-generator :schema="schema" :model="infoModal.model"></vue-form-generator>
            </b-modal>
            <b-modal id="edit"  scrollable :title="infoModal.title" ok-title="Aceptar cambios" cancel-title="Cancelar" @hide="resetModal" @ok="execute">
               <vue-form-generator :schema="schema" :model="infoModal.model"></vue-form-generator>
            </b-modal>
            <b-modal id="remove" scrollable :title="infoModal.title" ok-title="Si, deseo eliminar" cancel-title="Cancelar" @hide="resetModal" @ok="execute">
                <p>¿Realmente desea eliminar a este {{infoModal.resource}}?</p>
                <p class="text-warning"><small>Esta acción no puede ser revertida.</small></p>
            </b-modal>
             <b-modal id="removeRelation" scrollable :title="infoModal.title" ok-title="Si, deseo removerlo" cancel-title="Cancelar" @hide="resetModal" @ok="execute">
                 <p>¿Realmente desea remover a este {{infoModal.resource}}?</p>
                 <p class="text-warning"><small>Esta acción no puede ser revertida.</small></p>
             </b-modal>
            <b-modal id="archive" scrollable :title="infoModal.title" ok-title="Si, deseo archivarlo" cancel-title="Cancelar" @hide="resetModal" @ok="execute">
                <p>¿Realmente desea archivar a este {{infoModal.resource}}?</p>
            </b-modal>
        </b-container>
    </div>
</template>

<script src="./siip-table.component.ts" lang="ts"></script>
<style src="./siip-table.component.scss" scoped lang="scss"></style>
