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