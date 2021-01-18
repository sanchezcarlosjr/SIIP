<template>
    <siip-table
       :toolbar="toolbar"
       :spanishResourceName="spanishResourceName"
       :tableTitle="tableTitle"
       :fields="fields"
       communicationType="GraphQL"
       :resource="apiResource"
       :filter="defaultCriteria"
       >
    </siip-table>
</template>

<script src="./lgac.page.ts" lang="ts"></script>
<style src="./lgac.page.scss" scoped lang="scss"></style>
