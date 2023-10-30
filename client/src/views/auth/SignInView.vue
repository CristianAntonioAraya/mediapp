<template>
    <form @submit.prevent="handleOnSubmit">
        <div>
            <label for="email">Correo Electrónico:</label>
            <input v-model="email" type="email" id="email" name="email" />
        </div>
        <div>
            <label for="password">Contraseña:</label>
            <input
                v-model="password"
                type="password"
                id="password"
                pattern=".{6,}"
                name="password"
                required
                title="La contraseña debe tener al menos 6 caracteres"
            />
        </div>
        <div>
            <button type="submit">Iniciar sesión</button>
        </div>
    </form>
    <router-link to="/signup">¿Aún no tienes una cuenta?</router-link>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SignIn } from '../../utils/api';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const email = ref<string>('usuario2@gmail.com');
const password = ref<string>('contraseñaSegura');
const router = useRouter();

async function handleOnSubmit(): Promise<void> {
    try {
        const response = await SignIn(email.value, password.value);
        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: response.msg,
            });
            email.value = '';
            password.value = '';
        } else {
            localStorage.setItem('token', response.user.token);
            localStorage.setItem('role', response.user.role);
            localStorage.setItem('userName', response.user.userName);
            localStorage.setItem('email', response.user.email);
            router.push({ name: 'Profile' });
        }
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: error.msg,
        });
    }
}
</script>
