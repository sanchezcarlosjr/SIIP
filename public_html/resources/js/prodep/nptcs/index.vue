<template>
    <siip-table
        :fields="fields"
        :resource="apiResource"
        :spanishResourceName="spanishResourceName"
        :schema="schema"
        :tableTitle="tableTitle"
        :toolbar="toolbar"
        communicationType="GraphQL"
    ></siip-table>
</template>

<script lang="ts" src="./nptcs.page.ts"></script>
<style lang="scss" scoped src="./nptcs.page.scss"></style>
