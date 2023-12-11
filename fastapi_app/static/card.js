const libraryCard = document.querySelector('.card-golden');
const libraryCardCheckButton = document.querySelector('.card-button');


const libraryCardHanler = (event) => {

}

libraryCard.addEventListener('click', libraryCardHanler)

const libraryCardCheckButtonHandler = (event) => {
    console.log(event.target === libraryCardCheckButton)
}

libraryCardCheckButton.addEventListener('click', libraryCardCheckButtonHandler)