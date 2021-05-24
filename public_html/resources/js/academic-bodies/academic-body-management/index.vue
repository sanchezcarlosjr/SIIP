<template>
  <siip-table
      :resource="resource"
      :fields="fields"
      :filter="criteria"
      :formSchemas="formSchemas"
      :links="links"
      @created-element="createdElement"
  >
    <template #statistics>
      <academic-body-statistics/>
    </template>
  </siip-table>
</template>

<script lang="ts" src="./academic-body-management.page.ts"></script>
