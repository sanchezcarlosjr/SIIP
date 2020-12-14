import Vue from "vue"
import Component from "vue-class-component"
import axios from 'axios';

enum Role {
    COORDINATOR_UA = 3,
    CAMPUS_MANAGER = 14
}

@Component
export default class UsersPage extends Vue {
    users:any[]=[];
    usersConverter: any = {};
    roles: any[] = [];
    campus = [
        { value: 'NA', text: 'No aplica' },
        { value: 'Ensenada', text: 'Ensenada'},
        { value: 'Tijuana', text: 'Tijuana'},
        { value: 'Mexicali', text: 'Mexicali'},
        { value: 'Tecate', text: 'Tecate'},
        { value: 'Valle de las palmas', text: 'Valle de las palmas'},
        { value: 'San Quintín', text: 'San Quintín'}
    ];
    units= [
        {value: 'NA', text: 'No aplica'},
        {value: 'Facultad de Arquitectura y Diseño', text: 'Facultad de Arquitectura y Diseño'},
        {value: 'Facultad de ciencias', text: 'Facultad de ciencias'},
        {value: 'Facultad de Ciencias administrativas y sociales', text: 'Facultad de Ciencias administrativas y sociales'}
    ];
    typeOperation= '';
    query= '';
    userState= {
        id: '',
        name: '',
        roles: {
            id: 1,
            role: ''
        },
        unit: 'NA',
        campus: 'NA',
        email: ''
    };
    userToDelete= -1;

    mounted() {
        this.indexRoles();
        this.indexUsers();
    }

    get filteredUsers() {
        const query = this.query.toLowerCase();
        return this.users.filter((user: string) => user.indexOf(query) !== -1).map((user) => this.usersConverter[user]);
    }

    get hasAccessToCampus() {
        return [Role.COORDINATOR_UA, Role.CAMPUS_MANAGER].indexOf(this.userState.roles.id) !== -1;
    }

    get hasAccessToAcademicUnit () {
        return [Role.COORDINATOR_UA].indexOf(this.userState.roles.id) !== -1;
    }

    setUser(userState =  {
        id: '',
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
    }

    operate() {
        switch (this.typeOperation) {
            case 'Agregar Usuario': this.addUser(); break;
            case 'Editar usuario': this.update(); break;
        }
    }

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
            .catch((error: any) => console.warn(error.message));
    }

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
            .catch((error: any) => console.warn(error));
    }

    deleteUser() {
        axios.delete(`api/users/${this.userToDelete}`)
            .then(() => this.userToDelete = -1)
            .then(() => this.indexUsers())
            .catch(function (error: any) {
                console.log(error);
            });
    }

    indexUsers() {
        let me = this;
        axios.get('api/users').then((response: any) => {
            me.users = response.data.map((user: any) => {
                    const value = Object.values(user).toString().toLowerCase();
                    this.usersConverter[value] = user;
                    return value;
                }
            );
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    indexRoles() {
        let me = this;
        axios.get('api/roles').then((response) => {
            me.roles = response.data.map((role: any) => {
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
}

