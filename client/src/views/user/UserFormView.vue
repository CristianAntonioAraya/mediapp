<template>
    <div class="form__container">
        <NavbarComponent />

        <h2 class="form__title">User Form View</h2>

        <form class="form__form" @submit.prevent="handleOnSubmit">
            <div class="form__input-container">
                <label for="phoneNumber">Número de Teléfono:</label>
                <div class="phone-input">
                    <span class="form__prefix">+569</span>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        required
                        v-model="phoneNumber"
                    />
                </div>
            </div>

            <div class="form__input-container">
                <label for="city">Ciudad:</label>
                <input type="text" id="city" v-model="city" required />
            </div>

            <div class="form__input-short">
                <div class="form__input">
                    <label for="gender">Género:</label>
                    <select id="gender" v-model="gender" required>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                    </select>
                </div>

                <div class="form__input">
                    <label for="age">Edad:</label>
                    <input type="number" id="age" v-model="age" required />
                </div>
            </div>

            <button class="form__button" type="submit">Enviar</button>
        </form>
    </div>
</template>

<script setup>
import NavbarComponent from '../../component/NavbarComponent.vue';
import { ref } from 'vue';
import { updateUser } from '../../utils/UserRequest.ts';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const phoneNumber = ref('');
const city = ref('');
const gender = ref('');
const age = ref('');

const handleOnSubmit = async () => {
    updateUser(phoneNumber.value, city.value, gender.value, age.value)
        .then((response) => {
            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: response.msg,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Información enviada correctamente',
                    showConfirmButton: false,
                    timer: 2000,
                }).then(() => {
                    router.push({ name: 'Profile' });
                });
            }
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: error.msg,
            });
        });
};
</script>

<style>
.form__container {
    width: 100%;
    min-height: 100vh;
    background-color: var(--lightBlue);
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
}
.form__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--white);
}

.phone-input {
    display: flex;
    align-items: center;
}
.form__prefix {
    font-size: 30px;
    margin-right: 5px;
}
.form__input-container {
    width: 100%;
}
.form__input-container label {
    font-weight: 600;
    font-size: 25px;
}
.form__input-container input {
    font-size: 25px;
    padding: 1rem;
    width: 100%;
}
.form__input-short {
    justify-content: space-between;
    display: flex;
    align-items: center;
}
.form__input-short label {
    font-weight: 600;
    font-size: 25px;
}
.form__input-short select,
option {
    font-weight: 600;
    font-size: 25px;
    padding: 1rem;
}
.form__input-short input {
    font-size: 25px;
    padding: 1rem;
    width: 100%;
}
.form__button {
    cursor: pointer;
    width: 100%;
    color: var(--white);
    border: none;
    padding: 0.5rem;
    font-size: 18px;
    background-color: var(--red);
}
@media screen and (min-width: 1024px) {
    .form__container {
        padding: 4rem 20rem;
    }
}
</style>
