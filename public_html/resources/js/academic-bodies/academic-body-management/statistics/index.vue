<template>
    <b-container>
        <b-row class="text-center">
            <b-col>
                <p>Cuerpos Académicos
                    <b-badge>5</b-badge>
                </p>
            </b-col>
            <b-col>
                <p>Profesores con SNI o PRODEP
                    <b-badge>4</b-badge>
                </p>
            </b-col>
            <b-col>
                <p>Profesores en CA
                    <b-badge>2</b-badge>
                </p>
            </b-col>
            <b-col>
                <p>PTC que no están en CA
                    <b-badge>3</b-badge>
                </p>
            </b-col>
        </b-row>
        <b-row class="text-center">
            <b-col>
                <bar-chart :chart-data="academicBodyByLevel.data" :options="academicBodyByLevel.options"></bar-chart>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts" src="./statistics.page.ts"></script>
<style lang="scss" scoped src="./statistics.page.scss"></style>
