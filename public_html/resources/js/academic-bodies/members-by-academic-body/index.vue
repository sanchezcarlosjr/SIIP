<template>
    <siip-table
       :toolbar="toolbar"
       :schema="schema"
       :infoVariant="infoVariant"
       :spanishResourceName="spanishResourceName"

       :fields="fields"
       :filter="defaultCriteria"

       :resource="apiResource"
       >
    </siip-table>
</template>

<script src="./members.page.ts" lang="ts"></script>
<style src="./members.page.scss" scoped lang="scss"></style>
