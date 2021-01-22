<template>
    <div class="wrapper">
        <div class="main-header">
            <div class="logo-header" data-background-color="green">
                <router-link class="logo" to="/">SIIIP</router-link>
                <button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse"
                        data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon">
						<i class="icon-menu"></i>
					</span>
                </button>
                <button class="topbar-toggler more"><i class="icon-options-vertical"></i></button>
                <div class="nav-toggle">
                    <button class="btn btn-toggle toggle-sidebar">
                        <i class="icon-menu"></i>
                    </button>
                </div>
            </div>
            <nav class="navbar navbar-header navbar-expand-lg" data-background-color="green">
                <div class="container-fluid">
                    <div id="search-nav">
                        <span style="color: #ffffff;max-width: 500px; ">SISTEMA INSTITUCIONAL DE INDICADORES DE INVESTIGACION Y POSGRADO</span>
                    </div>
                </div>
            </nav>
        </div>
        <div class="sidebar sidebar-style-2">
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
                            :key="index" class="nav-item"
                            active-class="active"
                            v-b-toggle="'accordion-' + index"
                            tag="li" :to="route.path">
                            <a>
                                <i
                                    active-class="text-light"
                                    style="padding-right: 5px; font-size: 20px;"
                                   :class="`fa ${route.icon}`"></i>
                                <p>{{route.name}}</p>
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
                                    active-class="active"
                                    v-if="!subRoute.path.match(':')"
                                    :key="index"
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
        <div class="main-panel">
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
                        {{year}}, hecho con <i class="fa fa-heart heart text-danger"></i> por <a
                        href="https://sanchezcarlosjr.com/">alumnos de UABC</a>
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

    mounted() {
        console.log('%c Interested in working with us?\n See https://www.sanchezcarlosjr.com', 'background: #222; color: #bada55');
    }
}
</script>
