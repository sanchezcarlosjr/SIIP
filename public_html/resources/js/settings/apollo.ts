import Vue from "vue";
import VueApollo from "vue-apollo";
import {ApolloClient} from "apollo-client";
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";

Vue.use(VueApollo);

const httpLink = createHttpLink({
    uri: process.env.VUE_APP_API,
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
});

export default new VueApollo({
    defaultClient: apolloClient,
});
