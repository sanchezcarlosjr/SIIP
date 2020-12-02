@extends('layouts.page')
@section('head')
	<script src="https://rawcdn.githack.com/FuriosoJack/TableHTMLExport/v2.0.0/src/tableHTMLExport.js"></script>
	<link rel="stylesheet" type="text/css" href="http://www.shieldui.com/shared/components/latest/css/light/all.min.css" />
	<script type="text/javascript" src="http://www.shieldui.com/shared/components/latest/js/shieldui-all.min.js"></script>
	<script type="text/javascript" src="http://www.shieldui.com/shared/components/latest/js/jszip.min.js"></script>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
@stop
@section('page-title')
    Usuarios
@stop
@section('card')
 <div id="app" class="content">
    <users-component></users-component>
 </div>  
@stop
@section('scripts')
<script>
	$(document).ready(function(){
   $(".export-btn-excel").click(function(){  
     $("#Tabla_Usuarios").tableHTMLExport({
		ignoreColumns: "#accion",
      	type:'csv',
      	filename:'Usuarios.csv',
    });
  });
});
</script>

<script type="text/javascript">
    jQuery(function ($) {
        $("#export-btn-pdf").click(function () {
            // parse the HTML table element having an id=exportTable
            var dataSource = shield.DataSource.create({
                data: "#Tabla_Usuarios",
                schema: {
                    type: "table",
                    fields: {
                        "Nombre": { type: String },
						"Correo Electrónico": { type: String },
                        "Rol": { type: String },
						"Campus": { type: String },
						"Unidad Académica": { type: String }
                    }
                }
            });

            // when parsing is done, export the data to PDF
            dataSource.read().then(function (data) {
                var pdf = new shield.exp.PDFDocument({
                    author: "SIIP",
                    created: new Date()
                });

                pdf.addPage("letter", "Landscape");

                pdf.table(
                    20,
                    20,
                    data,
                    [
                        { field: "Nombre", title: "Nombre", width: 150 },
                        { field: "Correo Electrónico", title: "Correo", width: 150 },
                        { field: "Rol", title: "Rol", width: 150 },
						{ field: "Campus", title: "Campus", width: 150 },
						{ field: "Unidad Académica", title: "Unidad", width: 150 }
                    ],
                    {
                        margins: {
                            top: 10,
                            left: 10
                        }
                    }
                );

                pdf.saveAs({
                    fileName: "Usuarios"
                });
            });
        });
    });
</script>


<script>$(document).ready(function(){
	$("#tableSearch").on("keyup", function() {
	  var value = $(this).val().toLowerCase();
	  $("#myTable tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	  });
	});
  });</script>
@stop