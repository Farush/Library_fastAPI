


const registerHandler = (userDict) => {
    const url = '/users';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDict) // Преобразование данных в формат JSON
    };
    console.log(JSON.stringify(userDict));

    // Отправка запроса с использованием функции fetch
    fetch(url, options)
        .then(response => response.json()) // Обработка ответа в формате JSON
        .then(data => {
            console.log('Ответ от сервера:', data);
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
};

const userCheckHandler = (email) => {
    const queryString = new URLSearchParams({ 'email': email }).toString();
    const url = `/users/usercheck?${queryString}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Статус: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            userExists = data.message === 'user exists';
            return {
                'userExists': userExists,
                'id': data.id,
                'firstname': data.firstname,
                'lastname': data.lastname,
                'vizits': data.vizits,
                'bonus': data.bonus
            };
        })

        .catch(error => {
            console.error('Произошла ошибка:', error);
            return false;
        });


};

const passwordCheckHandler = (email, psswd) => {
    const queryString = new URLSearchParams({ 'email': email, 'passwd': psswd }).toString();
    const url = `/users/password?${queryString}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Статус: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            pswdMatch = data.message === 'password matches';
            return {
                'pswdMatch': pswdMatch,
            };
        })

        .catch(error => {
            console.error('Произошла ошибка:', error);
            return false;
        });

};

const userVizitsIncrement = (userId) => {
    const url = `/users`;

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: userId,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Статус: ${response.status}`);
            }
            return response.json();
        })

        .catch(error => {
            console.error('Произошла ошибка:', error);
            return false;
        });
};






