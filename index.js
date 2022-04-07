const myLibrary = [];
const addBookContainer = document.querySelector('.addBookContainer');
const openAddBookContainer = document.querySelector('.option > .btn');
const closeAddBookContainer = document.querySelector('.message-box-container > span');
const bookName = document.querySelector('#bookName');
const bookAuthor = document.querySelector('#bookAuthor');
const bookPages = document.querySelector('#bookPages');
const addBook = document.querySelector('.message-box-buttons > .btn');

function toggleMessageBox(){
  addBookContainer.classList.toggle('show');
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => input.value = "");
}

function addBookToArray(){
  
}

openAddBookContainer.addEventListener('click', toggleMessageBox);

closeAddBookContainer.addEventListener('click', toggleMessageBox);

addBook.addEventListener('click', addBookToArray);


// Constructor for Books
function Book(name, author, pages){
  this.name = name;
  this.author = author;
  this.pages = pages;
}