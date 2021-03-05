<template>
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
</template>

<script>
export default {
    name: "searcher",
    props: ['filters'],
    data() {
        return {
            criteria: [],
            originalFilter: []
        }
    },
    mounted() {
        this.criteria.push(...this.filters.filter((f) => f.default).map((f) => f.value));
        this.originalFilter.push(...this.filters.filter((f) => f.default || !f.default).map((f) => f.value));
    }
}
</script>

<style scoped>

</style>
