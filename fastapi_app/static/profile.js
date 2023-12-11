const profileIcon = document.querySelector('div.user-icon > img');
const profileIconActive = document.querySelector('div.user-icon>.user-icon-active');
const burgerProfileIcon = document.querySelector('.user-icon-burger');
const burgerProfileIconActive = document.querySelector('.user-icon-active-burger');
const profileWindow = document.querySelector('#profile');
const profileLoginElement = profileWindow.querySelector('.profile-login');
const profileRegisterElement = profileWindow.querySelector('.profile-register');
const myProfileMenuElement = profileWindow.querySelector('.my-profile');
const profileLogoutMenuElement = profileWindow.querySelector('.profile-logout');
const modalLoginWindow = document.querySelector('#modal-login');
const modalRegisterWindow = document.querySelector('#modal-register');
const modalLoginSubmitButton = modalLoginWindow.querySelector('#login-submit');
const modalRegisterSubmitButton = modalRegisterWindow.querySelector('#register-submit');
const modalLoginToRegisterHref = document.getElementById('need-register');
const modalRegisterToLoginHref = document.getElementById('has-account');
const modalLoginCancelCross = modalLoginWindow.querySelector('.modal-cancel');
const modalRegisterCancelCross = modalRegisterWindow.querySelector('.modal-cancel');
const myProfileWindow = document.querySelector('#modal-profile');
const signLogBottomArea = document.querySelector('.sign-log-button');
localStorage.clear();
if (localStorage.users === undefined) localStorage.users = JSON.stringify({});
var usersFromLocalStorage = JSON.parse(localStorage.users);
var userDict = {};
// var userExists = false;
// var user_ID = '';




const capitalized = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

const profileWindowOpener = () => {
    profileWindow.classList.remove('hidden');
    profileWindow.classList.add('active-flex');
};

const profileWindowCloser = () => {
    profileWindow.classList.remove('active-flex');
    profileWindow.classList.add('hidden');
};

const profileWindowSwitcher = () => {
    profileLoginElement.classList.toggle('hidden');
    profileRegisterElement.classList.toggle('hidden');
    myProfileMenuElement.classList.toggle('hidden');
    profileLogoutMenuElement.classList.toggle('hidden');
};

const modalLoginOpener = () => {
    modalLoginWindow.classList.add('active-flex');
    modalLoginWindow.classList.remove('hidden')
};

const modalLoginCloser = () => {
    modalLoginWindow.classList.add('hidden');
    modalLoginWindow.classList.remove('active-flex')
};

const modalRegisterOpener = () => {
    modalRegisterWindow.classList.add('active-flex');
    modalRegisterWindow.classList.remove('hidden')
};

const modalRegisterCloser = () => {
    modalRegisterWindow.classList.add('hidden');
    modalRegisterWindow.classList.remove('active-flex')
};


const profileHandler = () => {
    profileWindow.classList.toggle('hidden');
    profileWindow.classList.toggle('active-flex');

}

const profileLoginHandler = () => {
    profileWindowCloser();
    modalLoginOpener();
};

const profileRegisterHandler = () => {
    profileWindowCloser();
    modalRegisterOpener();
};

// const passwordChecker = (user, pswd) => {
//     if (usersFromLocalStorage[user].password === pswd) return true;
//     else return false;



// };

const loginFieldsChecker = async (userEmail, pswd,) => {


    try {
        let flag = true;
        let alertMessage = '';

        if (userEmail === '') {
            alertMessage += "Please, enter your email or readers card number\n";
            flag = false;
        }

        if (pswd === '') {
            alertMessage += "Please, enter password\n"
            flag = false;
        }

        const userCheckHandlerResponse = await userCheckHandler(userEmail);
        const passwd = await passwordCheckHandler(userEmail, pswd);

        console.log(userCheckHandlerResponse, pswdMatch);

        if (!userCheckHandlerResponse.userExists) {
            alertMessage += "No such user\n";
            flag = false;
        }
        if (!passwd.pswdMatch) {
            alertMessage += "Wrong password\n";
            flag = false;
        }

        if (!flag) alert(alertMessage);

        return { 'user': userCheckHandlerResponse, 'flag': flag };
    }
    catch (error) {
        console.error(error);
    }
};

