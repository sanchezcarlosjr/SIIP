<template>
    <div class="container">
			<div class="card-header">
					<b-container style="padding: 0" class="card-title">
						<b-row>
							<b-col style="padding: 0" cols="7">Gestión CA </b-col>
							<b-col cols="3"><button class="btn btn-success" size="sm"  data-toggle="modal"><i class="material-icons"></i> <span>Agregar cuerpo académico</span></button></b-col>
							<b-col cols="2"><b-form-select v-model="citySelected" :options="cities"></b-form-select></b-col>
						</b-row>
					</b-container>
       		 </div>			
		<input  class="form-control mb-4" id="tableSearch" type="text" placeholder="Buscar CA">
								<div  v-if="citySelected === 0" class="table-responsive" id="Ensenada">
									<table class="table table-bordered table-head-bg-warning table-bordered-bd-warning mt-4" id="Tabla_Ensenada">
										<thead>
										<tr>
											<th id="clave_promep">Clave PROMEP</th>
											<th id="nombre_cuerpo_academico">Nombre</th>
											<th id="grado_consolacion">Grado de Consolación</th>
											<th id="vigencia_inicio">Inicio</th>
											<th id="vigencia_termino">Término</th>
											<th id="responsable_ca">Líder</th>
											<th id="email_responsable">Correo</th>
											<th id="accion">Acción</th>
										</tr>
										</thead>
										<tbody id="myTable">

											<tr>
												<td>UABC-CA-281</td>
												<td>ARTE, TECNOLOGÍA Y SOCIEDAD CONTEMPORÁNEA</td>
												<td>EN FORMACIÓN</td>
												<td>11/7/2016</td>
												<td>11/25/2022</td>
												<td>ÁLVARO GABRIEL DÍAZ RODRÍGUEZ</td>
												<td>alvaro16@hotmail.com</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-259</td>
												<td>AGRICULTURA PROTEGIDA EN ZONAS ARIDAS</td>
												<td>EN FORMACIÓN</td>
												<td>11/26/2018</td>
												<td>11/25/2021</td>
												<td>AURELIA MENDOZA GOMEZ</td>
												<td>aurelia.mendoza@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-260</td>
												<td>AGROBIOTECNOLOGÍA</td>
												<td>EN FORMACIÓN</td>
												<td>11/26/2018</td>
												<td>11/25/2021</td>
												<td>SALVADOR ORDAZ SILVA </td>
												<td>jorge.delgadillo@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-202</td>
												<td>AGRONEGOCIOS</td>
												<td>EN FORMACIÓN</td>
												<td>12/20/2017</td>
												<td>12/19/2020</td>
												<td>LUIS ALBERTO MORALES ZAMORANO</td>
												<td>lmorales@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-130 </td>
												<td>AGUA Y AMBIENTE</td>
												<td>EN CONSOLIDACIÓN</td>
												<td>12/20/2017</td>
												<td>12/19/2020</td>
												<td>LUIS WALTER DAESSLE HEUSER  </td>
												<td>walter@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-281</td>
												<td>ARTE, TECNOLOGÍA Y SOCIEDAD CONTEMPORÁNEA</td>
												<td>EN FORMACIÓN</td>
												<td>11/7/2016</td>
												<td>11/25/2022</td>
												<td> ÁLVARO GABRIEL DÍAZ RODRÍGUEZ</td>
												<td>alvaro16@hotmail.com</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-300</td>
												<td>ARQUITECTURA, MEDIO AMBIENTE Y ENERGIA</td>
												<td>EN FORMACIÓN</td>
												<td>12/20/2017</td>
												<td>12/19/2020</td>
												<td>JULIO CESAR RINCON MARTINEZ</td>
												<td>julio.rincon@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-281</td>
												<td>ARTE, TECNOLOGÍA Y SOCIEDAD CONTEMPORÁNEA</td>
												<td>EN FORMACIÓN</td>
												<td>11/7/2016</td>
												<td>11/25/2022</td>
												<td> ÁLVARO GABRIEL DÍAZ RODRÍGUEZ</td>
												<td>alvaro16@hotmail.com</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-246</td>
												<td>BIONANOINGENIERÍA</td>
												<td>CONSOLIDADO</td>
												<td>12/20/2017</td>
												<td>12/19/2022</td>
												<td> DORA LUZ FLORES GUTIERREZ  </td>
												<td>dflores@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-136</td>
												<td>BIOLOGÍA Y CULTIVO DE MOLUSCOS</td>
												<td>EN CONSOLIDACIÓN</td>
												<td>11/26/2018</td>
												<td>11/25/2021</td>
												<td>ZAUL GARCÍA ESQUIVEL</td>
												<td>roberto.searcy@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

										</tbody>
									</table>
								</div>
								<div v-if="citySelected === 1"  class="table-responsive" id="Mexicali">
									<table class="table table-bordered table-head-bg-warning table-bordered-bd-warning mt-4" id="Tabla_Mexicali">
										<thead>
										<tr>
											<th id="clave_promep">Clave PROMEP</th>
											<th id="nombre_cuerpo_academico">Nombre</th>
											<th id="grado_consolacion">Grado de Consolación</th>
											<th id="vigencia_inicio">Inicio</th>
											<th id="vigencia_termino">Término</th>
											<th id="responsable_ca">Líder</th>
											<th id="email_responsable">Correo</th>
											<th id="accion">Acción</th>
										</tr>
										</thead>
										<tbody id="myTable">

											<tr>
												<td>UABC-CA-236</td>
												<td>ADMINISTRACIÓN E INNOVACIÓN ESTRATÉGICA </td>
												<td>EN FORMACIÓN</td>
												<td>11/26/2019</td>
												<td>11/25/2022</td>
												<td>ADELAIDA FIGUEROA VILLANUEVA</td>
												<td>afigueroa@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-236</td>
												<td>ADMINISTRACIÓN E INNOVACIÓN ESTRATÉGICA</td>
												<td>EN FORMACIÓN</td>
												<td>11/26/2019</td>
												<td>11/25/2022</td>
												<td>ADELAIDA FIGUEROA VILLANUEVA</td>
												<td>afigueroa@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-239</td>
												<td>ADOPCIÓN DE LAS TIC´S Y MERCADOTECNICA PARA LA COMPETITIVIDAD DE LAS ORGANIZACIONES</td>
												<td>EN FORMACIÓN</td>
												<td>11/26/2019</td>
												<td>11/25/2022</td>
												<td>SANDRA JULIETA SALDIVAR GONZÁLEZ</td>
												<td>yuly@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-236</td>
												<td>ADMINISTRACIÓN E INNOVACIÓN ESTRATÉGICA</td>
												<td>EN FORMACIÓN</td>
												<td>11/26/2019</td>
												<td>11/25/2022</td>
												<td>ADELAIDA FIGUEROA VILLANUEVA</td>
												<td>afigueroa@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-103</td>
												<td>AGROECOSISTEMAS DE ZONAS ÁRIDAS</td>
												<td>EN CONSOLIDACIÓN</td>
												<td>11/26/2018</td>
												<td>11/25/2021</td>
												<td>CARLOS ENRIQUE AIL CATZIM  </td>
												<td>carlos.ail@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-135</td>
												<td>AGUA Y SUELO</td>
												<td>CONSOLIDADO</td>
												<td>12/7/2015</td>
												<td>12/6/2020</td>
												<td> ROBERTO SOTO ORTIZ</td>
												<td>roberto_soto@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-172</td>
												<td>BIOINFORMATICA Y BIOFOTONICA</td>
												<td>EN CONSOLIDACIÓN</td>
												<td>12/20/2017</td>
												<td>12/19/2020</td>
												<td>CARLOS VILLA ANGULO</td>
												<td>villac@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-114</td>
												<td>BIOINGENIERÍA Y SALUD AMBIENTAL</td>
												<td>CONSOLIDADO</td>
												<td>12/20/2017</td>
												<td>12/19/2022</td>
												<td>MARCO ANTONIO REYNA CARRANZA</td>
												<td>mreyna@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-302</td>
												<td>BIOINGENIERIA Y SISTEMAS ELECTROQUIMICOS </td>
												<td>EN FORMACIÓN</td>
												<td>12/20/2017</td>
												<td>12/19/2020</td>
												<td>JUAN CARLOS GARCIA GALLEGOS  </td>
												<td>juan.carlos.garcia.gallegos@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-24</td>
												<td>BIOLOGIA CELULAR Y MOLECULAR</td>
												<td>EN FORMACIÓN</td>
												<td>11/26/2018</td>
												<td>25/112021</td>
												<td>NICOLAS ADDIEL SERAFIN HIGUERA</td>
												<td>nserafin@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

										</tbody>
									</table>

								</div>
								<div v-if="citySelected === 2"  class="table-responsive" id="Tijuana">
									<table class="table table-bordered table-head-bg-warning table-bordered-bd-warning mt-4" id="Tabla_Tijuana">
										<thead>
										<tr>
											<th id="clave_promep">Clave PROMEP</th>
											<th id="nombre_cuerpo_academico">Nombre</th>
											<th id="grado_consolacion">Grado de Consolación</th>
											<th id="vigencia_inicio">Inicio</th>
											<th id="vigencia_termino">Término</th>
											<th id="responsable_ca">Líder</th>
											<th id="email_responsable">Correo</th>
											<th id="accion">Acción</th>
										</tr>
										</thead>
										<tbody id="myTable">

											<tr>
												<td>UABC-CA-252</td>
												<td>ADMINISTRACIÓN EN: COMPETITIVIDAD INNOVACIÓN Y CONOCIMIENTO</td>
												<td>EN FORMACIÓN</td>
												<td>12/20/2017</td>
												<td>12/19/2020</td>
												<td>LOURDES EVELYN APODACA DEL ANGEL</td>
												<td>lourdesapodaca@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>

											<tr>
												<td>UABC-CA-256</td>
												<td>ADMINISTRACIÓN Y GESTIÓN DE PROYECTOS</td>
												<td>EN FORMACIÓN</td>
												<td>12/20/2017</td>
												<td>12/19/2020</td>
												<td>ANGELICA REYES MENDOZA</td>
												<td>angelita@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>
											<tr>
												<td>UABC-CA-193</td>
												<td>ADMINISTRACIÓN Y GESTIÓN DEL CONOCIMIENTO EN ENTORNOS GLOBALIZADOS</td>
												<td>EN FORMACIÓN</td>
												<td>12/20/2017</td>
												<td>12/19/2020</td>
												<td>MARÍA ELIZABETH OJEDA ORTA </td>
												<td>raquelt@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>
											<tr>
												<td>UABC-CA-261</td>
												<td>ANTROPOMETRÍA Y BIOINGENIERÍA EN SALUD</td>
												<td>NO RECONOCIDO</td>
												<td>12/7/2015</td>
												<td>12/6/2018</td>
												<td>FRANCISCO MESA LINARES</td>
												<td>fmesa@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>
											<tr>
												<td>UABC-CA-215</td>
												<td>APOYO AL AUTO-APRENDIZAJE</td>
												<td>EN FORMACIÓN</td>
												<td>11/26/2018</td>
												<td>11/25/2021</td>
												<td>ROBERTO JAVIER GUERRERO MORENO</td>
												<td>rjgm76@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>
											<tr>
												<td>UABC-CA-287</td>
												<td>BIOFARMACIA </td>
												<td>EN FORMACIÓN</td>
												<td>12/20/2017</td>
												<td>12/19/2020</td>
												<td>JOSE MANUEL  CORNEJO BRAVO </td>
												<td>jmcornejo@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>
											<tr>
												<td>UABC-CA-192</td>
												<td>ADMINISTRACIÓN EN: COMPETITIVIDAD INNOVACIÓN Y CONOCIMIENTO</td>
												<td>EN FORMACIÓN</td>
												<td>12/20/2017</td>
												<td>12/19/2020</td>
												<td>LOURDES EVELYN APODACA DEL ANGEL</td>
												<td>lourdesapodaca@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>
											<tr>
												<td>UABC-CA-192</td>
												<td>BIOINGENIERÍA APLICADA</td>
												<td>EN FORMACIÓN</td>
												<td>12/20/2017</td>
												<td>12/19/2020</td>
												<td>ANA LETICIA IGLESIAS</td>
												<td>aiglesias@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>
											<tr>
												<td>UABC-CA-218</td>
												<td>BIOLOGÍA Y PATOLOGÍA DE LAS MUCOSAS</td>
												<td>EN FORMACIÓN</td>
												<td>11/26/2018</td>
												<td>11/25/2021</td>
												<td>OFELIA CANDOLFI ARBALLO</td>
												<td>ocandolfi@uabc.edu.mx</td>
												<td id="accion">
													<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
													<a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
													<a href="#" class="search" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xe8b6;</i></a>
												</td>
											</tr>
											<tr>
												<td>UABC-CA-34</td>
												<td>BIOLÓGICO-FARMACÉUTICO</td>
												<td>EN CONSOLIDACIÓN </td>
												<td>12/20/2017</td>
												<td>12/19/2020</td>
												<td>MARCO ANTONIO RAMOS IBARRA</td>
												<td>mramos@uabc.edu.mx</td>
												<td id="accion">
												    <a ><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
                                                    <a class="delete"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
												</td>
											</tr>

										</tbody>
									</table>

								</div>
    </div>
</template>

<script>
    export default {
		data() {
			
			return {
				citySelected: 0,
				cities: [
					{ value: 0, text: 'Ensenada' },
					{ value: 1, text: 'Mexicali' },
					{ value: 2, text: 'Tijuana' },
				]
			}
		},
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
