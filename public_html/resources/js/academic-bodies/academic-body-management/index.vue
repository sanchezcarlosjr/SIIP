<template>
    <siip-table
    :toolbar="toolbar"
    :links="links"
    :schema="schema"
    :tableTitle="tableTitle"
    :fields="fields"
    :filter="defaultCriteria"
    communicationType="GraphQL"
    :resource="apiResource"
    ></siip-table>
</template>

<script src="./academic-body-management.page.ts" lang="ts"></script>
<style src="./academic-body-management.page.scss" scoped lang="scss"></style>

