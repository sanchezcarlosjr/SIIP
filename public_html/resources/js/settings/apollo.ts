import Vue from "vue";
import VueApollo from "vue-apollo";
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {createUploadLink} from "apollo-upload-client";

Vue.use(VueApollo);

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link: createUploadLink({
        uri: '/graphql'
    }),
    cache
});

export default new VueApollo({
    defaultClient: apolloClient
});
