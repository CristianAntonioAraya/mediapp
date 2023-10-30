<template>
    <div class="pro__container">
        <NavbarComponent />
        <h2 class="pro__title">Profesionales</h2>

        <button class="pro__create" @click="handleCreateNew">
            Crear Nuevo Registro
        </button>

        <div v-for="(professional, index) in professionals" :key="index">
            <div class="pro__card">
                <h3>{{ professional.professionalName }}</h3>
                <p>Especialidad: {{ professional.speciality }}</p>
                <p>Rango: {{ professional.range }}</p>
                <div class="pro__buttons">
                    <button class="pro__edit" @click="editProfessional(index)">
                        Editar
                    </button>
                    <button class="pro__delete" @click="confirmDelete(index)">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.pro__container {
    width: 100%;
    height: 100%;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
}
.pro__create {
    margin-top: 1rem;
    width: 100%;
    padding: 0.5rem;
    font-size: 25px;
    border: none;
    color: var(--white);
    background-color: var(--blue);
}
.pro__title {
    text-align: center;
    font-size: 35px;
}
.pro__card {
    color: var(--white);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: var(--blue);
    padding: 1rem;
}
.pro__card p,
h3 {
    color: var(--white);
}
.pro__buttons {
    display: flex;
    width: 100%;
    gap: 2rem;
}
.pro__edit {
    font-size: 20px;
    border: none;
    width: 100%;
}
.pro__delete {
    font-size: 20px;
    border: none;
    color: var(--white);
    background-color: var(--red);
    width: 100%;
}

@media screen and (min-width: 768px) {
    .pro__container {
        padding: 4rem 8rem;
        gap: 1rem;
    }
    .pro__create {
        font-size: 30px;
    }
    .pro__edit {
        font-size: 25px;
    }
    .pro__delete {
        font-size: 25px;
    }
}
@media screen and (min-width: 1024px) {
    .pro__container {
        font-size: 30px !important;
        padding: 20rem 40rem !important;
        gap: 1rem;
    }
    .pro__container {
        padding: 4rem 8rem !important;
        gap: 1rem;
    }
    .pro__create {
        font-size: 35px !important;
    }
    .pro__edit {
        font-size: 30px !important;
    }
    .pro__delete {
        font-size: 30px !important;
    }
}
</style>

<script setup>
import Swal from 'sweetalert2';
import {
    getAllProfessional,
    updateProfessional,
    deleteProfessional,
    createProfessional,
} from '../../utils/ProfessionalRequest.ts';
import { ref, onMounted } from 'vue';
import NavbarComponent from '../../component/NavbarComponent.vue';

const professionals = ref([]);

const handleCreateNew = async () => {
    Swal.fire({
        title: 'Crear Nuevo Profesional',
        html: `
            <input id="swal-input-professionalName" class="swal2-input" placeholder="Nombre del Profesional" />
            <input id="swal-input-speciality" class="swal2-input" placeholder="Especialidad" />
            <input id="swal-input-range" class="swal2-input" placeholder="Rango" />
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            const professionalName = Swal.getPopup().querySelector(
                '#swal-input-professionalName'
            ).value;
            const speciality = Swal.getPopup().querySelector(
                '#swal-input-speciality'
            ).value;
            const range =
                Swal.getPopup().querySelector('#swal-input-range').value;

            createProfessional(professionalName, speciality, range).then(
                (response) => {
                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Profesional creado correctamente',
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear el profesional',
                            text: response.msg,
                        });
                    }
                }
            );
        }
    });
};

const confirmDelete = (index) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'El registro se eliminará permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            const idToDelete = professionals.value[index].id;
            deleteProfessional(idToDelete).then((response) => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Profesional eliminado correctamente',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al eliminar el profesional',
                        text: response.msg,
                    });
                }
            });
        }
    });
};

const editProfessional = (index) => {
    const professional = professionals.value[index];

    Swal.fire({
        title: 'Editar Profesional',
        html: `
      <input id="swal-input1" class="swal2-input" value="${professional.professionalName}" />
      <input id="swal-input2" class="swal2-input" value="${professional.speciality}" />
      <input id="swal-input3" class="swal2-input" value="${professional.range}" />
    `,
        showCancelButton: true,
        confirmButtonText: 'Guardar Cambios',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            // Obtener los valores editados desde los campos de Sweet Alert
            const updatedProfessionalName =
                Swal.getPopup().querySelector('#swal-input1').value;
            const updatedSpeciality =
                Swal.getPopup().querySelector('#swal-input2').value;
            const updatedRange =
                Swal.getPopup().querySelector('#swal-input3').value;

            const updatedProfessional = {
                id: professional.id,
                professionalName: updatedProfessionalName,
                speciality: updatedSpeciality,
                range: updatedRange,
            };

            updateProfessional(
                updatedProfessional.id,
                updatedProfessional.professionalName,
                updatedProfessional.speciality,
                updatedProfessional.range
            ).then((response) => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Profesional actualizado correctamente',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar el profesional',
                        text: response.msg,
                    });
                }
            });
        }
    });
};

onMounted(async () => {
    const res = await getAllProfessional();
    professionals.value = res.pro;
});
</script>
