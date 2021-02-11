<template>
    <siip-table
        :toolbar="toolbar"
        :schema="schema"
        :tableTitle="tableTitle"
        :fields="fields"
        communicationType="GraphQL"
        :resource="apiResource"
    ></siip-table>
</template>

<script src="./example.page.ts" lang="ts"></script>
<style src="./example.page.scss" scoped lang="scss"></style>
