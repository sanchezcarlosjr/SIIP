<template>
    <siip-table
        :toolbar="toolbar"
        :schema="schema"
        :tableTitle="tableTitle"
        :spanishResourceName="spanishResourceName"
        :fields="fields"
        communicationType="GraphQL"
        :resource="apiResource"
    ></siip-table>
</template>

<script src="./helps.page.ts" lang="ts"></script>
<style src="./helps.page.scss" scoped lang="scss"></style>
