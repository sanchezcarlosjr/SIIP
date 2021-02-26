<template>
    <siip-table
        :toolbar="toolbar"
        :fields="fields"
        :filter="defaultCriteria"
        :resource="apiResource"
    ></siip-table>
</template>

<script src="./evaluations.page.ts" lang="ts"></script>
<style src="./evaluations.page.scss" scoped lang="scss"></style>
