const $ = document.querySelector.bind(document);

const addBookContainer = $('.addBookContainer');
const addBookButton = $('.option > .btn');
const closeAddBook = $('.message-box-container > span');

addBookButton.addEventListener('click', ()=> {
    addBookContainer.classList.add('show');
});

closeAddBook.addEventListener('click', ()=> {
    addBookContainer.classList.remove('show');
    addBookContainer.querySelectorAll('input').forEach(inp => inp.value ="");
});