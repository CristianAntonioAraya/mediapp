<template>
    <form @submit.prevent="handleOnSubmit">
        <div>
            <label for="email">UserName:</label>
            <input
                v-model="userName"
                type="text"
                id="userName"
                name="userName"
            />
        </div>
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
                title="La contraseña debe tener al menos 6 carácteres"
            />
        </div>
        <div>
            <button type="submit">Crear cuenta</button>
        </div>
    </form>
    <router-link to="/signIn">Ya tienes una cuenta?</router-link>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SignUp } from '../../utils/api';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();

const userName = ref('usuario 1');
const email = ref('usuario2@gmail.com');
const password = ref('contraseñaSegura');

async function handleOnSubmit() {
    try {
        const response = await SignUp(
            userName.value,
            email.value,
            password.value
        );
        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: response.msg,
            });
            userName.value = '';
            email.value = '';
            password.value = '';
        } else {
            localStorage.setItem('token', response.user.token);
            localStorage.setItem('role', response.user.role);
            localStorage.setItem('userName', response.user.userName);
            localStorage.setItem('email', response.user.email);
            router.push({ name: 'Profile' });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: error.msg,
        });
    }
}
</script>
