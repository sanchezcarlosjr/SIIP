<template>
    <siip-table
        :fields="fields"
        :filter="defaultCriteria"
        :resource="apiResource"
        :schema="schema"
        :toolbar="toolbar"
    ></siip-table>
</template>

<script lang="ts" src="./prodep.page.ts"></script>
<style lang="scss" scoped src="./prodep.page.scss"></style>
