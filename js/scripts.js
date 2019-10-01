/****************************************
JS file for Public API Requests
****************************************/



/****************************************
Globals
****************************************/
const container = document.getElementById('gallery');


/****************************************
Fetch Functions
****************************************/

//Initial fetch requests that pulls 12 random employees and then generates the cards and modals

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => data.results.map(employee => {
        generateCard(employee);
        generateModal(employee);
    }))
    //Modal Divs are then hidden
    .then(function () {
        const modalDiv = document.getElementsByClassName('modal');
        for(let i = 0; i < modalDiv.length; i++) {
        modalDiv[i].style.display = 'none';
        }
    })
    .then(function () {
        createSearchBar();
        disableButtons();
        addListener();
    })








/****************************************
Helper Functions
****************************************/

//function generateCard takes the employee data from the fetch request and writes the html.  That html is then added to the gallery container
function generateCard(data) {
    const html = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${data.picture.large}">
        </div>
        <div class="card-info-container">
            <h3 id="card-name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
        </div>
    </div>
    `;
    container.innerHTML += html;
}

//function generateModal takes the employee data and assigns them a unique id based on their name.  The other employee data is used to generate the html. That html is then appended to the body.
function generateModal(data) {
    const id = `${data.name.first}`.toLowerCase();
    const modal = `
    <div class="inactive-modal">
        <div id="${id}" class="modal">
            <button onclick="dismiss()" type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                <h3 id="first-last" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">${data.phone}</p>
                <p class="modal-text">${data.location.street}, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
            </div>
        </div>
        <div id="${id}-btn" class="modal-btn-container" style="display: none">
            <button onclick="prevButton()" "type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button onclick="nextButton()" "type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `;
    $('body').append(modal);
}

/*****************************************
Search Bar Functionality
*****************************************/


const noResults = document.createElement('h3');

//function createSearchBar sets up the html for the search bar and appends it to the search container.
function createSearchBar() {
    const search = `
    <form class="animated fadeIn" action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
    </form>
    `;
    $('.search-container').append(search);
}


//When the submit button is clicked, searchFunction selects all the employee cards and then uses the .forEach method to search each card.  If that card includes the letters in the search bar, the modal with that ID will be put on the screen.
function searchFunction(input, cardList){
    let matchGallery = [];
    let names = document.querySelectorAll('.card');
    names.forEach(name => {
        names.style.display = 'none';
        if (name.lastElementChild.firstElementChild.textContent.includes(event.target.value)) {
            matchGallery.push(name);
            noResults.textContent = '';
        }
    })
    if(matchGallery.length === 0 && input.value.length !== 0) {
        noResults.textContent = 'Sorry, No Results Found';
        input.appendChild(noResults);
    } else {
        names.forEach(name => {
            name.style.display = '';
        });
    }
}

//function prevButton finds the previousElementSibling of the event and brings that modal to the screen.
function prevButton () {
        let prevModal = event.currentTarget.parentElement.parentElement.previousElementSibling
        dismiss();
        prevModal.className = 'modal-container';
        prevModal.style.display = 'block'
        prevModal.firstElementChild.style.display = 'block';
        prevModal.lastElementChild.style.display = 'block';

}

//function nextButton finds the nextElementSibling of the event and brings that modal to the screen.
function nextButton () {
    let nextModal = event.currentTarget.parentElement.parentElement.nextElementSibling
    console.log(nextModal);
    dismiss();
    nextModal.className = 'modal-container';
    nextModal.style.display = 'block'
    nextModal.firstElementChild.style.display = 'block';
    nextModal.lastElementChild.style.display = 'block';

}

//This function disables the first previous button and the last next button regardless of how many cards have been generated.
function disableButtons () {
    let modalContainers = document.querySelectorAll('div.inactive-modal');
    let modalContainersLastElement = modalContainers.length - 1;
    let firstPrevButton = modalContainers[0].lastElementChild.firstElementChild;
    let lastNextButton = modalContainers[modalContainersLastElement].lastElementChild.lastElementChild;
    firstPrevButton.disabled = true;
    lastNextButton.disabled = true;

}



//function dismiss finds all the modals containers and modals in the body. It uses a for loop to re-assign their style.display to 'none';
function dismiss(){
    let modalContainers = document.querySelectorAll('div.modal-container');
    for (let i = 0; i < modalContainers.length; i++) {
        modalContainers[i].className = 'inactive-modal';
        modalContainers[i].style.display = 'none';
    }
    let modals = document.querySelectorAll('.modal');
    for (let i = 0; i < modals.length; i++) {
        modals[i].style.display = 'none';
    }
}

/****************************************
Event Listeners
****************************************/

//adds event listener to search submit button
function searchListener() {
    let input = document.getElementById('#search-input');
    input.addEventListener('keyup', function(event){
        searchFunction();
    })
}

//function addListener selects all elements with the class name 'card' and runs a for loop to assign eventListeners to each card.
function addListener() {
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        //The event listener takes the name from the card and uses .substr.toLowerCase in order to search for the unique ID attached to the modal card.  Then that modal card's className is changed and the style.display is changed to 'block'.
        cards[i].addEventListener('click', function(event) {
            let name = event.currentTarget.children[1].children[0].innerText
            let firstName = name.substr(0, name.indexOf(" ")).toLowerCase();
            let modalElement = document.getElementById(firstName);
            let buttonID = `${firstName}-btn`;
            let modalButton = document.getElementById(buttonID)
            modalElement.parentElement.className = 'modal-container';
            modalElement.style.display = 'block';
            modalElement.parentElement.style.display = '';
            modalButton.style.display = 'block';
        });
    }
}
