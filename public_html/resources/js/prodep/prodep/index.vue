<template>
    <siip-table
        :toolbar="toolbar"
        :schema="schema"

        :fields="fields"
        :filter="defaultCriteria"

        :resource="apiResource"
    ></siip-table>
</template>

<script src="./prodep.page.ts" lang="ts"></script>
<style src="./prodep.page.scss" scoped lang="scss"></style>
