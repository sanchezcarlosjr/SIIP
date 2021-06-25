<template>
    <div class="wrapper">
        <div class="main-panel">
            <div class="content">
                <div class="page-inner">
                    <div class="row">
                        <div class="col-md-12" style="display: flex;align-items: center; justify-content: center;">
                            <div class="card" style="width: 60%; border: 0; padding: 50px">
                                <div class="container">
                                    <div class="card-header">
                                        <b-container class="card-title">
                                            <b-row align-h="center">
                                                <b-col style="display: contents">
                                                    <b-img alt="Banner UABC" fluid
                                                           src="/img/banner.png"></b-img>
                                                </b-col>
                                            </b-row>
                                            <b-row align-h="center">
                                                <b-form>
                                                    <b-form-group
                                                        id="input-group-1"
                                                        label="No. de empleado o correo electrónico"
                                                        label-for="input-1"
                                                        style="padding: 10px 0;"
                                                    >
                                                        <b-form-input
                                                            id="input-1"
                                                            required
                                                            size="lg"
                                                            type="email"
                                                        ></b-form-input>
                                                    </b-form-group>
                                                    <b-form-group
                                                        id="input-group-2"
                                                        label="Contraseña"
                                                        label-for="input-1"
                                                        style="padding: 10px 0;"
                                                    >
                                                        <b-form-input
                                                            id="input-1"
                                                            required
                                                            size="lg"
                                                            type="password"
                                                        ></b-form-input>
                                                    </b-form-group>
                                                    <router-link :to="{ name: 'siiip'}" tag="a">
                                                        <b-button block size="lg" squared type="submit" variant="primary">
                                                            Iniciar sesión
                                                        </b-button>
                                                    </router-link>
                                                </b-form>
                                            </b-row>
                                        </b-container>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="container-fluid">
                    <div class="copyright ml-auto">
                        <a href="http://cimarron.uabc.mx/index.html" target="_blank">© UABC Coordinación General de
                            Investigación y Posgrado {{ year }}. Todos los Derechos Reservados.</a>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>
<script lang="ts" src="./login.page.ts"></script>
<style lang="scss" scoped src="./login.page.scss"></style>
