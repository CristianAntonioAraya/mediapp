<template>
    <div class="user__container">
        <NavbarComponent />
        <span class="user__userName">{{ userName }}</span>

        <div class="user__booking">
            <h4>Reserva Actual</h4>
            <div>
                <span>Estado Actual:</span>
                <p>{{ isRegistered }}</p>
                <span>Profesional Asignado:</span>
                <p>{{ professionalName }}</p>
            </div>
            <router-link to="user/register">
                <button>Realizar Diagnostico</button>
            </router-link>
        </div>
        <div class="user__buttons">
            <button>Informacion de Usuario</button>
        </div>
    </div>
</template>

<style scoped>
.user__container {
    width: 100%;
    height: 100%;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
}
.user__userName {
    opacity: 0.6;
    font-size: 20px;
    font-weight: 600;
}

.user__booking {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: var(--lightBlue);
    margin-top: 0.5rem;
}
.user__booking h4 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 28px;
}
.user__booking div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}
.user__booking span {
    font-size: 25px;
    font-weight: 600;
}
.user__booking p {
    font-size: 25px;
}
.user__booking button {
    margin-top: 1rem;
    width: 100%;
    padding: 0.5rem;
    font-size: 25px;
    border: none;
    color: var(--white);
    background-color: var(--red);
}
.user__buttons {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.8rem;
}
.user__buttons button {
    font-size: 25px;
    padding: 1rem;
    border: none;
    color: var(--white);
    background-color: var(--blue);
}
@media screen and (min-width: 1024px) {
    .user__container {
        padding: 4rem 20rem;
    }
}
</style>

<script setup lang="ts">
import NavbarComponent from '../../component/NavbarComponent.vue';
import { ref } from 'vue';
import { getUserInfo } from '../../utils/UserRequest.ts';
import Swal from 'sweetalert2';

const userName = ref('');
const professionalName = ref('');
const isRegistered = ref('');

getUserInfo()
    .then((response) => {
        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: response.msg,
            });
        } else {
            userName.value = response.user.userName;
            if (response.user.registerScore) {
                isRegistered.value = 'Registrado';
            } else {
                isRegistered.value = 'No registrado';
            }
            if (response.user.professionalName) {
                professionalName.value = response.user.professionalName;
            } else {
                professionalName.value = 'Sin profesional asignado';
            }
        }
    })
    .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: error.msg,
        });
    });
</script>

<style scoped></style>
