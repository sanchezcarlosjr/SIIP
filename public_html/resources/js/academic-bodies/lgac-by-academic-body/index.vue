<template>
    <siip-table
       :toolbar="toolbar"
       :schema="schema"
       :spanishResourceName="spanishResourceName"
       :fields="fields"
       communicationType="GraphQL"
       :resource="apiResource"
       >
    </siip-table>
</template>

<script src="./lgac.page.ts" lang="ts"></script>
<style src="./lgac.page.scss" scoped lang="scss"></style>
