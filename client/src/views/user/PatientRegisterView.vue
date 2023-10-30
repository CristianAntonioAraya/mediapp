<template>
    <div class="question__container">
        <NavbarComponent />
        <h2 class="question__title">Formulario de Preguntas</h2>
        <form v-for="question in questions" :key="question.id">
            <div class="question__card">
                <h3>{{ question.statement }}</h3>
                <label>
                    <input
                        type="radio"
                        v-model="selectedAlternative[question.id]"
                        :value="question.score1"
                        required
                    />
                    {{ question.alternative1 }}
                </label>
                <label>
                    <input
                        type="radio"
                        v-model="selectedAlternative[question.id]"
                        :value="question.score2"
                        required
                    />
                    {{ question.alternative2 }}
                </label>
                <label>
                    <input
                        type="radio"
                        v-model="selectedAlternative[question.id]"
                        :value="question.score3"
                        required
                    />
                    {{ question.alternative3 }}
                </label>
            </div>
        </form>
        <button class="question__button" @click="calculateScores">
            Enviar Respuestas
        </button>
    </div>
</template>

<style scoped>
.question__container {
    width: 100%;
    height: 100vh;
    background-color: var(--lightBlue);
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
}
.question__title {
    font-size: 30px;
}
.question__card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: var(--white);
    padding: 1rem;
}
.question__card h3 {
    color: var(--blue);
    font-size: 25px;
}
.question__card label {
    font-size: 20px;
}
.question__button {
    margin-top: 1rem;
    width: 100%;
    padding: 0.5rem;
    font-size: 25px;
    border: none;
    color: var(--white);
    background-color: var(--red);
}
@media screen and (min-width: 1024px) {
    .question__container {
        padding: 4rem 20rem;
    }
}
</style>

<script setup>
import { ref } from 'vue';
import { getQuestion } from '../../utils/api.ts';
import { assignPro } from '../../utils/api.ts';
import NavbarComponent from '../../component/NavbarComponent.vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();

const questions = ref([]);
const selectedAlternative = ref({});

getQuestion()
    .then((response) => {
        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: response.msg,
            });
        } else {
            questions.value = response.question;
        }
    })
    .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: error.msg,
        });
    });

const calculateScores = async () => {
    const totalScores = questions.value.reduce((total, question) => {
        const selectedScore = selectedAlternative.value[question.id];
        return total + question[`score${selectedScore}`];
    }, 0);
    const res = await assignPro(totalScores);

    if (res.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Profesional asignado correctamente',
            showConfirmButton: false,
            timer: 2000, 
        }).then(() => {
            router.push({ name: 'Profile' });
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: error.msg,
        });
    }
};
</script>
