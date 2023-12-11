const favouritesRadio = document.querySelector('.favourites-radio')
const seasonsWrapper = document.querySelector('#fav-seasons')
var elementToReveal = ''

const visibleElementFinder = () => {
    for (elem of seasonsWrapper.children) {
        if (!elem.classList.contains('hidden'))
            return [...seasonsWrapper.children].indexOf(elem);
    }
}

const favouritesHandler = (event) => {
    elementToReveal = seasonsWrapper.querySelector(`.${event.target.value}`)
    seasonsWrapper.children[visibleElementFinder()].classList.remove('fadein')
    seasonsWrapper.children[visibleElementFinder()].classList.add('fadeout')
}

favouritesRadio.addEventListener('input', favouritesHandler)

// console.log(visibleElementFinder())

seasonsWrapper.addEventListener('animationend', () => {
    seasonsWrapper.children[visibleElementFinder()].classList.remove('fadeout')
    seasonsWrapper.children[visibleElementFinder()].classList.add('hidden')
    elementToReveal.classList.add('fadein')
    elementToReveal.classList.remove('hidden')


})