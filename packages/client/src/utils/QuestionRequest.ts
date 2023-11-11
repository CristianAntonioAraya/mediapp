const API_URL = '/api/v1';

const getAllQuestion = async () => {
    try {
        const token = localStorage.getItem('token');

        const tokenValue = token || '';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-token': tokenValue, // Aquí se agrega el encabezado personalizado
        });

        const response = await fetch(`${API_URL}/questions`, {
            method: 'GET',
            headers,
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ');
    }
};

const updateQuestion = async (
    id: string,
    statement: string,
    alternative1: string,
    alternative2: string,
    alternative3: string,
    score1: string,
    score2: string,
    score3: string
) => {
    try {
        const token = localStorage.getItem('token');

        const tokenValue = token || '';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-token': tokenValue, // Aquí se agrega el encabezado personalizado
        });

        const response = await fetch(`${API_URL}/questions/update/${id}`, {
            method: 'Put',
            headers,
            body: JSON.stringify({
                statement,
                alternative1,
                alternative2,
                alternative3,
                score1,
                score2,
                score3,
            }),
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ');
    }
};

const deleteQuestion = async (id: number) => {
    try {
        const token = localStorage.getItem('token');

        const tokenValue = token || '';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-token': tokenValue,
        });

        const response = await fetch(`${API_URL}/questions/delete/${id}`, {
            method: 'Delete',
            headers,
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ');
    }
};

const createQuestion = async (
    statement: string,
    alternative1: string,
    alternative2: string,
    alternative3: string,
    score1: string,
    score2: string,
    score3: string
) => {
    try {
        const token = localStorage.getItem('token');

        const tokenValue = token || '';

        console.log("creando nueva pregunta")

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-token': tokenValue,
        });

        console.log(`${API_URL}/questions/create`);

        const response = await fetch(`${API_URL}/questions/create`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                statement,
                alternative1,
                alternative2,
                alternative3,
                score1,
                score2,
                score3,
            }),
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ');
    }
};

export { getAllQuestion, updateQuestion, deleteQuestion, createQuestion };