const profileSetter = (user) => {
    if (user) {
        const initials = usersFromLocalStorage[user].firstname.charAt(0) + usersFromLocalStorage[user].lastname.charAt(0);
        profileIcon.classList.toggle('hidden');
        profileIcon.classList.toggle('active-flex');
        burgerProfileIcon.classList.toggle('hidden');
        profileIconActive.innerText = initials;
        burgerProfileIconActive.innerText = initials;
        profileIconActive.classList.toggle('hidden');
        profileIconActive.classList.toggle('active-flex');
        burgerProfileIconActive.classList.toggle('hidden')

    }
};


const logoutHandler = () => {

    localStorage.removeItem("activeUser");
    profileIcon.classList.toggle('hidden');
    profileIcon.classList.toggle('active-flex');
    burgerProfileIcon.classList.toggle('hidden');
    profileIconActive.innerText = '';
    burgerProfileIconActive.innerText = '';
    profileIconActive.classList.toggle('hidden');
    profileIconActive.classList.toggle('active-flex');
    burgerProfileIconActive.classList.toggle('hidden')
    profileWindowSwitcher();
    profileWindowCloser();

}

const modalLoginWindowHandler = async (event) => {
    if (event.target === modalLoginSubmitButton) {
        event.preventDefault();
        const userEmail = document.querySelector('[name=login-email-card]').value;
        const pswd = document.querySelector('#modal-login-password').value;
        try {
            const loginFieldsCheckerResponse = await loginFieldsChecker(userEmail, pswd);
            flag = loginFieldsCheckerResponse.flag;
            console.log(flag);
            if (flag) {
                localStorage.activeUser = loginFieldsCheckerResponse.user.id;

                usersFromLocalStorage[localStorage.activeUser] = loginFieldsCheckerResponse.user;
                usersFromLocalStorage[localStorage.activeUser].vizits += 1;
                localStorage.users = JSON.stringify(usersFromLocalStorage);
                userVizitsIncrement(localStorage.activeUser);
                // console.log(localStorage.users);
                profileSetter(localStorage.activeUser);
                profileWindowSwitcher();
                modalLoginCloser();

            }
        }
        catch (error) {
            console.error('Error checking user:', error);
        }
    }

    if (event.target === modalLoginToRegisterHref) {
        modalLoginCloser();
        modalRegisterOpener();

    }
};


const fieldsChecker = async (user) => {
    let flag = true;
    let alertMessage = '';
    // const usersToCheck = JSON.parse(localStorage.users);


    if (!user.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
        alertMessage += 'input a correct e-mail address \n';
        flag = false
    }

    for (elem in user) {
        if (user[elem] === '') {
            alertMessage += `${elem} shoudn't be empty \n`;
            flag = false;
        }
    }

    if (flag) {
        if (user.password.length < 8) {
            alertMessage += 'password must not be shorter than 8 symbols';
            flag = false;
        }
    }

    try {
        const userCheckHandlerResponse = await userCheckHandler(user.email);
        const userExists = userCheckHandlerResponse.userExists;
        console.log(userCheckHandlerResponse);
        if (userExists) {
            alertMessage += 'User with this email already exists';
            flag = false;
        }
    } catch (error) {
        console.error('Error checking user:', error);
    }

    if (flag === false) alert(alertMessage);
    return flag;

};

const randomUserID = () => {
    let decNum = Math.floor(Math.random() * 68719476735);
    const userID = decNum.toString(16).toUpperCase();
    // console.log(userID);
    return userID
}


