// Selectors
const addBookButton = document.querySelector('.addBookContainer');
const messageBoxBackground = document.querySelector('.messagebox-background')
const messageBoxCloseButton = document.querySelector('.messagebox span');

addBookButton.addEventListener('click', ()=> {
  toggleMessageBoxAndAddBookButton();
});

messageBoxCloseButton.addEventListener('click', ()=>{
  toggleMessageBoxAndAddBookButton();
});

function toggleMessageBoxAndAddBookButton(){
  messageBoxBackground.classList.toggle('show');
  addBookButton.classList.toggle('hide');
}

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