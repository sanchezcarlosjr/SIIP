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
                        <a @click="typeOperation='Editar Usuario'; setUser(user)" v-b-modal.add-user class="edit" data-toggle="modal"><i class="fa fa-edit"  data-toggle="tooltip" title="Modificar"></i></a>
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
<script src="./users.page.ts" lang="ts"></script>
<style src="./users.page.scss" scoped lang="scss"></style>
