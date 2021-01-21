<template>
    <siip-table
        :toolbar="toolbar"
        
        :tableTitle="tableTitle"
        :fields="fields"
        communicationType="GraphQL"
        :resource="apiResource"
    ></siip-table>
</template>

<script src="./helps.page.ts" lang="ts"></script>
<style src="./helps.page.scss" scoped lang="scss"></style>
