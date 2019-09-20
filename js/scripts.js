/****************************************
JS file for Public API Requests
****************************************/



/****************************************
Globals
****************************************/
const container = document.getElementById('gallery');
const modalContainer = document.getElementById('modal-container')




/****************************************
Fetch Functions
****************************************/
//Fetch for generateCard functionality
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => data.results.map(employee => {
        generateCard(employee);
        generateModal(employee);
    }))
    .then(function () {
        const modalDiv = document.getElementsByClassName('modal');
        for(let i = 0; i < modalDiv.length; i++) {
            console.log(modalDiv[i]);
        modalDiv[i].style.display = 'none';
        }
    })




/****************************************
Helper Functions
****************************************/


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


function generateModal(data) {
    const modal = `
    <div id="modal-container">
        <div id="${data.name.first}" class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                <h3 id="first-last" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">${data.phone}</p>
                <p class="modal-text">${data.location.street}, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
                <p class="modal-text">Birthday: ${data.dob.date}</p>
            </div>
        </div>
    </div>
    `;
    $('body').append(modal);
}

/****************************************
Event Listeners
****************************************/

setTimeout(addListener, 1500)


function addListener() {
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function(event) {
            let name = event.currentTarget.children[1].children[0].innerText
            let firstName = name.substr(0, name.indexOf(" ")).toLowerCase();
            let modalElement = document.getElementById(firstName);
            console.log(firstName);
            console.log('modal',modalElement);
            modalElement.style.display = '';
        });
    }
}
