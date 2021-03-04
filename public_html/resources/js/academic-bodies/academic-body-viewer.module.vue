<template>
    <div>
        <b-nav tabs>
            <b-nav-item
                v-for="(value, key) in links" :key="key"
                :to="value.link.replace('*', $route.params.id)"
                active-class="active">
                <i class="fas" style="font-size:20px"
                   v-bind:class="'fa-'+key"></i>
                {{ value.tooltip }}
            </b-nav-item>
        </b-nav>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            links: {
                'edit': {
                    link: '/cuerpos-academicos/*/editar',
                    tooltip: 'Detalles de cuerpo académico'
                },
                'project-diagram': {
                    link: '/cuerpos-academicos/*/lgac',
                    tooltip: 'LGAC'
                },
                'user-tie': {
                    link: '/cuerpos-academicos/*/miembros',
                    tooltip: 'Miembros'
                },
                'file-alt': {
                    link: '/cuerpos-academicos/*/evaluaciones',
                    tooltip: 'Evaluaciones'
                },
                'hand-holding-usd': {
                    link: '/cuerpos-academicos/*/apoyos',
                    tooltip: 'Apoyos'
                },
                'network-wired': {
                    link: '/cuerpos-academicos/*/redes',
                    tooltip: 'Redes'
                }
            }
        }
    }
}
</script>
