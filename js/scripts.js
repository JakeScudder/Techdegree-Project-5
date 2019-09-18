/****************************************
JS file for Public API Requests
****************************************/



/****************************************
Globals
****************************************/
const container = document.getElementById('gallery');
console.log(cards);


/****************************************
Fetch Functions
****************************************/
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => data.results.map(employee => {
        generateCard(employee);
    }))



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
            <h3 id="${data.name}" class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
        </div>
    </div>
    `;
    container.innerHTML += html;
}


function generateModal(data) {
    const modal = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
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
// Need to figure out how to make this wait until the cards are generated!
//
// const cards = document.getElementsByClassName('card');
for (let i = 0; i < cards.length; i++) {
    cards[i].children.addEventListener('click', function(event){
            console.log(cards[i])
            console.log(event);
            console.log('click');
    });
}
