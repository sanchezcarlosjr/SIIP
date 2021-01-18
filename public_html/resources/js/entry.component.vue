<template>
    <div class="wrapper">
        <div class="main-header">
            <div class="logo-header" data-background-color="green">
                <router-link class="logo" to="/">SIIIP</router-link>
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
                        <router-link class="nav-item" active-class="active" tag="li" to="/inicio">
                            <a v-b-toggle.accordion-1>
                                <i style="padding-right: 5px; font-size: 20px;" class="fas fa-home"></i>
                                <p>Inicio</p>
                            </a>
                            <b-collapse style="display: none;" id="accordion-1" accordion="my-accordion" role="tabpanel" class="mt-2">
                            </b-collapse>
                        </router-link>
                        <router-link class="nav-item" active-class="active" tag="li" to="/usuarios">
                            <a v-b-toggle.accordion-2>
                                <i active-class="text-light" style="padding-right: 5px; font-size: 20px;" class="fa fa-users"></i>
                                <p>Usuarios</p>
                                <span class="caret"></span>
                            </a>
                            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" class="mt-2">
                                <router-link exact-active-class="active" tag="li" to="/usuarios">
                                    <a>
                                        <span class="sub-item">Gestión</span>
                                    </a>
                                </router-link>
                                <router-link active-class="active" tag="li" to="/usuarios/permissions">
                                    <a>
                                        <span class="sub-item">Permisos</span>
                                    </a>
                                </router-link>
                            </b-collapse>
                        </router-link>
                        <router-link class="nav-item" active-class="active" tag="li" to="/cuerpos-academicos">
                            <a v-b-toggle.accordion-3>
                                <i style="padding-right: 5px; font-size: 20px;" class="fa fa-address-card"></i>
                                 <p>Cuerpos Académicos</p>
                                <span class="caret"></span>
                            </a>
                            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel" class="mt-2">
                                <ul class="nav nav-collapse">
                                    <router-link exact-active-class="active" tag="li" to="/cuerpos-academicos">
                                        <a>
                                            <span class="sub-item">Gestión</span>
                                        </a>
                                    </router-link>
                                    <router-link active-class="active" tag="li" to="/cuerpos-academicos/miembros">
                                        <a>
                                            <span class="sub-item">Miembros</span>
                                        </a>
                                    </router-link>
                                    <router-link active-class="active" tag="li" to="/cuerpos-academicos/lgacs">
                                        <a>
                                            <span class="sub-item">LGAC</span>
                                        </a>
                                    </router-link>
                                    <router-link active-class="active" tag="li" to="/cuerpos-academicos/evaluaciones">
                                        <a>
                                            <span class="sub-item">Evaluaciones</span>
                                        </a>
                                    </router-link>
                                    <router-link active-class="active" tag="li" to="/cuerpos-academicos/ayudas">
                                        <a>
                                            <span class="sub-item">Apoyos</span>
                                        </a>
                                    </router-link>
                                    <router-link active-class="active" tag="li" to="/cuerpos-academicos/redes">
                                        <a>
                                            <span class="sub-item">Redes</span>
                                        </a>
                                    </router-link>
                                </ul>
                            </b-collapse>
                        </router-link>
                        <router-link class="nav-item" active-class="active" tag="li" to="/prodep">
                            <a v-b-toggle.accordion-4>
                                <i style="padding-right: 5px; font-size: 20px;" class="fa fa-university"></i>
                                <p>PRODEP</p>
                                <span class="caret"></span>
                            </a>
                            <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel" class="mt-2">
                                <ul class="nav nav-collapse">
                                    <router-link  active-class="active" tag="li" to="/prodep">
                                        <a>
                                            <span class="sub-item">Gestión</span>
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
                                <i style="padding-right: 5px; font-size: 20px;" class="fa fa-laptop"></i>
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
                                <i style="padding-right: 5px; font-size: 20px;" class="fa fa-podcast"></i>
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
                                <i style="padding-right: 5px; font-size: 20px;" class="fa fa-building"></i>
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
                                <i style="padding-right: 5px; font-size: 20px;" class="fa fa-brain"></i>
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
                                <i style="padding-right: 5px; font-size: 20px;" class="fa fa-user-graduate"></i>
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
                        {{year}}, hecho con <i class="fa fa-heart heart text-danger"></i> por <a href="https://sanchezcarlosjr.com/">alumnos de UABC</a>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"
    @Component
    export default class EntryComponent extends Vue {
        year = new Date().getFullYear();
        mounted() {
            console.log('%c Interested in working with us?\n See https://www.sanchezcarlosjr.com', 'background: #222; color: #bada55');
        }
    }
</script>
