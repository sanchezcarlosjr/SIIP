<template>
    <b-container>
        <b-row>
            <b-col cols="3">
                <b-form-group label="De" label-for="dropdown-form-period" @submit.stop.prevent>
                    <b-form-select @change="changeFrom" v-model="from" :options="periods"></b-form-select>
                </b-form-group>
            </b-col>
            <b-col cols="3">
                <b-form-group label="A" label-for="dropdown-form-period" @submit.stop.prevent>
                    <b-form-select @change="changeTo" v-model="to" :options="periods"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="text-center">
            <b-col>
                <bar-chart v-if="!$apollo.loading" :chart-data="sniByLevel.data"
                           :options="sniByLevel.options"></bar-chart>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts" src="./statistics.page.ts"></script>
<style lang="scss" scoped src="./statistics.page.scss"></style>
