<template>
    <div class="assign__container">
        <div class="user__nav">
            <h3>MediaApp</h3>
            <span @click="handleCloseSession">Cerrar Sesion</span>
        </div>
        <h2 class="pro__title">Usuarios Asignados</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre de Usuario</th>
                    <th>ID del Profesional</th>
                    <th>Nombre del Profesional</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.userName }}</td>
                    <td>
                        {{
                            user.professionalId !== null
                                ? user.professionalId
                                : '--'
                        }}
                    </td>
                    <td>
                        {{
                            user.professionalName !== null
                                ? user.professionalName
                                : '--'
                        }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllUsers } from '../../utils/UserRequest.ts';
import Swal from 'sweetalert2';
import NavbarComponent from '../../component/NavbarComponent.vue';

import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([]);

const handleCloseSession = () => {
    console.log('Cerrar sesión');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    router.push({ name: 'SignIn' });
};

const loadUsers = async () => {
    const response = await getAllUsers();
    if (response.ok) {
        users.value = response.users;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error al cargar los usuarios',
            text: response.msg,
        });
    }
};

onMounted(() => {
    loadUsers();
});
</script>

<style scoped>
.assign__container {
    width: 100%;
    height: 100%;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
}
table {
    width: 100%;
    border-collapse: collapse;
}

table,
th,
td {
    border: 1px solid #ccc;
}

th,
td {
    padding: 8px;
    text-align: left;
}

.user__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.user__nav h3 {
    color: var(--blue);
    font-size: 35px;
    font-weight: 600;
}
.user__nav span {
    font-size: 20px;
    font-weight: 500;
}
</style>
