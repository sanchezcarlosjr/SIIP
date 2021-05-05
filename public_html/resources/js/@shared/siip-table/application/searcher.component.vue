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
              <b-form-checkbox-group v-model="checkboxes">
                <template v-for="option in category.criteria">
                  <b-form-checkbox v-bind:value="option.value" @change="sync(category, option.value)">{{ option.value }}</b-form-checkbox>
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
            categories: [],
            checkboxes: []
        }
    },
    mounted() {
      this.filters.forEach((category) => {
        this.categories.push(category);
        category.criteria.forEach((option) => {
          if (option.default === true) {
            this.criteria.push(option.value);
            this.checkboxes.push(option.value);
          }
        });
      });
      this.$emit("update", this.pack());
      this.$watch('criteria', () => {
        this.$emit("update", this.pack());
      }, {deep: true});
    },
    methods: {
      clean() {
        /** Remove leftover checks */
        this.checkboxes = this.checkboxes.filter(v => this.criteria.includes(v));
      },
      pack() {
        this.clean();
        let criteria = [];

        /** Get Difference */
        let difference = this.criteria.filter(c => !this.checkboxes.includes(c));
        this.criteria.forEach((item) => {
          if (!difference.includes(item)) {
            criteria.push({
              name: this.categories.find(category => category.criteria.some(option => option.value === item)).model,
              value: `${item}`
            });
          }
        });

        return {
          criteria: criteria,
          terms: difference
        };
      },
      sync(category, value) {
        /** Remove from Criteria */
        this.criteria = this.criteria.filter(c => !(this.checkboxes.includes(c) || c === value));
        if (category.type === "xor") {
          /** Remove overlap on Checkboxes */
          this.checkboxes = this.checkboxes.filter((v) => {
            return (!category.criteria.some(x => x.value === v) || v === value);
          });
        }
        /** Merge */
        this.criteria = [...this.criteria, ...this.checkboxes];
      }
    }
}
</script>

<style scoped>

</style>
