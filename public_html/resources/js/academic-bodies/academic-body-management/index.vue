<template>
    <siip-table
    :toolbar="toolbar"
    :links="links"
    :schema="schema"
    :fields="fields"
    :filter="defaultCriteria"
    communicationType="GraphQL"
    :resource="apiResource"
    >
        <template #statistics>
            <academic-body-statistics></academic-body-statistics>
        </template>
    </siip-table>
</template>

<script src="./academic-body-management.page.ts" lang="ts"></script>
<style src="./academic-body-management.page.scss" scoped lang="scss"></style>

