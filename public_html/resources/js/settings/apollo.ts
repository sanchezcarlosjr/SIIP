import Vue from "vue";
import VueApollo from "vue-apollo";
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {createUploadLink} from "apollo-upload-client";
import {setContext} from 'apollo-link-context';
import state from "../store/store";

Vue.use(VueApollo);

const authLink = setContext((opt, {headers}) => {
    return {
        headers: {
            ...headers,
            authorization: state.user.token
        }
    }
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link: authLink.concat(createUploadLink({
        uri: '/graphql'
    })),
    cache
});

export default new VueApollo({
    defaultClient: apolloClient
});
