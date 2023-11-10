const API_URL = 'http://localhost:4000/api/v1';

const getAllProfessional = async () => {
    try {
        const token = localStorage.getItem('token');

        const tokenValue = token || '';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-token': tokenValue, // Aquí se agrega el encabezado personalizado
        });

        const response = await fetch(`${API_URL}/professionals`, {
            method: 'GET',
            headers,
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ');
    }
};

const updateProfessional = async (
    id: string,
    professionalName: string,
    speciality: string,
    range: string
) => {
    try {
        const token = localStorage.getItem('token');

        const tokenValue = token || '';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-token': tokenValue, // Aquí se agrega el encabezado personalizado
        });

        console.log('body', { professionalName, speciality, range });

        const response = await fetch(`${API_URL}/professionals/update/${id}`, {
            method: 'Put',
            headers,
            body: JSON.stringify({ professionalName, speciality, range }),
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ');
    }
};

const deleteProfessional = async (id: number) => {
    try {
        const token = localStorage.getItem('token');

        const tokenValue = token || '';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-token': tokenValue, // Aquí se agrega el encabezado personalizado
        });

        const response = await fetch(`${API_URL}/professionals/delete/${id}`, {
            method: 'Delete',
            headers,
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ');
    }
};

const createProfessional = async (
    professionalName: string,
    speciality: string,
    range: string
) => {
    try {
        const token = localStorage.getItem('token');

        const tokenValue = token || '';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-token': tokenValue, // Aquí se agrega el encabezado personalizado
        });

        const response = await fetch(`${API_URL}/professionals/create`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ professionalName, speciality, range }),
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ');
    }
};

export {
    getAllProfessional,
    updateProfessional,
    deleteProfessional,
    createProfessional,
};
