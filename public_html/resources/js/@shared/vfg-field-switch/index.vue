<template>
    <b-form-checkbox size="lg" v-model="checked=value" switch>
       {{ checked ? schema.textOn : schema.textOff }}
    </b-form-checkbox>
</template>
<script src="./vfg-field-switch.ts" lang="ts"></script>
<style src="./vfg-field-switch.scss" scoped lang="scss"></style>
