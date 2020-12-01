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