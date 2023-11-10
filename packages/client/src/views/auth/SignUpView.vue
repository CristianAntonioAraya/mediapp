<template>
    <div class="auth__container">
        <h1 class="auth__title">MediApp</h1>

        <form class="auth__form" @submit.prevent="handleOnSubmit">
            <h3>Registrarse</h3>

            <div class="auth__input-container">
                <label for="email">UserName:</label>
                <input
                    v-model="userName"
                    type="text"
                    id="userName"
                    name="userName"
                />
            </div>
            <div class="auth__input-container">
                <label for="email">Correo Electrónico:</label>
                <input v-model="email" type="email" id="email" name="email" />
            </div>
            <div class="auth__input-container">
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
                <button class="auth__button" type="submit">Crear cuenta</button>
            </div>
        </form>
        <div class="auth__redirect">
            <span>¿Ya tienes una cuenta?</span>
            <router-link to="/signin">
                <p>Inicia Sesión</p>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.auth__container {
    width: 100vw;
    height: 100vh;
    background-color: var(--lightBlue);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3rem;
    gap: 2rem;
}
.auth__container h3 {
    text-align: center;
    font-size: 30px;
    padding-bottom: 1rem;
}
.auth__title {
    top: 1rem;
    font-weight: bolder;
    font-size: 50px;
}
.auth__form {
    width: 95%;
    background-color: var(--white);
    padding: 0.8rem;
}
.auth__form h3 {
    color: var(--blue);
}
.auth__input-container {
    margin-bottom: 1rem;
    width: 100%;
}
.auth__input-container input {
    width: 100%;
    padding: 0.5rem;
    font-size: 18px;
}
.auth__input-container label {
    font-size: 18px;
    font-weight: 600;
}
.auth__button {
    cursor: pointer;
    width: 100%;
    color: var(--white);
    border: none;
    padding: 0.5rem;
    font-size: 18px;
    background-color: var(--red);
}
.auth__redirect {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    flex-direction: column;
}
.auth__redirect p {
    color: var(--red);
    text-decoration: none;
    list-style: none;
}
@media screen and (min-width: 1024px) {
    .auth__container {
        font-size: 35px !important;
        padding: 2rem 10rem !important;
        gap: 1rem;
    }
    .auth__form {
        padding: 3rem;
    }
    .auth__title {
        font-size: 80px;
    }
    .auth__form h3 {
        font-size: 45px;
    }
    .auth__input-container input {
        font-size: 25px;
    }
    .auth__input-container label {
        font-size: 25px;
    }
    .auth__button {
        font-size: 25px;
    }
    .auth__redirect {
        font-size: 25px;
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { SignUp } from '../../utils/api';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const userName = ref('');
const email = ref('');
const password = ref('');

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
            localStorage.setItem('id', response.user.id);
            router.push({ name: 'Form' });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error' as 'error',
        });
    }
}
</script>
