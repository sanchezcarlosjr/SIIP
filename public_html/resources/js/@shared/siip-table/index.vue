<template>
    <div class="w-100 m-0">
        <div class="b-0" style="padding: 1rem 1.25rem 1rem 1.25rem;">
            <b-container class="card-title p-0">
                <b-row align-h="between">
                    <b-col cols="6" style="padding: 0">
                        <siip-breadcrumb isAPage="true"></siip-breadcrumb>
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
                        </b-button-group>
                    </b-col>
                </b-row>
                <b-row v-if="isVisibleChart">
                    <slot name="statistics"></slot>
                </b-row>
            </b-container>
        </div>
        <table-presenter
            :busy="$apollo.loading"
            :fields="tableFields"
            :filter="criteria"
            :filter-function="search"
            :items="items"
            :rowContextLinks="links"
            :rowContextOptions="options"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @optionClicked="optionClicked"
            @rowClicked="edit"
        >
        </table-presenter>
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
            :hide-footer="true"
            :title="infoModal.title"
            cancel-title="Cancelar"
            ok-title="Aceptar"
            scrollable
            size="xl"
            @hide="hideModal"
        >
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
            :model="infoModal.model"
            :schema="schema"
            :title="infoModal.title"
            @ok="execute"
            @reset="resetModal"
        ></edit-modal-component>
        <remove-modal-component
            :resource="infoModal.resource"
            :title="infoModal.title"
            @ok="execute"
            @reset="resetModal"
        ></remove-modal-component>
        <b-modal id="archive" :title="infoModal.title" cancel-title="Cancelar" ok-title="Si, deseo archivarlo"
                 scrollable @hide="resetModal" @ok="execute">
            <p>¿Realmente desea archivar a este {{ infoModal.resource }}?</p>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./siip-table.component.ts"></script>
<style lang="scss" scoped src="./siip-table.component.scss"></style>
