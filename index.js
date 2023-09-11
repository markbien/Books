// Selectors
const addBookButton = document.querySelector('.addBookContainer');
const messageBoxBackground = document.querySelector('.messagebox-background')
const messageBoxCloseButton = document.querySelector('.messagebox span');
const addToListButton = document.querySelector('.add-button');
const booksContainer = document.querySelector('.books-container');

function Book(name, author, hasBeenRead) {
  this.name = name;
  this.author = author;
  this.hasBeenRead = hasBeenRead;

  this.toggleReadStatus = function(){
    if (!this.hasBeenRead) {
      this.hasBeenRead = true;
    } else {
      this.hasBeenRead = false;
    }
  }
}

const bookContainer = {
  container: [],
  addBookToContainer: function(book){
    this.container.push(book);
    createBookInDom(book.name, book.author, book.hasBeenRead);
  },
  toggleBookReadStatusInContainer: function(bookName) {
    const bookExists = this.container.find(book => {
      if (book.name === bookName) {
        book.toggleReadStatus();
        return;
      }
    });
  },
  removeBookInContainer: function(bookName){
    this.container = this.container.filter(book =>{
      return book.name !== bookName;
    });
    this.loadDataToContainer();
  },
  loadDataToContainer: function(){
    booksContainer.textContent = '';
    for (let i = 0; i < this.container.length; i++){
      createBookInDom(this.container[i].name, this.container[i].author, this.container[i].hasBeenRead);
    }
  },
}

window.onload = function(){
  const book1 = new Book("Harry Potter", "J.K.Rowlins", false);
  const book2 = new Book("Book2", "Author2", true);
  const book3 = new Book("Book3", "Author3", false);
  
  bookContainer.addBookToContainer(book1);
  bookContainer.addBookToContainer(book2);
  bookContainer.addBookToContainer(book3);
}

function toggleMessageBoxAndAddBookButton(){
  messageBoxBackground.classList.toggle('show');
  addBookButton.classList.toggle('hide');
}

function clearFieldsFromAddBookForm(){
  const bookName = document.querySelector('#book-name').value;
  const bookAuthor = document.querySelector('#book-author').value;
  const readStatus = document.querySelector('#isCompleted').checked;

  bookContainer.addBookToContainer(new Book(bookName, bookAuthor, readStatus));
}

function createBookInDom(newBookName, newBookAuthor, newBookReadStatus){
  const bookDiv = document.createElement('div');
  bookDiv.dataset.bookName = newBookName;
  bookDiv.classList.add('book');

  const bookDetails = document.createElement('div');
  bookDetails.classList.add('book-details');

  const bookNameLabel = document.createElement('p');
  bookNameLabel.classList.add("book-name");
  bookNameLabel.textContent = `${newBookName}`;

  const bookAuthorLabel = document.createElement('p');
  bookAuthorLabel.classList.add('book-author');
  bookAuthorLabel.textContent = `${newBookAuthor}`;

  const bookFunctionsDiv = document.createElement('div');
  bookFunctionsDiv.classList.add('book-functions');

  const bookReadStatusDiv = document.createElement('div');
  bookReadStatusDiv.classList.add('book-read-status');
  const completedStatusSpan = document.createElement('span');
  completedStatusSpan.textContent = "I have completed this:";
  const completedStatusCheckbox = document.createElement('input');
  completedStatusCheckbox.type = 'checkbox';

  if (newBookReadStatus) {
    completedStatusCheckbox.checked = true;
  } else {
    completedStatusCheckbox.checked = false;
  }

  const bookRemoveDiv = document.createElement('div');
  bookRemoveDiv.classList.add('book-remove');
  const removeBookButton = document.createElement('input');
  removeBookButton.type = 'button';
  removeBookButton.value = "Remove book";

  bookDiv.appendChild(bookDetails);
  bookDiv.appendChild(bookFunctionsDiv);
  
  bookDetails.appendChild(bookNameLabel);
  bookDetails.appendChild(bookAuthorLabel);

  bookFunctionsDiv.appendChild(bookReadStatusDiv);
  bookFunctionsDiv.appendChild(bookRemoveDiv);

  bookReadStatusDiv.appendChild(completedStatusSpan);
  bookReadStatusDiv.appendChild(completedStatusCheckbox);

  bookRemoveDiv.appendChild(removeBookButton);

  booksContainer.appendChild(bookDiv);

  completedStatusCheckbox.addEventListener('click', function(){
    const currentBook = this.parentElement.parentElement.parentElement;
    const bookName = currentBook.dataset.bookName;

    bookContainer.toggleBookReadStatusInContainer(bookName);
  });

  removeBookButton.addEventListener('click', function(){
    const currentBook = this.parentElement.parentElement.parentElement;
    const bookName = currentBook.dataset.bookName;

    bookContainer.removeBookInContainer(bookName);
  });
}

addBookButton.addEventListener('click', ()=> {
  toggleMessageBoxAndAddBookButton();
});

messageBoxCloseButton.addEventListener('click', ()=>{
  toggleMessageBoxAndAddBookButton();
});



addToListButton.addEventListener('click', function(e){
  e.preventDefault();
  clearFieldsFromAddBookForm();
  toggleMessageBoxAndAddBookButton();
});