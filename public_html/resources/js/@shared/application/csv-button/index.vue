<template>
    <a v-b-tooltip.hover class="pointer text-muted" style="font-size: 26px;" title="Descargar como CSV"
       @click="downloadAsCSV"><i class="fas fa-file-csv"></i></a>
</template>
<script src="./csv-button.button.ts" lang="ts"></script>
<style src="./csv-button.button.scss" scoped lang="scss"></style>
