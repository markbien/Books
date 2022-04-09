let myLibrary = [];
const addBookContainer = document.querySelector(".addBookContainer");
const openAddBookContainer = document.querySelector(".option > .btn");
const closeAddBookContainer = document.querySelector(
  ".message-box-container > span"
);
const bookName = document.querySelector("#bookName");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const addBook = document.querySelector(".message-box-buttons > .btn");
const cardContainer = document.querySelector('.card-container');

// toggles the message box container
// show or hide
function toggleMessageBox() {
  addBookContainer.classList.toggle("show");
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
}

// will use the current values of the input 
// to create a new book object and add to array
function addBookToArray() {
  const newBook = new Book(bookName.value, bookAuthor.value, bookPages.value);
  myLibrary.push(newBook);
  loadBooksToContainer();
  toggleMessageBox();
}

window.onload = function(){
  loadBooksToContainer();
}

// show the add book window
openAddBookContainer.addEventListener("click", toggleMessageBox);

// closes the add book window
closeAddBookContainer.addEventListener("click", toggleMessageBox);

// add book to array
addBook.addEventListener("click", function(){
  addBookToArray();
});




// Constructor for Books
function Book(name, author, pages) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.hasBeenRead = false;
}

// Create DOM entry for each books
function displayBooks(title, author, pages, hasBeenRead){
  // card containers
  const divCard = document.createElement('div');
  divCard.classList.add('card');
  const divCardOptions = document.createElement('div');
  divCardOptions.dataset.index = myLibrary.length - 1;
  divCardOptions.classList.add('card-options');

  // if has been read
  if(hasBeenRead === true){
    divCard.classList.add('completed');
  }

  // containers for title, author, pages and read status
  const dispTitle = document.createElement('h1');
  dispTitle.textContent = title;
  const dispAuthor = document.createElement('h3');
  dispAuthor.textContent = author;
  const dispPages = document.createElement('h3');
  dispPages.textContent = pages + " pages";

  // buttons
  const btnMarkAsRead = document.createElement('button');
  btnMarkAsRead.classList.add('btn');
  btnMarkAsRead.textContent = "Mark as read/unread";
  btnMarkAsRead.addEventListener('click', function(){
    toggleRead(this);
  });

  const btnRemoveBook = document.createElement('button');
  btnRemoveBook.classList.add('btn');
  btnRemoveBook.textContent = "Remove Book";
  // btnRemoveBook.addEventListener('click', );

  // append items
  divCard.appendChild(dispTitle);
  divCard.appendChild(dispAuthor);
  divCard.appendChild(dispPages);
  divCard.appendChild(divCardOptions);
  divCardOptions.appendChild(btnMarkAsRead);
  divCardOptions.appendChild(btnRemoveBook);

  // append card to card container
  cardContainer.appendChild(divCard);
}

// const book1 = new Book("A Tale of My Life", "Mark Bien", 1000);
// const book2 = new Book("Adventures of Lexi and Parsley", "Jacqueline Cruz", 2000);
// const book3 = new Book("Hello World!", "JavaScript", 5000);

// myLibrary.push(book1);
// myLibrary.push(book2);
// myLibrary.push(book3);

function loadBooksToContainer(){
  clearCardContainer();

  for(let i = 0; i < myLibrary.length; i++){
    let book = myLibrary[i];
    displayBooks(book.name, book.author, book.pages, book.hasBeenRead);
  }
}

function clearCardContainer(){
  cardContainer.innerHTML = "";
}

function toggleRead(item){
  const index = item.parentElement.dataset.index
  myLibrary[index].hasBeenRead = !myLibrary[index].hasBeenRead;
  console.log(myLibrary[index].hasBeenRead);

  clearCardContainer();
  loadBooksToContainer();
}