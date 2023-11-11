<template>
    <div class="question__container">
        <NavbarComponent />
        <h2 class="question__title">Preguntas</h2>

        <button class="question__create" @click="handleCreateNew">
            Crear Nueva Pregunta
        </button>

        <div v-for="(question, index) in questions" :key="question.id">
            <div class="question__card">
                <h3>{{ question.statement }}</h3>
                <p>Alternativa 1: {{ question.alternative1 }}</p>
                <p>Score 1: {{ question.score1 }}</p>
                <p>Alternativa 2: {{ question.alternative2 }}</p>
                <p>Score 2: {{ question.score2 }}</p>
                <p>Alternativa 3: {{ question.alternative3 }}</p>
                <p>Score 3: {{ question.score3 }}</p>
                <div class="question__buttons">
                    <button
                        class="question__edit"
                        @click="editQuestion(question)"
                    >
                        Editar
                    </button>
                    <button
                        class="question__delete"
                        @click="confirmDelete(question.id)"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import {
    getAllQuestion,
    updateQuestion,
    deleteQuestion,
    createQuestion,
} from '../../utils/QuestionRequest.ts';
import { ref, onMounted } from 'vue';
import NavbarComponent from '../../component/NavbarComponent.vue';

const questions = ref([]);

const handleCreateNew = () => {
    Swal.fire({
        title: 'Crear Nueva Pregunta',
        html: `
            <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                <label for="swal-input-statement">Enunciado</label>
                <input id="swal-input-statement" class="swal2-input" placeholder="Ingrese el enunciado" />
            </div>

            <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                <label for="swal-input-alternative1">Alternativa 1</label>
                <input id="swal-input-alternative1" class="swal2-input" placeholder="Ingrese la alternativa 1" />
            </div>
            
            <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                <label for="swal-input-score1">Score 1</label>
                <input id="swal-input-score1" class="swal2-input" placeholder="Ingrese el score 1" />
            </div>

            <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                <label for="swal-input-alternative2">Alternativa 2</label>
                <input id="swal-input-alternative2" class="swal2-input" placeholder="Ingrese la alternativa 2" />
            </div>

            <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                <label for="swal-input-score2">Score 2</label>
                <input id="swal-input-score2" class="swal2-input" placeholder="Ingrese el score 2" />
            </div>

            <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                <label for="swal-input-alternative3">Alternativa 3</label>
                <input id="swal-input-alternative3" class="swal2-input" placeholder="Ingrese la alternativa 3" />
            </div>

            <div style="display: flex; flex-direction: column; margin-bottom: 10px;">
                <label for="swal-input-score3">Score 3</label>
                <input id="swal-input-score3" class="swal2-input" placeholder="Ingrese el score 3" />
            </div>
  `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            const statement = Swal.getPopup().querySelector(
                '#swal-input-statement'
            ).value;
            const alternative1 = Swal.getPopup().querySelector(
                '#swal-input-alternative1'
            ).value;
            const score1 = parseInt(
                Swal.getPopup().querySelector('#swal-input-score1').value
            );
            const alternative2 = Swal.getPopup().querySelector(
                '#swal-input-alternative2'
            ).value;
            const score2 = parseInt(
                Swal.getPopup().querySelector('#swal-input-score2').value
            );
            const alternative3 = Swal.getPopup().querySelector(
                '#swal-input-alternative3'
            ).value;
            const score3 = parseInt(
                Swal.getPopup().querySelector('#swal-input-score3').value
            );

            createQuestion(
                statement,
                alternative1,
                alternative2,
                alternative3,
                score1,
                score2,
                score3
            );
        }
    });
};

const confirmDelete = (questionId) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'La pregunta se eliminará permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            deleteQuestion(questionId).then((response) => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Pregunta eliminada correctamente',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al eliminar la pregunta',
                        text: response.msg,
                    });
                }
            });
        }
    });
};

const editQuestion = (question) => {
    Swal.fire({
        title: 'Editar Pregunta',
        html: `
            <input id="swal-input-statement" class="swal2-input" placeholder="Enunciado" value="${question.statement}" />
            <input id="swal-input-alternative1" class="swal2-input" placeholder="Alternativa 1" value="${question.alternative1}" />
            <input id="swal-input-score1" class="swal2-input" placeholder="Score 1" value="${question.score1}" />
            <input id="swal-input-alternative2" class="swal2-input" placeholder="Alternativa 2" value="${question.alternative2}" />
            <input id="swal-input-score2" class="swal2-input" placeholder="Score 2" value="${question.score2}" />
            <input id="swal-input-alternative3" class="swal2-input" placeholder="Alternativa 3" value="${question.alternative3}" />
            <input id="swal-input-score3" class="swal2-input" placeholder="Score 3" value="${question.score3}" />
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar Cambios',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            const statement = Swal.getPopup().querySelector(
                '#swal-input-statement'
            ).value;
            const alternative1 = Swal.getPopup().querySelector(
                '#swal-input-alternative1'
            ).value;
            const score1 = parseInt(
                Swal.getPopup().querySelector('#swal-input-score1').value
            );
            const alternative2 = Swal.getPopup().querySelector(
                '#swal-input-alternative2'
            ).value;
            const score2 = parseInt(
                Swal.getPopup().querySelector('#swal-input-score2').value
            );
            const alternative3 = Swal.getPopup().querySelector(
                '#swal-input-alternative3'
            ).value;
            const score3 = parseInt(
                Swal.getPopup().querySelector('#swal-input-score3').value
            );

            // Ahora puedes usar estos valores para actualizar la pregunta
            updateQuestion(
                question.id,
                statement,
                alternative1,
                score1,
                alternative2,
                score2,
                alternative3,
                score3
            ).then((response) => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Pregunta actualizada correctamente',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar la pregunta',
                        text: response.msg,
                    });
                }
            });
        }
    });
};

onMounted(async () => {
    const res = await getAllQuestion();
    questions.value = res.question;
});
</script>

<style scoped>
.question__container {
    width: 100%;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
}
.question__title {
    font-size: 30px;
}
.question__create {
    width: 100%;
    padding: 0.5rem;
    font-size: 25px;
    border: none;
    color: var(--white);
    background-color: var(--blue);
}
.question__card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: var(--blue);
    padding: 1rem;
}
.question__card p {
    color: var(--white);
}
.question__card h3 {
    font-size: 25px;
}
.question__alternatives {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 20px;
}
.question__alternatives label {
    cursor: pointer;
}
.question__buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}
.question__buttons button {
    border: none;
    color: var(--white);
    background-color: var(--red);
    padding: 0.5rem 1rem;
    cursor: pointer;
}
</style>
