async function SignIn(email, password) {
    if (email === null || password === null) {
        throw new Error('Correo electrónico y contraseña son obligatorios.');
    }

    if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    try {
        const response = await fetch(
            'http://localhost:4000/api/v1/users/signin',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            }
        );
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ' + error.message); // En caso de error de red u otros errores, lanza una excepción.
    }
}

async function SignUp(userName, email, password) {
    if (email === null || password === null || userName === null) {
        throw new Error(
            'El nombre, correo electrónico y contraseña son obligatorios.'
        );
    }

    if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    try {
        const response = await fetch(
            'http://localhost:4000/api/v1/users/signup',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, email, password }),
            }
        );
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ' + error.message); // En caso de error de red u otros errores, lanza una excepción.
    }
}

export { SignIn, SignUp };
