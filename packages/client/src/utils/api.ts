const API_URL = 'http://localhost:4000/api/v1';

async function SignIn(email: string, password: string) {
    if (email === null || password === null) {
        throw new Error('Correo electrónico y contraseña son obligatorios.');
    }

    if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    try {
        const response = await fetch(`${API_URL}/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ');
    }
}

async function SignUp(userName: string, email: string, password: string) {
    if (email === null || password === null || userName === null) {
        throw new Error(
            'El nombre, correo electrónico y contraseña son obligatorios.'
        );
    }

    if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    try {
        const response = await fetch(`${API_URL}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, email, password }),
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ');
    }
}

async function getQuestion() {
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
}

async function assignPro(totalScore: number) {
    try {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        const tokenValue = token || '';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-token': tokenValue, // Aquí se agrega el encabezado personalizado
        });

        const response = await fetch(`${API_URL}/users/assign/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ registerScore: totalScore }),
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ');
    }
}

export { SignIn, SignUp, getQuestion, assignPro };
