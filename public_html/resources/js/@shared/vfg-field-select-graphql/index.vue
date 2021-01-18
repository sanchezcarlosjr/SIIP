<template>
    <div>
        <b-form-input @blur="handleBlur" :state="idState" trim :id="schema.model" debounce="100" v-model="value" :list="schema.model.concat('select')" ></b-form-input>
        <b-form-invalid-feedback :id="schema.model.concat('feedback')">
            Ingresa un recurso correcto.
        </b-form-invalid-feedback>
        <b-form-text :id="schema.model.concat('text')" >{{texts[value]}}</b-form-text>
        <b-form-datalist :id="schema.model.concat('select')" :options="options"></b-form-datalist>
    </div>  
</template>
<script src="./vfg-field-select-graphql.ts" lang="ts"></script>
<style src="./vfg-field-select-graphql.scss" scoped lang="scss"></style>
