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
            <template v-for="category in categories">
              <b-form-checkbox-group v-model="criteria">
                <template v-for="option in category.criteria">
                  <b-form-checkbox v-bind:value="option.value" @change="scan(category, option.value)">{{ option.value }}</b-form-checkbox>
                </template>
              </b-form-checkbox-group>
            </template>
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
            categories: []
        }
    },
    mounted() {
      this.filters.forEach((category) => {
        this.categories.push(category);
        category.criteria.forEach((option) => {
          if (option.default === true) {
            this.criteria.push(option.value);
          }
        });
      });
      this.$emit("update", this.criteria);
      this.$watch('criteria', () => {
          this.$emit("update", this.criteria);
      }, {deep: true})
    },
    methods: {
      scan(category, value) {
        if (category.type === "xor") {
          let contains = this.criteria.includes(value);
          this.criteria = this.criteria.filter((v) => {
            return !category.criteria.some(x => x.value === v);
          });
          if(contains) {
            this.criteria.push(value);
          }
        }
      }
    }
}
</script>

<style scoped>

</style>
