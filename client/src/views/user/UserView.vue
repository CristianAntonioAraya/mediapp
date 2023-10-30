<template>
    <div>
        <button @click="handleCloseSession">cerrar Sesion</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleCloseSession = () => {
    localStorage.removeItem('token');
    router.push({ name: 'SignIn' });
};
</script>

<style scoped></style>
