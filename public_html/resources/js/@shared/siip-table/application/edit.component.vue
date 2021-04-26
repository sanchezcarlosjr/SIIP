<template>
    <vue-form-generator :model="model" :schema="schema2"></vue-form-generator>
</template>

<script>
import {adapt} from "../../infraestructure/communication/graphql/graphql-adapter";
import {ApolloEditorRepository} from "../../infraestructure/communication/graphql/ApolloEditorRepository";

export default {
    apollo: {
        model: adapt(new ApolloEditorRepository())
    },
    props: ['schema', 'resource', 'itemId'],
    name: "edit",
    data() {
        return {
            model: {},
            schema2: {
                fields: this.schema.fieldsToFind || this.schema.fields || []
            },
        }
    },
    mounted() {
        this.$apollo.queries.model.refetch();
    }
}
</script>
