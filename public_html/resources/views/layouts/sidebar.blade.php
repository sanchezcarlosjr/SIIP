<div class="sidebar sidebar-style-2">
		<div class="sidebar-wrapper scrollbar scrollbar-inner">
			<div class="sidebar-content">
				<div class="user">
					<center>
						<img src="img/logo.png">
					</center>
				</div>
				<ul class="nav nav-primary">
					<li class="nav-item {{ (request()->is('/')) ? 'active' : '' }}">
						<a href="{{ url('/') }}">
							<i class="fa fa-home"></i>
							<p>Inicio</p>
						</a>
					</li>
					<li class="nav-item {{ (request()->is('users')) ? 'active' : '' }}">
						<a href="{{ url('/users') }}">
							<i class="fa fa-users"></i>
							<p>Usuarios</p>
						</a>
					</li>
					<li class="nav-item">
						<a data-toggle="collapse" href="#sidebar">
							<i class="fa fa-address-card"></i>
							<p>Cuerpos Academicos</p>
							<span class="caret"></span>
						</a>
						<div class="collapse" id="sidebar">
							<ul class="nav nav-collapse">
								<li>
									<a  href="">
										<span class="sub-item">Consulta</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Gestion CA</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Miembros CA</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">LGAC</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Evaluacion CA</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Apoyo CA</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Redes</span>
									</a>
								</li>
							</ul>
						</div>
					</li>
					<li class="nav-item">
						<a data-toggle="collapse" href="#sidebar2">
							<i class="fa fa-project-diagram"></i>
							<p>PRODEP</p>
							<span class="caret"></span>
						</a>
						<div class="collapse" id="sidebar2">
							<ul class="nav nav-collapse">
								<li>
									<a href="">
										<span class="sub-item">Evaluacion</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Beneficios</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">NPTC</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Consultas</span>
									</a>
								</li>
							</ul>


						</div>
					</li>
					<li class="nav-item">
						<a data-toggle="collapse" href="#sidebar3">
							<i class="fa fa-book"></i>
							<p>SNI</p>
							<span class="caret"></span>
						</a>
						<div class="collapse" id="sidebar3">
							<ul class="nav nav-collapse">
								<li>
									<a href="">
										<span class="sub-item">Gestion SNI</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Consultas</span>
									</a>
								</li>
							</ul>
						</div>
					</li>
					<li class="nav-item">
						<a data-toggle="collapse" href="#sidebar4">
							<i class="fa fa-book"></i>
							<p>Profesor-Investigador</p>
							<span class="caret"></span>
						</a>
						<div class="collapse" id="sidebar4">
							<ul class="nav nav-collapse">
								<li>
									<a href="">
										<span class="sub-item">Gestion</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Alertas</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Consultas</span>
									</a>
								</li>
							</ul>
						</div>
					</li>
					<li class="nav-item">
						<a data-toggle="collapse" href="#sidebar5">
							<i class="fa fa-book"></i>
							<p>Productividad Academica</p>
							<span class="caret"></span>
						</a>
						<div class="collapse" id="sidebar5">
							<ul class="nav nav-collapse">
								<li>
									<a href="">
										<span class="sub-item">Gestion</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Articulo</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Libros</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Productividad Innovadora</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Productividad Artistica</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Prototipo</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Informes Tecnicos</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Direccion Individualizada</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Consultas</span>
									</a>
								</li>
							</ul>
						</div>
					</li>
					<li class="nav-item">
						<a data-toggle="collapse" href="#sidebar6">
							<i class="fa fa-book"></i>
							<p>Propiedad Intelectual</p>
							<span class="caret"></span>
						</a>
						<div class="collapse" id="sidebar6">
							<ul class="nav nav-collapse">
								<li>
									<a href="">
										<span class="sub-item">Actividades</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Asesorias</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Solicitudes de Invencion</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Solicitudes de Derechos de Autor</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Consultas</span>
									</a>
								</li>
							</ul>
						</div>
					</li>	
					<li class="nav-item">
						<a data-toggle="collapse" href="#sidebar7">
							<i class="fa fa-book"></i>
							<p>Posgrado</p>
							<span class="caret"></span>
						</a>
						<div class="collapse" id="sidebar7">
							<ul class="nav nav-collapse">
								<li>
									<a href="">
										<span class="sub-item">Programas Educativos</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Modificaciones</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Evaluacion</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">NAB</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Consultas</span>
									</a>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>

	