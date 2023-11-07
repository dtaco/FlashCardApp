console.log('Wired!');

//DOM variables for using flashcards
const term = document.querySelector('.term');
const definition = document.querySelector('.def');
const checkButton = document.querySelector('.check');
const nextButton = document.querySelector('.next');
const hideButton = document.querySelector('.hide');

//these are for adding new terms
let newTerm = document.querySelector('.newTerm');
let newDef = document.querySelector('.newDef');
const submit = document.querySelector('#submitNew');

//these are for the delete/clear button!
const flashcardContainer = document.querySelector('.flashcard');
const deleteButton = document.querySelector('.delete');
const clearAll = document.querySelector('.clear');

//these are for switch visual modes
const darkModeRadio = document.getElementById('dark');
const lightModeRadio = document.getElementById('light');

//this one is for setting user preference of visual mode :-)
const userPreferredMode = localStorage.getItem('userPreferredMode');

//flashcard data bank
let words = {};


if (localStorage.getItem('flashcardData')) {
    words = JSON.parse(localStorage.getItem('flashcardData'));
} else {
    words = {};
}

let data = Object.entries(words);

function getRandomWord() {
    if(data.length === 0){
        term.innerHTML = "<h3>Add a term to get started!</h3>"
        definition.innerHTML = "<h3>Add a definition to get started!</h3>"
    } else{
        let randomTerm = data[Math.floor(Math.random() * data.length)];
        term.innerHTML = `<h3>${randomTerm[0]}</h3>`;
        definition.innerHTML = `<h3>${randomTerm[1]}</h3>`
    }
}

checkButton.addEventListener('click', () => {
    definition.style.display = 'block';
    document.querySelector('.removeWrap').style.display = 'block';
});

hideButton.addEventListener('click', () => {
    definition.style.display = 'none';
    document.querySelector('.removeWrap').style.display = 'none';
});

nextButton.addEventListener('click', () => {
    if(data.length > 1) {
        definition.style.display = 'none';
        document.querySelector('.removeWrap').style.display = 'none';
        getRandomWord();
    } else {
        getRandomWord();
    }
});

submit.addEventListener('click', () => {
    const newTermValue = newTerm.value.trim();
    const newDefValue = newDef.value.trim();

    if (newTermValue && newDefValue) {
        words[newTermValue] = newDefValue;
        data = Object.entries(words);

        //This saves data to local storage!
        localStorage.setItem('flashcardData', JSON.stringify(words));

        newTerm.value = '';
        newDef.value = '';

        alert('New term and definition added!');
    } else {
        alert('Please enter a term and definition.');
    }
});

deleteButton.addEventListener('click', () => {
    const termValue = term.textContent.trim();
    delete words[termValue];
    data = Object.entries(words);
    localStorage.setItem('flashcardData', JSON.stringify(words));
    getRandomWord();
});

clearAll.addEventListener('click', () => {
    localStorage.removeItem('flashcardData');
    words = {};
    data = [];
    getRandomWord();
})

if (userPreferredMode === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeRadio.checked = true;
} else {
    document.body.classList.add('light-mode');
    lightModeRadio.checked = true;
}

// this toggles between modes based on user interaction
darkModeRadio.addEventListener('change', () => {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    localStorage.setItem('userPreferredMode', 'dark');
});

lightModeRadio.addEventListener('change', () => {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('userPreferredMode', 'light');
});
