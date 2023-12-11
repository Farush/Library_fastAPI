

const burgerIcon = document.querySelector('.burger');
const burgerCancel = document.querySelector('.burger-cancel');
const burgerNavPanel = document.querySelector('.nav-menu-burger');
const burgerList = burgerNavPanel.children;
// const burgerProfileIcon = document.querySelector('nav.burger-nav>div>img:first-child')

const burgerMenuCloser = () => {
    burgerNavPanel.classList.add('burger-hidden');
    burgerCancel.classList.add('hidden');
    burgerIcon.classList.remove('hidden');
}

burgerIcon.addEventListener('click', function () {
    burgerCancel.classList.remove('hidden');
    burgerIcon.classList.add('hidden');
    burgerNavPanel.classList.remove('hidden')
    burgerNavPanel.classList.remove('burger-hidden')
})


burgerCancel.addEventListener('click', function () {
    burgerNavPanel.classList.add('burger-hidden');
    burgerCancel.classList.add('hidden');
    burgerIcon.classList.remove('hidden');
})

const burgerChecker = (event) => {
    if (event.target !== burgerNavPanel && !event.target.classList.contains('burger-nav-menu-item'))
        if (event.target !== burgerIcon) {
            burgerMenuCloser()

        }
}

const profileWindowChecker = (event) => {
    if (event.target !== profileWindow && ![...profileWindow.children].includes(event.target))

        if (event.target !== profileIcon && 
            event.target !== burgerProfileIcon && 
            event.target !== profileIconActive && 
            event.target !== burgerProfileIconActive) {
            profileWindowCloser()

        }
}

const myProfileWindowChecker = (event) => {
    if (event.target.closest('#modal-profile') !== myProfileWindow && event.target !== myProfileMenuElement) {
        myProfileWindowCloser();
    }
}

const loginWindowChecker = (event) => {
    if (event.target.closest('#modal-login') !== modalLoginWindow 
    && event.target !== modalRegisterToLoginHref
    && event.target !== signLogBottomArea.querySelector('.sign-log-button>button:last-child')){
        if (event.target !== profileLoginElement) {
            modalLoginCloser();
        }
} else if (event.target === modalLoginCancelCross) modalLoginCloser();
};

const registerWindowChecker = (event) => {
    if (event.target.closest('#modal-register') !== modalRegisterWindow 
    && event.target !== modalLoginToRegisterHref 
    && event.target !== signLogBottomArea.querySelector('.sign-log-button>button:first-child'))
    {
        if (event.target !== profileRegisterElement) {
            modalRegisterCloser();
        }
} else if (event.target === modalRegisterCancelCross) modalRegisterCloser();
};

document.addEventListener('click', function (event) {
    burgerChecker(event);
    profileWindowChecker(event);
    loginWindowChecker(event);
    registerWindowChecker(event);
    myProfileWindowChecker(event);

});


burgerNavPanel.addEventListener("animationend", function (event) {
    if (event.animationName === 'burger-hide')
        burgerNavPanel.classList.add('hidden')
});



