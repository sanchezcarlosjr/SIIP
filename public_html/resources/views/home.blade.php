<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>SIIIP UABC - Coordinación General de Investigación y Posgrado</title>
    <meta name="description" content="Sistema Institucional de Indicadores de Investigación y Posgrado de la Universidad Autónoma de Baja California.">
    <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport'/>
    <link rel="icon" href="{{asset('img/logo.png')}}" type="image/x-icon"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet">
    <!--
       Glad to meet you!
       © 2021 Universidad Autónoma de Baja California
       © 2021 sanchezcarlosjr.com <hello@sanchezcarlosjr.com>
    -->
    <meta property="og:locale" content="es_MX">
    <meta property="og:type" content="website">
    <meta property="og:title" content="SIIIP UABC - Coordinación General de Investigación y Posgrado">
    <meta property="og:description" content="Sistema Institucional de Indicadores de Investigación y Posgrado de la Universidad Autónoma de Baja California.">
    <meta property="og:url" content="">
    <meta property="og:site_name" content="SIIIP">
    <meta property="og:image" content="{{asset('img/banner.png')}}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/atlantis.css')}}">
    <link rel="stylesheet" href="{{asset('css/demo.css')}}">
    <link href="{{asset('css/app.css')}}" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
<div id="app" class="content">
    <entry-component>
        Cargando...
    </entry-component>
</div>
<script src="{{asset('js/app.js')}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js"></script>
</body>
</html>
