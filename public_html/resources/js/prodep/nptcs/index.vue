<template>
    <siip-table
      :testResource="testResource"
      :fields="fields"
      :filter="defaultCriteria"
      :resource="apiResource"
      :schema="schema"
      :toolbar="toolbar"
      :formSchemas="formSchemas"
    ></siip-table>
</template>

<script lang="ts" src="./nptcs.page.ts"></script>
<style lang="scss" scoped src="./nptcs.page.scss"></style>
