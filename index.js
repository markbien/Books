const option = document.querySelector('.option');
const openAddContainer = option.querySelector('button');
const addBookContainer = document.querySelector('.addBookContainer');
const subContainer = document.querySelector('.subContainer')
const closeButton = subContainer.querySelector('span');
const inputs = subContainer.querySelectorAll('input');
const addBook = subContainer.querySelector('button');
const bookName = subContainer.querySelector('#book-name');
const bookAuthor = subContainer.querySelector('#book-author');
const bookPages = subContainer.querySelector('#book-pages');
const cardContainer = document.querySelector('.card-container');
let myLibrary = [];

// Book constructor
function Book(name, author, pages, hasBeenRead){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}

function createBookEntryInDOM(index, title, author, pages){
    // Create the DIVs first
    const card = document.createElement('div');
    const divDetails = document.createElement('div');
    const divOptions = document.createElement('div');

    // Create the items
    const img = document.createElement('img');
    const bookTitle = document.createElement('h1');
    const bookPerson = document.createElement('h3');
    const bookPage = document.createElement('p');
    const bookStatus = document.createElement('p');
    const toggleStatus = document.createElement('button');
    const removeBook = document.createElement('button');

    // Add the class
    card.classList.add('card');
    divDetails.classList.add('book-details');
    divOptions.classList.add('book-options');
    toggleStatus.classList.toggle('toggleRead');
    removeBook.classList.add('removeButton');

    // Set the attributes
    img.setAttribute('src', 'images/book-cover.png');
    removeBook.setAttribute('data-index', index);

    // Text contents
    bookTitle.textContent = title;
    bookAuthor.textContent = author;
    bookPage.textContent = pages;
    bookStatus.textContent = "Has not been read yet";
    toggleStatus.textContent = "Mark as read/unread";
    removeBook.textContent = "Remove book";

    // Append the items
    card.appendChild(img);
    card.appendChild(divDetails);
    card.appendChild(divOptions);
    divDetails.appendChild(bookTitle);
    divDetails.appendChild(bookPerson);
    divDetails.appendChild(bookPage);
    divDetails.appendChild(bookStatus);
    divOptions.appendChild(toggleStatus);
    divOptions.appendChild(removeBook);
    cardContainer.appendChild(card);
}

function addBookToLibrary(){
    // Create tracker for the number of items currently in
    // the myLibrary array
    let index = myLibrary.length;

    // Create a new book based on the values from the inputs
    const newBook = new Book(bookName.value, bookAuthor.value, bookPages.value, false);

    // push newBook to the myLibrary array
    myLibrary.push(newBook);

    // Create a new entry in the DOM based on the inputs
    createBookEntryInDOM(index, bookName.value, bookAuthor.value, bookPages.value);
    
    // increment the index based on the current number of items in the myLibrary array
    index++;

    // Clear inputs in the add book section
    clearInputs();

    // remove the addBook window
    addBookContainer.style.display = 'none';
}

// responsible for clearing the values of the input container/window
function clearInputs(){
    for(inp of inputs){
        inp.value = "";
    }
}

// Adds function to mark current book as read/unread
Book.prototype.read = function(){
    this.hasBeenRead = !this.hasBeenRead;
}

// let myBook = new Book("Harry Potter", "J.K. Rowlins", 1000, false);

// opens the add book window
openAddContainer.addEventListener('click', function(){
    addBookContainer.style.display = 'flex';
    clearInputs();
});

// closes the add book window
closeButton.addEventListener('click', function(){
    addBookContainer.style.display = 'none';
    clearInputs();
});

// adds current book to the myLibrary array
addBook.addEventListener('click', addBookToLibrary);