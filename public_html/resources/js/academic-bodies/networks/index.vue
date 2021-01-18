<template>
    <siip-table
        :toolbar="toolbar"
        :tableTitle="tableTitle"
        :fields="fields"
        communicationType="GraphQL"
        :resource="apiResource"
    ></siip-table>
</template>

<script src="./networks.page.ts" lang="ts"></script>
<style src="./networks.page.scss" scoped lang="scss"></style>
