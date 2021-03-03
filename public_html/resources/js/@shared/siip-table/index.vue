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
                            <searcher-component
                                :filters="filter"
                            ></searcher-component>
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
                                v-if="this.$slots.statistics"
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
