<template>
    <div class="wrapper">
        <div class="main-header">
            <div class="logo-header" data-background-color="green">
                <router-link class="logo" to="/home">SIIIP</router-link>
                <button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
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
                    <div  id="search-nav">
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
                        <router-link class="nav-item" active-class="active" tag="li" to="/home">
                            <a v-b-toggle.accordion-1>
                                <i class="fa fa-home"></i>
                                <p>Inicio</p>
                            </a>
                            <b-collapse style="display: none;" id="accordion-1" accordion="my-accordion" role="tabpanel" class="mt-2">
                            </b-collapse>
                        </router-link>
                        <router-link class="nav-item" active-class="active" tag="li" to="/users">
                            <a v-b-toggle.accordion-2>
                                <i class="fa fa-users"></i>
                                <p>Usuarios</p>
                            </a>
                            <b-collapse style="display: none;" id="accordion-2" accordion="my-accordion" role="tabpanel" class="mt-2"></b-collapse>
                        </router-link>
                        <router-link class="nav-item" active-class="active" tag="li" to="/academic-unit">
                            <a v-b-toggle.accordion-3>
                                <i class="fa fa-address-card"></i>
                                <p>Cuerpos Académicos</p>
                                <span class="caret"></span>
                            </a>
                            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel" class="mt-2">
                                <ul class="nav nav-collapse">
                                    <router-link exact-active-class="active" tag="li" to="/academic-unit">
                                        <a>
                                            <span class="sub-item">Gestión</span>
                                        </a>
                                    </router-link>
                                    <router-link active-class="active" tag="li" to="/academic-unit/queries">
                                        <a>
                                            <span class="sub-item">Consultas</span>
                                        </a>
                                    </router-link>
                                    <router-link active-class="active" tag="li" to="/academic-unit/members">
                                        <a>
                                            <span class="sub-item">Miembros CA</span>
                                        </a>
                                    </router-link>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">LGAC</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Evaluación CA</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Apoyo CA</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Redes</span>
                                        </a>
                                    </li>
                                </ul>
                            </b-collapse>
                        </router-link>
                        <router-link class="nav-item" active-class="active" tag="li" to="/prodep">
                            <a v-b-toggle.accordion-4>
                                <i class="fa fa-university"></i>
                                <p>PRODEP</p>
                                <span class="caret"></span>
                            </a>
                            <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel" class="mt-2">
                                <ul class="nav nav-collapse">
                                    <router-link  active-class="active" tag="li" to="/prodep">
                                        <a href="">
                                            <span class="sub-item">Evaluación</span>
                                        </a>
                                    </router-link>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Beneficios</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">NPTC</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Consultas</span>
                                        </a>
                                    </li>
                                </ul>
                            </b-collapse>
                        </router-link>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#sidebar3">
                                <i class="fa fa-laptop"></i>
                                <p>SNI</p>
                                <span class="caret"></span>
                            </a>
                            <div class="collapse" id="sidebar3">
                                <ul class="nav nav-collapse">
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Gestión SNI</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Consultas</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#sidebar4">
                                <i class="f/a fa-podcast"></i>
                                <p>Profesor-Investigador</p>
                                <span class="caret"></span>
                            </a>
                            <div class="collapse" id="sidebar4">
                                <ul class="nav nav-collapse">
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Gestión</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Alertas</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Consultas</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#sidebar5">
                                <i class="fa fa-building"></i>
                                <p>Productividad Academica</p>
                                <span class="caret"></span>
                            </a>
                            <div class="collapse" id="sidebar5">
                                <ul class="nav nav-collapse">
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Gestión</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Artículo</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Libros</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Innovación</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Productividad Artística</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Prototipos</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Informes Tecnicos</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Dirección Individualizada</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Consultas</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#sidebar6">
                                <i class="icon-organization icons"></i>
                                <p>Propiedad Intelectual</p>
                                <span class="caret"></span>
                            </a>
                            <div class="collapse" id="sidebar6">
                                <ul class="nav nav-collapse">
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Actividades</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Asesorías</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Solicitudes de Invención</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Solicitudes de Derechos de Autor</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Consultas</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#sidebar7">
                                <i class="icon-graduation icons"></i>
                                <p>Posgrado</p>
                                <span class="caret"></span>
                            </a>
                            <div class="collapse" id="sidebar7">
                                <ul class="nav nav-collapse">
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Programas Educativos</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Modificaciones</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Evaluación</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">NAB</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <span class="sub-item">Consultas</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="main-panel">
            <div class="content">
                <div class="page-inner">
                    <div class="page-header">
                        <h4 class="page-title"> {{title}}</h4>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <router-view></router-view>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="container-fluid">
                    <div class="copyright ml-auto">
                        2020, hecho con <i class="fa fa-heart heart text-danger"></i> por <a href="https://www.themekita.com">alumnos de UABC</a>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"
    import { Watch } from "vue-property-decorator"
    @Component
    export default class EntryComponent extends Vue {
        title = document.title;
        @Watch('$route')
        onPropertyChanged(to: any, from: any) {
            if (to.meta.title) {
                this.title = to.meta.title;
            }
        }
    }
</script>
