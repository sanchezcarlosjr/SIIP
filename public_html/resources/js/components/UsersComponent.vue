<template>
    <div>
			<div class="card-header">
				<div class="card-title">
					Lista de usuarios
						<div class="bar">
							<button @click="typeOperation='Agregar Usuario'; setUser()" v-b-modal.add-user class="btn btn-success" data-toggle="modal"><i class="material-icons"></i> <span>Agregar Usuario</span></button>
							<button id="downloadExcel" class="btn btn-success export-btn-excel" ><i class="fas fa-file-excel"></i> Descargar Excel</button>
							<button id="exportButton" class="btn btn-success export-btn-excel" ><i class="fas fa-file-pdf"></i> Descargar PDF</button>
					</div>					
				</div>
			
       		 </div>					
		<input class="form-control mb-4" id="tableSearch" type="text" placeholder="Buscar Usuario">
        <div>
									<table  id="Tabla_Usuarios" class="table table-bordered table-head-bg-warning table-bordered-bd-warning mt-4">

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
                                            <tr v-for="user in users" :key="user.id">
                                                <td v-text="user.name"></td>
                                                <td v-text="user.email"></td>
                                                <td v-text="user.role"></td>
                                                <td v-text="user.campus"></td>
                                                <td v-text="user.unit"></td>
                                                <td id="accion">
                                                    <a @click="typeOperation='Editar usuario'; setUser(user)" v-b-modal.add-user class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modificar">&#xE254;</i></a>
                                                    <a @click="userToDelete=user.id"  v-b-modal.delete-user class="delete"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
                                                </td>
                                            </tr>
										</tbody>
									</table>

								</div>
								<b-modal id="delete-user" title="Eliminar Usuario" @ok="deleteUser()">
										<p>¿Realmente desea eliminar a este usuario?</p>
										<p class="text-warning"><small>Esta accion no puede ser revertida.</small></p>
								</b-modal>
							<b-modal
								id="add-user"
								:title="typeOperation"
								@ok="operate"
								ok-title="Guardar"
							>
								<b-form-group
									id="input-group-name"
									label="Nombre:"
									label-for="name"
								>
									<b-form-input
										id="name"
										v-model="userState.name"
										type="text"
										required
										placeholder="Ingresa nombre: "
									>
									</b-form-input>
								</b-form-group>
								<b-form-group
									id="input-group-email"
									label="Correo electrónico:"
									label-for="input-1"
								>
								<b-input-group append="@uabc.edu.mx">
									<b-form-input
										id="input-email"
										v-model="userState.email"
										type="email"
										required
										placeholder="Ingresa usuario uabc"
									></b-form-input>
								</b-input-group>
								</b-form-group>
								<b-form-group
									id="input-group-role"
									label="Rol:"
									label-for="input-role"
								>
									<b-form-input
										id="input-role"
										v-model="userState.role"
										type="text"
										required
										placeholder="Ingresa rol"
									></b-form-input>
								</b-form-group>
								<b-form-group
									id="input-group-campus"
									label="Campus:"
									label-for="input-campus"
								>
									<b-form-input
										id="input-1"
										v-model="userState.campus"
										type="text"
										required
										placeholder="Ingresa campus"
									></b-form-input>
								</b-form-group>
							<b-form-group
									id="input-group-unit"
									label="Unidad:"
									label-for="input-unit"
							>
								<b-form-input
										id="input-unit"
										v-model="userState.unit"
										type="text"
										required
										placeholder="Ingresa unidad"
								></b-form-input>
							</b-form-group>
							</b-modal>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                users:[],
				typeOperation: '',
				userState: {
					name: '',
					role: '',
					unit: '',
					campus: '',
					email: '',
				},
				userToDelete: -1,
            }
        },
        methods: {
		 setUser(userState =  {
					name: '',
					role: '',
					unit: '',
					campus: '',
					email: '',
				}) {
		  	this.userState = {...userState};
		 },
		 operate() {
		 	switch (this.typeOperation) {
				case 'Agregar Usuario': this.addUser(); break;
				case 'Editar usuario': this.update(); break;
			}
		 },
		 update() {
		 	axios.put(`api/users/${this.userState.id}`, {
				 ...this.userState,
				 email: this.userState.email.trim().concat('@uabc.edu.mx')
			 })
				.then(() => this.index())
				.then((response) => this.setUser())
				.catch((error) => console.warn(error.message));
		 },
		 addUser() {
			axios.post('api/users', {
				 ...this.userState,
				 email: this.userState.email.trim().concat('@uabc.edu.mx')
			 })
				.then((response) => this.setUser())
				.then(() => this.index())
				.catch((error) => console.warn(error));
		},
		    deleteUser() {
			    axios.delete(`api/users/${this.userToDelete}`)
					.then(() => this.userToDelete = -1)
					.then(() => this.index())
                    .catch(function (error) {
                        console.log(error);
                    });
			},
            index() {
                    let me = this;
                    axios.get('api/users').then((response) => {
                        me.users = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted() {
            this.index();
        }
    }
</script>
