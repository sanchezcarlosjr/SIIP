@extends('layouts.page')
@section('head')
	<script src="https://rawcdn.githack.com/FuriosoJack/TableHTMLExport/v2.0.0/src/tableHTMLExport.js"></script>
	<link rel="stylesheet" type="text/css" href="http://www.shieldui.com/shared/components/latest/css/light/all.min.css" />
	<script type="text/javascript" src="http://www.shieldui.com/shared/components/latest/js/shieldui-all.min.js"></script>
	<script type="text/javascript" src="http://www.shieldui.com/shared/components/latest/js/jszip.min.js"></script>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<style>
		.bar {
			margin-bottom: 10px;
			float: right;
			padding: 10px;
		}

		.form-control {
			width: 99%;
			margin: auto;
		}

		#submit {
		background-color: #34cc34;
		border: none;
		color: white;
		padding: 11.5px 25px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 14px;

		cursor: pointer;
		border-radius: 3px;
		}
		.btn-group-xs > .btn, .btn-xs {
			padding: .25rem .4rem;
			font-size: .875rem;
			line-height: .5;
			border-radius: .2rem;
		}
			.table-responsive {
				margin: 30px 0;
			}
			.table-wrapper {
				background: #fff;
				padding: 20px 25px;
				border-radius: 3px;
				min-width: 1000px;
				box-shadow: 0 1px 1px rgba(0,0,0,.05);
			}
			.table-title {        
				padding-bottom: 15px;
				background:	#027f45;
				color: #fff;
				padding: 16px 30px;
				min-width: 100%;
				margin: -20px -25px 10px;
				border-radius: 3px 3px 0 0;
			}
			.table-title h2 {
				margin: 5px 0 0;
				font-size: 24px;
			}
			.table-title .btn-group {
				float: right;
			}
			.table-title .btn {
				color: #fff;
				float: right;
				font-size: 13px;
				border: none;
				min-width: 50px;
				border-radius: 2px;
				border: none;
				outline: none !important;
				margin-left: 10px;
			}
			.table-title .btn i {
				float: left;
				font-size: 21px;
				margin-right: 5px;
			}
			.table-title .btn span {
				float: left;
				margin-top: 2px;
			}
			table.table tr th, table.table tr td {
				border-color: #e9e9e9;
				padding: 12px 15px;
				vertical-align: middle;
			}
			table.table tr th:first-child {
				width: 60px;
			}
			table.table tr th:last-child {
				width: 100px;
			}
			table.table-striped tbody tr:nth-of-type(odd) {
				background-color: #fcfcfc;
			}
			table.table-striped.table-hover tbody tr:hover {
				background: #f5f5f5;
			}
			table.table th i {
				font-size: 13px;
				margin: 0 5px;
				cursor: pointer;
			}	
			table.table td:last-child i {
				opacity: 0.9;
				font-size: 22px;
				margin: 0 5px;
			}
			table.table td a {
				font-weight: bold;
				color: #566787;
				display: inline-block;
				text-decoration: none;
				outline: none !important;
			}
			table.table td a:hover {
				color: #2196F3;
			}
			table.table td a.edit {
				color: #FFC107;
			}
			table.table td a.delete {
				color: #F44336;
			}
			table.table td i {
				font-size: 19px;
			}
			table.table .avatar {
				border-radius: 50%;
				vertical-align: middle;
				margin-right: 10px;
			}
		
			.hint-text {
				float: left;
				margin-top: 10px;
				font-size: 13px;
			}    
		
			/* Modal styles */
			.modal .modal-dialog {
				max-width: 400px;
			}
			.modal .modal-header, .modal .modal-body, .modal .modal-footer {
				padding: 20px 30px;
			}
			.modal .modal-content {
				border-radius: 3px;
				font-size: 14px;
			}
			.modal .modal-footer {
				background: #ecf0f1;
				border-radius: 0 0 3px 3px;
			}
			.modal .modal-title {
				display: inline-block;
			}
			.modal .form-control {
				border-radius: 2px;
				box-shadow: none;
				border-color: #dddddd;
			}
			.modal textarea.form-control {
				resize: vertical;
			}
			.modal .btn {
				border-radius: 2px;
				min-width: 100px;
			}	
			.modal form label {
				font-weight: normal;
			}	
			</style>
			<script>
			$(document).ready(function(){
				// Activate tooltip
				$('[data-toggle="tooltip"]').tooltip();
				
				// Select/Deselect checkboxes
				var checkbox = $('table tbody input[type="checkbox"]');
				$("#selectAll").click(function(){
					if(this.checked){
						checkbox.each(function(){
							this.checked = true;                        
						});
					} else{
						checkbox.each(function(){
							this.checked = false;                        
						});
					} 
				});
				checkbox.click(function(){
					if(!this.checked){
						$("#selectAll").prop("checked", false);
					}
				});
			});
			</script>
