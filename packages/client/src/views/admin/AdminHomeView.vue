<template>
    <div class="admin__container">
        <NavbarComponent />
        <h2 class="admin__title">ADMIN</h2>
        <div class="admin__buttons">
            <router-link to="admin/professional"
                ><button class="admin__button">
                    Registro de profesionales
                </button></router-link
            >
            <router-link to="admin/question"
                ><button class="admin__button">
                    Registro de preguntas
                </button></router-link
            >
            <router-link to="admin/assign"
                ><button class="admin__button">
                    Lista de asignaciones
                </button></router-link
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import NavbarComponent from '../../component/NavbarComponent.vue';
</script>

<style scoped>
.admin__container {
    width: 100%;
    height: 100%;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
}
.admin__title {
    text-align: center;
    font-size: 40px;
    margin-bottom: 3rem;
}
.admin__buttons {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
}
.admin__button {
    cursor: pointer;
    width: 100%;
    color: var(--white);
    border: none;
    padding: 1rem;
    font-size: 25px;
    background-color: var(--blue);
}
@media screen and (min-width: 1024px) {
    .admin__container {
        padding: 4rem 20rem;
    }
}
</style>
