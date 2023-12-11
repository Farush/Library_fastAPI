const carousel = document.querySelector('#carousel');
const paginationDots = document.querySelector('.pagination-dots');
const leftArrow = document.querySelector('#left-arrow');
const rightArrow = document.querySelector('#right-arrow');
var classesToChange = {};

const indexFinder = (event) => {
    if ([...paginationDots.children].findIndex(el => el === event.target) !== -1) { return [...paginationDots.children].findIndex(el => el == event.target) }
    return [...paginationDots.children].findIndex(el => el === event.target.parentElement)
}

const activeFinder = () => {
    for (let i = 0; i < paginationDots.children.length; i++) {
        if (paginationDots.children[i].firstElementChild.classList.contains('dot-active')) {
            return i
        }
    }
}

const carouselMove = (newIndex, oldIndex) => {

    paginationDots.children[newIndex].firstElementChild.classList.toggle('dot-active')
    paginationDots.children[oldIndex].firstElementChild.classList.toggle('dot-active')
    const diff = newIndex - oldIndex;
    let classes = {};
    if (document.documentElement.clientWidth > 1430) {

        if (newIndex === 0) {
            if (diff === -1) {
                classes.motion = 'trans-center-right'
            }
            if (diff === -2) {
                classes.motion = 'trans-right-2frames'
            }
            classes.position = 'position-0'
        }

        else if (newIndex === 1) {
            if (diff === 1) {
                classes.motion = 'trans-left-frame'
            }
            if (diff === -1) {
                classes.motion = 'trans-right-frame'
            }
            classes.position = 'position-475'
        }

        else if (newIndex === 2) {
            if (diff === 2) {
                classes.motion = 'trans-left-2frames'
            }
            if (diff === 1) {
                classes.motion = 'trans-center-left'
            }
            classes.position = 'position-950'
        }

        carousel.classList.add(classes.motion);
        arrowsChecker();
        return classes;
    }

    else {
        carousel.children[newIndex].classList.remove('hidden')
        for (let i = 0; i < carousel.children.length; i++) {

            if ((i === newIndex) || (i === oldIndex)) {
                continue;
            }
            else carousel.children[i].classList.add('hidden');
        }
        if (newIndex < oldIndex) {
            classes.motion = 'trans-right-frame-single'
            classes.position = 'position-0'
            classes.indexToHide = oldIndex
            carousel.classList.remove('position-0')
            carousel.classList.add('position-right-475')

        }
        else {
            classes.motion = 'trans-left-frame'
            classes.position = 'position-0'
            classes.indexToHide = oldIndex

        }

        carousel.classList.add(classes.motion);
        arrowsChecker()
        return classes
    }


}

const setPosition = (classes) => {
    carousel.removeAttribute('class')
    if (document.documentElement.clientWidth <= 1430) {
        carousel.children[classes.indexToHide].classList.add('hidden')
    }
    carousel.classList.add(classes.position);
    
    

}

const paginationHandler = (event) => {
    if (indexFinder(event) !== activeFinder()){
    paginationDots.removeEventListener('click', paginationHandler);
    classesToChange = carouselMove(indexFinder(event), activeFinder());
    }

}

const leftArrowHandler = () => {
    if (activeFinder() !== 0) {
        
        leftArrow.removeEventListener('click', leftArrowHandler);
        classesToChange = carouselMove(activeFinder() - 1, activeFinder())
    }
}

const rightArrowHandler = () => {
    if (activeFinder() !== 4) {
        
        rightArrow.removeEventListener('click', rightArrowHandler);
        classesToChange = carouselMove(activeFinder() + 1, activeFinder())
    }
}

const arrowsChecker = () => {
    if (activeFinder() === 0) {
        leftArrow.classList.add('arrow-inactive')
    }
    else leftArrow.classList.remove('arrow-inactive')
    
    if (activeFinder() === 4) {
        rightArrow.classList.add('arrow-inactive')
    }
    else rightArrow.classList.remove('arrow-inactive')
}

paginationDots.addEventListener('click', paginationHandler);
leftArrow.addEventListener('click', leftArrowHandler);
rightArrow.addEventListener('click', rightArrowHandler);

carousel.addEventListener("animationend", function () {
    setPosition(classesToChange)
    paginationDots.addEventListener('click', paginationHandler);
    leftArrow.addEventListener('click', leftArrowHandler);
    rightArrow.addEventListener('click', rightArrowHandler);
})

window.addEventListener("resize", () => {
    if (window.innerWidth > 1430) {
        for (elem of carousel.children) {
            elem.classList.remove('hidden')
        }
        if (activeFinder(paginationDots) > 2) {
            paginationDots.children[activeFinder(paginationDots)].firstElementChild.classList.toggle('dot-active');
            paginationDots.children[2].firstElementChild.classList.toggle('dot-active');
            carousel.removeAttribute('class');
            carousel.classList.add('position-950');
        }
    }
    if (window.innerWidth <= 1430) {
        for (elem of carousel.children) {
            if ([...carousel.children].indexOf(elem) !== activeFinder()) {
                elem.classList.add('hidden')
            }

        }
        carousel.removeAttribute('class');
        carousel.classList.add('position-0');
        arrowsChecker();
    }
});







