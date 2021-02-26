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
            <b-container>
                <b-row class="text-center">
                    <b-col>
                        <p>Example heading <b-badge>New</b-badge></p>
                    </b-col>
                    <b-col>
                        <p>Example heading <b-badge>New</b-badge></p>
                    </b-col>
                    <b-col>
                        <p>Example heading <b-badge>New</b-badge></p>
                    </b-col>
                </b-row>
            </b-container>
        </template>
    </siip-table>
</template>

<script src="./academic-body-management.page.ts" lang="ts"></script>
<style src="./academic-body-management.page.scss" scoped lang="scss"></style>

