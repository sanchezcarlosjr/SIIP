<template>
  <div class="container">
        <div class="card-header">
            <b-container style="padding: 0" class="card-title">
                <b-row>
                    <b-col style="padding: 0" cols="8">{{tableTitle}}</b-col>
                    <b-col cols="4">
                       <b-row>
                            <b-col cols="9">
                              <button  @click="add($event.target)" class="btn btn-success" size="sm" >Agregar cuerpo académico</button>
                            </b-col>
                            <b-col>
                                  <pdf-button></pdf-button>
                                  <csv-button></csv-button>
                            </b-col>
                       </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </div>
         <b-container fluid>
            <b-row>
                <b-col lg="12" class="my-1">
                    <b-form-group
                        class="mb-0"
                    >
                        <b-input-group>
                            <b-form-tags
                                input-id="tags-pills"
                                v-model="filter"
                                tag-variant="primary"
                                tag-pills
                                remove-on-delete
                                size="lg"
                                addButtonText="Añadir"
                                placeholder="Buscar"
                            ></b-form-tags>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <div class="b-table-sticky-header">
                <b-table
                    small
                    id="main-table"
                    hover
                    stacked="md"
                    sticky-header
                    head-variant="light"
                    :items="items"
                    :fields="fields"
                    :filter="filter"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :filter-function="search"
                    :sort-direction="sortDirection"
                    @row-clicked="item=>$set(item, '_showDetails', !item._showDetails)"
                >
                    <template #cell(actions)="row">
                        <a style="font-size:20px" @click="edit(row.item, row.index, $event.target)"><i class="fa fa-edit"></i></a>
                        <a style="font-size:20px" @click="remove(row.item, row.index, $event.target)"><i class="fa fa-trash"></i></a>
                    </template>
                    <template #row-details="row">
                        <b-card>
                        <b-list-group>
                            <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(value, key) in row.item" :key="key">
                            {{ value }}
                            <b-badge variant="primary" pill>{{ key }}</b-badge>
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
            <b-modal id="add" :title="infoModal.title" ok-title="Aceptar" cancel-title="Cancelar" @hide="resetModal" @ok="execute">
                <vue-form-generator :schema="schema" :model="infoModal.model"></vue-form-generator>
            </b-modal>
            <b-modal id="edit" :title="infoModal.title" ok-title="Aceptar" cancel-title="Cancelar" @hide="resetModal" @ok="execute">
               <vue-form-generator :schema="schema" :model="infoModal.model"></vue-form-generator>
            </b-modal>
            <b-modal id="remove" :title="infoModal.title" ok-title="Aceptar" cancel-title="Cancelar" @hide="resetModal" @ok="execute">
                <p>¿Realmente desea eliminar a este {{infoModal.resource}}?</p>
                <p class="text-warning"><small>Esta acción no puede ser revertida.</small></p>
            </b-modal>
        </b-container>
    </div>
</template>

<script src="./siip-table.component.ts" lang="ts"></script>
<style src="./siip-table.component.scss" scoped lang="scss"></style>
