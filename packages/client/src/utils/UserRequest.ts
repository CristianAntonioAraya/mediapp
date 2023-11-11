const API_URL = '/api/v1';

const updateUser = async (
    phoneNumber: string,
    city: string,
    gender: string,
    age: string
) => {
    try {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        const tokenValue = token || '';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-token': tokenValue,
        });

        const response = await fetch(`${API_URL}/users/addInfo/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ phoneNumber, city, gender, age }),
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        console.log('error');
        throw new Error('Error al iniciar sesión: ');
    }
};

const getUserInfo = async () => {
    try {
        console.log('Get User Info');
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        const tokenValue = token || '';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-token': tokenValue,
        });

        console.log(`${API_URL}/users/${id}`);
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'GET',
            headers,
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        console.log('error');
        throw new Error('Error al iniciar sesión: ');
    }
};

const getAllUsers = async () => {
    try {
        const token = localStorage.getItem('token');

        const tokenValue = token || '';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-token': tokenValue,
        });

        const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers,
        });
        const responseBody = await response.json();
        return responseBody;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ');
    }
};

export { updateUser, getUserInfo, getAllUsers };
