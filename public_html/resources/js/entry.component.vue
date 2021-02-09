<template>
    <div class="wrapper">
        <div class="main-header">
            <div class="logo-header" data-background-color="green">
                <router-link class="logo" to="/">SIIIP</router-link>
                <div class="nav-toggle">
                    <button class="btn btn-toggle toggle-sidebar" @click="changeStatusSidebar">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
            <nav class="navbar navbar-header navbar-expand-lg" data-background-color="green">
                <div class="container-fluid">
                    <div>
                        <siip-breadcrumb></siip-breadcrumb>
                    </div>
                    <b-avatar></b-avatar>
                </div>
            </nav>
        </div>
        <div class="sidebar sidebar-style-2" v-bind:style="{ display: displaySidebar }">
            <div class="sidebar-wrapper scrollbar scrollbar-inner">
                <div class="sidebar-content">
                    <div class="user">
                        <center>
                            <img src="/img/logo.png">
                        </center>
                    </div>
                    <ul class="nav nav-primary">
                        <router-link
                            v-if="route.name"
                            v-for="(route, index) in routes"
                            :key="index"
                            :to="route.path"
                            active-class="active"
                            class="nav-item"
                            tag="li">
                            <a v-b-toggle="'accordion-' + index">
                                <i
                                    active-class="text-light"
                                    class="mr-2"
                                    style="font-size: 20px;"
                                    :class="`fa ${route.icon}`"></i>
                                <p>{{ route.name }}</p>
                                <span v-if="route.children" class="caret"></span>
                            </a>
                            <b-collapse
                                v-if="route.children"
                                :id="'accordion-'+index"
                                accordion="my-accordion"
                                role="tabpanel"
                                class="mt-2">
                                <router-link
                                    v-for="(subRoute, i) in route.children"
                                    exact-active-class="active"
                                    v-if="!subRoute.path.match(':')"
                                    :key="i"
                                    tag="li"
                                    :to="route.path+'/'+subRoute.path">
                                    <a>
                                        <span class="sub-item">{{subRoute.name}}</span>
                                    </a>
                                </router-link>
                            </b-collapse>
                            <b-collapse
                                v-if="!route.children"
                                style="display: none;"
                                :id="'accordion-'+index"
                                accordion="my-accordion"
                                role="tabpanel"
                                class="mt-2">
                            </b-collapse>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
        <div class="main-panel" v-bind:style="{ width: displayWidth }">
            <div class="content">
                <div class="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <router-view :key="$route.path"></router-view>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="container-fluid">
                    <div class="copyright ml-auto">
                        {{year}}, <a href="https://sanchezcarlosjr.com/">Copyright CGIP-UABC</a>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import {routes} from "./router";

@Component
export default class EntryComponent extends Vue {
    year = new Date().getFullYear();
    routes = routes.slice(1);
    sidebar = true;

    mounted() {
        console.log('%c Interested in working with us?\n See https://www.sanchezcarlosjr.com', 'background: #222; color: #bada55');
    }

    get displaySidebar() {
        return this.sidebar ? 'block' : 'none';
    }

    get displayWidth() {
        return this.sidebar ? 'calc(100% - 250px)' : '100%';
    }

    changeStatusSidebar() {
        this.sidebar = !this.sidebar;
    }
}
</script>

<style scoped>
.breadcrumb {
    background-color: transparent;
    padding: 0;
    margin: 0;
    font-size: 14px;
}

.breadcrumb >>> a {
    color: var(--light);
}
.breadcrumb >>> span {
    color: var(--light);
    opacity: 0.7;
    font-size: 14px;
}
.breadcrumb >>> .breadcrumb-item + .breadcrumb-item::before {
    color: var(--light);
    opacity: 0.7;
    font-size: 14px;
}
</style>
