<template>
    <siip-table
       :toolbar="toolbar"
       :schema="schema"
       :spanishResourceName="spanishResourceName"
       :tableTitle="tableTitle"
       :fields="fields"
       communicationType="GraphQL"
       :resource="apiResource"
       >
    </siip-table>
</template>

<script src="./evaluations.page.ts" lang="ts"></script>
<style src="./evaluations.page.scss" scoped lang="scss"></style>