const modalRegisterWindowHandler = async (event) => {
    if (event.target === modalRegisterSubmitButton) {
        event.preventDefault();
        let user = {};
        user.firstname = capitalized(document.querySelector('[name = first-name]').value);
        user.lastname = capitalized(document.querySelector('[name = last-name]').value);
        user.email = document.querySelector('[name = email]').value;
        user.password = document.querySelector('[name = password]').value;

        try {
            const res = await fieldsChecker(user);
            console.log(res);
            if (res) {
                const userID = randomUserID();
                usersFromLocalStorage[userID] = user;
                localStorage.activeUser = userID;

                // console.log(localStorage.activeUser);
                usersFromLocalStorage[userID].vizits = 1;
                usersFromLocalStorage[userID].bonuses = 0;
                usersFromLocalStorage[userID].books = [];
                localStorage.users = JSON.stringify(usersFromLocalStorage);
                modalRegisterCloser();
                profileWindowSwitcher();
                profileSetter(localStorage.activeUser);

                const userDict = {
                    'id': userID,
                    'firstname': user.firstname,
                    'lastname': user.lastname,
                    'email': user.email,
                    'password': user.password,
                    'vizits': 1,
                    'bonus': 0
                };
                await registerHandler(userDict);
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }
    if (event.target === modalRegisterToLoginHref) {
        modalRegisterCloser();
        modalLoginOpener();
    }
};


if (localStorage.activeUser) usersFromLocalStorage[localStorage.activeUser].books = ['First Queen, Clive Irving', 'Dominicana, Angie Cruz'];

const profileMenuHandler = () => {
    profileWindowCloser();
    usersFromLocalStorage[localStorage.activeUser].books = ['First Queen, Clive Irving', 'Dominicana, Angie Cruz'];
    myProfileWindow.querySelector('.modal-profile-avatar>p').innerText =
        usersFromLocalStorage[localStorage.activeUser].firstname.charAt(0) +
        usersFromLocalStorage[localStorage.activeUser].lastname.charAt(0);
    myProfileWindow.querySelector('.modal-profile-username>div:first-child').innerText = usersFromLocalStorage[localStorage.activeUser].firstname;
    myProfileWindow.querySelector('.modal-profile-username>div:last-child').innerText = usersFromLocalStorage[localStorage.activeUser].lastname;
    myProfileWindow.querySelector('.visited>p:last-child').innerText = usersFromLocalStorage[localStorage.activeUser].vizits;
    myProfileWindow.querySelector('.bonuses>p:last-child').innerText = usersFromLocalStorage[localStorage.activeUser].bonus;
    myProfileWindow.querySelector('.books>p:last-child').innerText = usersFromLocalStorage[localStorage.activeUser].books.length;
    let booksHTML = '';
    for (el of usersFromLocalStorage[localStorage.activeUser].books) {
        booksHTML += `<li>${el}</li>\n`
    }
    myProfileWindow.querySelector('.rented-books>ul').innerHTML = booksHTML;
    myProfileWindow.querySelector('.card-number-modal>p:nth-child(2)').innerText = localStorage.activeUser.toUpperCase();
    myProfileWindow.classList.toggle('active-flex');
    myProfileWindow.classList.toggle('hidden');
}

const myProfileWindowCloser = () => {
    myProfileWindow.classList.remove('active-flex');
    myProfileWindow.classList.add('hidden');
};

const myProfileWindowHandler = (event) => {
    if (event.target === myProfileWindow.querySelector('.modal-cancel')) {
        myProfileWindowCloser()
    }
    if (event.target === myProfileWindow.querySelector('.card-number-modal>img')) {
        navigator.clipboard.writeText(localStorage.activeUser.toUpperCase());

    }
}



profileIcon.addEventListener('click', profileHandler);
profileIconActive.addEventListener('click', profileHandler);
burgerProfileIcon.addEventListener('click', profileHandler);
burgerProfileIconActive.addEventListener('click', profileHandler);


profileLoginElement.addEventListener('click', profileLoginHandler)
profileRegisterElement.addEventListener('click', profileRegisterHandler)



modalLoginWindow.addEventListener('click', modalLoginWindowHandler);
modalRegisterWindow.addEventListener('click', modalRegisterWindowHandler);

myProfileMenuElement.addEventListener('click', profileMenuHandler);
profileLogoutMenuElement.addEventListener('click', logoutHandler);

myProfileWindow.addEventListener('click', myProfileWindowHandler);

myProfileWindow.querySelector('.card-number-modal>img').addEventListener('mousedown', () => {
    const element = myProfileWindow.querySelector('.card-number-modal>img')
    element.src = "img/Rectangle 7.svg";
    element.style.position = "relative";
    element.style.bottom = "2px";
    element.style.left = "2px";
})

myProfileWindow.querySelector('.card-number-modal>img').addEventListener('mouseup', () => {
    element = myProfileWindow.querySelector('.card-number-modal>img');
    element.src = "img/copy icon.svg";
    element.removeAttribute("style");

})

const bottomButtonsHandler = (event) => {

    if (!localStorage.activeUser) {

        if (event.target === signLogBottomArea.querySelector('.sign-log-button>button:first-child')) {
            modalRegisterOpener();
        };

        if (event.target === signLogBottomArea.querySelector('.sign-log-button>button:last-child')) {
            modalLoginOpener();
        }



    }


    else alert('Alredy logged in, logout first');
};
signLogBottomArea.addEventListener('click', bottomButtonsHandler);


if (localStorage.activeUser) {
    profileSetter(localStorage.activeUser);
    profileWindowSwitcher();
}





