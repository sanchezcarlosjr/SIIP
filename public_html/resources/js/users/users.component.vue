<template>
    <div>
			<div class="card-header">
				<div class="card-title">
					Lista de usuarios
						<div class="bar">
							<button @click="typeOperation='Agregar Usuario'; setUser()" v-b-modal.add-user class="btn btn-success" data-toggle="modal"><i class="material-icons"></i> <span>Agregar Usuario</span></button>
                            <pdf-button></pdf-button>
                            <csv-button></csv-button>
					    </div>
				</div>
       		 </div>
		<input  v-model="query" class="form-control mb-4"  type="text" placeholder="Buscar Usuario">
        <div>
									<table  id="users-table" class="table table-bordered table-head-bg-warning table-bordered-bd-warning mt-4">
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
                                            <tr v-for="user in filteredUsers" :key="user.id">
                                                <td v-text="user.name"></td>
                                                <td v-text="user.email"></td>
                                                <td v-text="user.roles.role"></td>
                                                <td v-text="user.campus"></td>
                                                <td v-text="user.unit"></td>
                                                <td id="accion">
                                                    <a @click="typeOperation='Editar usuario'; setUser(user)" v-b-modal.add-user class="edit" data-toggle="modal"><i class="fa fa-edit"  data-toggle="tooltip" title="Modificar"></i></a>
                                                    <a @click="userToDelete=user.id"  v-b-modal.delete-user class="delete"><i class="fa fa-trash"  data-toggle="tooltip" title="Eliminar"></i></a>
                                                </td>
                                            </tr>
										</tbody>
									</table>
                                <b-skeleton-table
                                    v-if="users.length === 0"
                                    :rows="6"
                                    :columns="4"
                                    :table-props="{ bordered: false, striped: false }"
                                ></b-skeleton-table>

								</div>
								<b-modal id="delete-user" title="Eliminar Usuario" ok-title="Aceptar" cancel-title="Cancelar" @ok="deleteUser()">
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
									<b-form-select
										id="input-role"
										v-model="userState.roles.id"
										type="text"
										required
										placeholder="Ingresa rol"
										:options="roles"
									></b-form-select>
								</b-form-group>
								<b-form-group
                                    v-if="hasAccessToCampus"
                                    id="input-group-campus"
									label="Campus:"
									label-for="input-campus"
								>
                                    <b-form-select
                                        id="input-campus"
                                        v-model="userState.campus"
                                        type="text"
                                        required
                                        placeholder="Ingresa el campus"
                                        :options="campus"
                                    ></b-form-select>
                                </b-form-group>
							<b-form-group
									id="input-group-unit"
									label="Unidad:"
                                    v-if="hasAccessToAcademicUnit"
									label-for="input-unit"
							>
                                <b-form-select
                                    id="input-unit"
                                    v-model="userState.unit"
                                    type="text"
                                    required
                                    placeholder="Unidad Académica"
                                    :options="units"
                                ></b-form-select>
							</b-form-group>
							</b-modal>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                users:[],
                usersConverter: {},
                roles: [],
                campus: [
                    { value: 'NA', text: 'No aplica' },
                    { value: 'Ensenada', text: 'Ensenada'},
                    { value: 'Tijuana', text: 'Tijuana'},
                    { value: 'Mexicali', text: 'Mexicali'},
                    { value: 'Tecate', text: 'Tecate'},
                    { value: 'Valle de las palmas', text: 'Valle de las palmas'},
                    { value: 'San Quintín', text: 'San Quintín'}
                ],
                units: [
                    {value: 'NA', text: 'No aplica'},
                    {value: 'Facultad de Arquitectura y Diseño', text: 'Facultad de Arquitectura y Diseño'},
                    {value: 'Facultad de ciencias', text: 'Facultad de ciencias'},
                    {value: 'Facultad de Ciencias administrativas y sociales', text: 'Facultad de Ciencias administrativas y sociales'}
                ],
				typeOperation: '',
                query: '',
				userState: {
					name: '',
                    roles: {
					    id: 1,
                        role: ''
                    },
					unit: 'NA',
					campus: 'NA',
					email: '',
				},
				userToDelete: -1
            }
        },
        computed: {
            filteredUsers () {
                const query = this.query.toLowerCase();
                return this.users.filter((user) => user.indexOf(query) !== -1).map((user) => this.usersConverter[user]);
            },
            hasAccessToCampus () {
                return ['Responsable de Campus', 'Coordinador UA'].indexOf(this.userState.roles.role) !== -1;
            },
            hasAccessToAcademicUnit () {
                return ['Coordinador UA'].indexOf(this.userState.roles.role) !== -1;
            }
        },
        methods: {
		 setUser(userState =  {
					name: '',
					roles: {
					    id: 1,
                        role: ''
                    },
					unit: 'NA',
					campus: 'NA',
					email: '',
				}) {
		  	this.userState = {...userState, email: userState.email.split('@')[0]};
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
				.then(() => {
                    this.$bvToast.toast(`Usuario actualizado`, {
                        title: 'Operación exitosa',
                        autoHideDelay: 5000,
                    })
                    this.indexUsers();
                })
				.then(() => this.setUser())
				.catch((error) => console.warn(error.message));
		 },
		 addUser() {
		     if(Object.values(this.userState).includes('')) {
		         return;
             }
			axios.post('api/users', {
				 ...this.userState,
				 email: this.userState.email.trim().concat('@uabc.edu.mx')
			 })
				.then(() => {
                    this.$bvToast.toast(`Usuario registrado`, {
                        title: 'Operación exitosa',
                        autoHideDelay: 5000,
                    });
                    this.setUser();
                })
				.then(() => this.indexUsers())
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
			indexUsers() {
                let me = this;
                axios.get('api/users').then((response) => {
                    me.users = response.data.map((user) => {
                            const value = Object.values(user).toString().toLowerCase();
                            this.usersConverter[value] = user;
                            return value;
                        }
                    );
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            indexRoles() {
                let me = this;
                axios.get('api/roles').then((response) => {
                    me.roles = response.data.map((role) => {
                        return {
                            value: role.id,
                            text: role.role
                        }
                    });
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted() {
            this.indexRoles();
            this.indexUsers();
        }
    }
</script>
