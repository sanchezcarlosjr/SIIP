<template>
    <siip-table
        :fields="fields"
        :filter="defaultCriteria"
        :links="links"
        :resource="apiResource"
        :schema="schema"
        :toolbar="toolbar"
        @created-element="createdElement"
    >
        <template #statistics>
            <academic-body-statistics></academic-body-statistics>
        </template>
    </siip-table>
</template>

<script lang="ts" src="./academic-body-management.page.ts"></script>
<style lang="scss" scoped src="./academic-body-management.page.scss"></style>

