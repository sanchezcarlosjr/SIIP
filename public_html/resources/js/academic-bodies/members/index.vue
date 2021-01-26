<template>
    <siip-table
       :toolbar="toolbar"
       :spanishResourceName="spanishResourceName"
       :fields="fields"
       :filter="defaultCriteria"
       communicationType="GraphQL"
       :resource="apiResource"
       >
    </siip-table>
</template>

<script src="./members.page.ts" lang="ts"></script>
<style src="./members.page.scss" scoped lang="scss"></style>
