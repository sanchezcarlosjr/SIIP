<template>
    <siip-table
        :toolbar="toolbar"
        :tableTitle="tableTitle"
        :fields="fields"
        :filter="defaultCriteria"
        communicationType="GraphQL"
        :resource="apiResource"
    ></siip-table>
</template>

<script src="./evaluations.page.ts" lang="ts"></script>
<style src="./evaluations.page.scss" scoped lang="scss"></style>