@stop
@section('page-title')
    Usuarios
@stop
@section('card-title')
    Lista de Usuarios
@stop
@section('card')

								<!-- ************************************************** Nuevo ************************************************** -->
								<div class="bar"><a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"><i class="material-icons"></i> <span>Agregar Usuario</span></a></div>								
								
								<div class="table-responsive">

									<table class="table table-bordered table-head-bg-warning table-bordered-bd-warning mt-4" id="Tabla_Usuarios">

											<input class="form-control mb-4" id="tableSearch" type="text" placeholder="Buscar Usuario">
										<thead>
										<tr>
											<th id="nombre" style="width: 20%">Nombre</th>
											<th id="email" style="width: 20%">Correo Electrónico</th>
											<th id="rol" style="width: 15%">Rol</th>
											<th id="campus" style="width: 15%">Campus</th>
											<th id="unidad_academica" style="width: 20%">Unidad Académica</th>
											<th id="accion" style="width: 8%">Acción</th>
										</tr>
										</thead>
										<tbody id="myTable">
											@foreach ($users as $user)
												<tr>
													<td>{{$user->name}}</td>
													<td>{{$user->email}}</td>
													<td>{{$user->role}}</td>
													<td>{{$user->campus}}</td>
													<td>{{$user->unit}}</td>
													<td id="accion">
														<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
														<a data-target='#deleteEmployeeModal' data-id="{{ $user->id }}" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													</td>
												</tr>
											@endforeach
										</tbody>
									</table>

									<div class="bar">
										<!-- ><a href="#" id="Boton_Excel" onClick="javascript:fnExcelReport();" class="btn btn-success" ><i class="material-icons"></i> <span></span>Descargar Excel</span></a></div> -->
										<button id="submit" class="export-btn-excel" ><i class="fas fa-file-excel"></i> Descargar Excel</button>
										<button id="exportButton" class="btn btn-success" ><i class="fas fa-file-pdf"></i> Descargar PDF</button>
									</div>
								</div>
								
								<!-- Add Modal HTML Aqui es donde se modifican las formas de agregar -->
								<div id="addEmployeeModal" class="modal fade">
									<div class="modal-dialog">
										<div class="modal-content">
											<form  action="/users" method="POST">
												{{ csrf_field() }}
												<div class="modal-header">						
													<h4 class="modal-title">Agregar Usuario</h4>
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
												</div>
												<div class="modal-body">					
													<div class="form-group">
														<label>Nombre</label>
														<input name="name" type="text" class="form-control" required>
													</div>
													<div class="form-group">
														<label>Correo Electrónico</label>
														<input title="please enter a valid email" pattern="^[a-z0-9._%+-]+@uabc.edu.mx$" name="email" class="form-control" required>
													</div>
													<div class="form-group">
														<label>Rol</label>
														<input name="role" class="form-control" required></input>
													</div>
													<div class="form-group">
														<label>Campus</label>
														<input name="campus" type="text" class="form-control" required>
													</div>	
													<div class="form-group">
														<label>Unidad Académica</label>
														<input  name="unit" type="text" class="form-control" required>
													</div>					
												</div>
												<div class="modal-footer">
													<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar">
													<input type="submit" class="btn btn-success" value="Agregar">
												</div>
											</form>
										</div>
									</div>
								</div>
								<!-- Edit Modal HTML Aqui es donde se modifican las formas de edicion -->
								
								<!-- Delete Modal HTML -->
								<div id="deleteEmployeeModal" class="modal fade">
									<div class="modal-dialog">
										<div class="modal-content">
											<form>
												<div class="modal-header">						
													<h4 class="modal-title">Eliminar Usuario</h4>
													<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
												</div>
												<div class="modal-body">					
													<p>¿Realmente desea eliminar a este usuario?</p>
													<p class="text-warning"><small>Esta accion no puede ser revertida.</small></p>
												</div>
												<div class="modal-footer">
													<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancelar">
													<input type="submit" class="btn btn-danger" value="Eliminar">
												</div>
											</form>
										</div>
									</div>
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
        $("#exportButton").click(function () {
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