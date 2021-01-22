<template>
    <siip-table
        :fields="fields"
        :resource="apiResource"
        :schema="schema"
        :tableTitle="tableTitle"
        :toolbar="toolbar"
        communicationType="GraphQL"
    ></siip-table>
</template>

<script lang="ts" src="./sni.page.ts"></script>
<style lang="scss" scoped src="./sni.page.scss"></style>
