<template>
    <b-form-file
        accept="application/pdf"
        browse-text="Navegar"
        drop-placeholder="Arrasta y suelta aquí..."
        placeholder="Elige un archivo o suelta aquí..."
        @change="upload"
    ></b-form-file>
</template>
<script lang="ts" src="./vfg-field-upload.ts"></script>
<style lang="scss" scoped src="./vfg-field-upload.scss"></style>
