<template>
    <div class="user__nav">
        <h3>MediaApp</h3>
        <span @click="handleCloseSession">Cerrar Sesion</span>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const handleCloseSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    router.push({ name: 'SignIn' });
};
</script>

<style scoped>
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
