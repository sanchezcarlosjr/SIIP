<!-- Sidebar -->
	<div class="sidebar sidebar-style-2">

		<div class="sidebar-wrapper scrollbar scrollbar-inner">
			<div class="sidebar-content">
				<div class="user">
					<center>
						<img src="/img/logo.png">
					</center>

				</div>
				<ul class="nav nav-primary">
					<li class="nav-item {{ (request()->is('/')) ? 'active' : '' }}" >
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
					<li class="nav-item {{ (request()->segment(1) == 'academic-units') ? 'active' : '' }}">
						<a data-toggle="collapse" href="#sidebar">
							<i class="fa fa-address-card"></i>
							<p>Cuerpos Académicos</p>
							<span class="caret"></span>
						</a>
						<div class="collapse" id="sidebar">
							<ul class="nav nav-collapse">
								<li class="{{ (request()->is('academic-units')) ? 'active' : '' }}">
									<a  href="{{ url('/academic-units/') }}">
										<span class="sub-item">Consulta</span>
									</a>
								</li>
								<li class="{{ (request()->is('academic-units/gestion')) ? 'active' : '' }}">
									<a href="{{ url('/academic-units/gestion') }}">
										<span class="sub-item">Gestión CA</span>
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
										<span class="sub-item">Evaluación CA</span>
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
							<i class="fa fa-university"></i>
							<p>PRODEP</p>
							<span class="caret"></span>
						</a>
						<div class="collapse" id="sidebar2">
							<ul class="nav nav-collapse">
								<li>
									<a href="">
										<span class="sub-item">Evaluación</span>
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
							<i class="fa fa-laptop"></i>
							<p>SNI</p>
							<span class="caret"></span>
						</a>
						<div class="collapse" id="sidebar3">
							<ul class="nav nav-collapse">
								<li>
									<a href="">
										<span class="sub-item">Gestión SNI</span>
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
							<i class="fa fa-podcast"></i>
							<p>Profesor-Investigador</p>
							<span class="caret"></span>
						</a>
						<div class="collapse" id="sidebar4">
							<ul class="nav nav-collapse">
								<li>
									<a href="">
										<span class="sub-item">Gestión</span>
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
							<i class="fa fa-building"></i>
							<p>Productividad Academica</p>
							<span class="caret"></span>
						</a>
						<div class="collapse" id="sidebar5">
							<ul class="nav nav-collapse">
								<li>
									<a href="">
										<span class="sub-item">Gestión</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Artículo</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Libros</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Innovación</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Productividad Artística</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Prototipos</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Informes Tecnicos</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Dirección Individualizada</span>
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
							<i class="icon-organization icons"></i>
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
										<span class="sub-item">Asesorías</span>
									</a>
								</li>
								<li>
									<a href="">
										<span class="sub-item">Solicitudes de Invención</span>
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
							<i class="icon-graduation icons"></i>
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
										<span class="sub-item">Evaluación</span>
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

