const bookContainer = document.querySelector(".book-container");

const bookshelf = {
  container: [],
  isBookInContainer(book) {
    return this.container.findIndex((item) => item.name === book.name);
  },
  addBookToShelf(title, author, pages) {
    const newBook = new Book(title, author, pages);
    this.container.push(newBook);
    this.populateBooksInContainer();
  },
  clearContainerDiv() {
    bookContainer.innerHTML = "";
  },
  createBook(bookObj) {
    const book = document.createElement("div");
    book.classList.add("book");
    const id = this.isBookInContainer(bookObj);
    book.setAttribute('id', id);

    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = bookObj.name;

    const author = document.createElement("h4");
    author.classList.add("author");
    author.textContent = `Book Author: ${bookObj.author}`;

    const pages = document.createElement("div");
    pages.classList.add("pages");
    pages.textContent = `Number of pages: ${bookObj.pages}`;

    // FIELDSET START
    const fieldset = document.createElement("fieldset");

    const legend = document.createElement("legend");
    legend.textContent = "Settings";

    const readStatusContainer = document.createElement("div");
    readStatusContainer.classList.add("read-status-container");

    const labelStatus = document.createElement("label");
    labelStatus.textContent = "Status";

    const selectReadStatus = document.createElement("select");
    selectReadStatus.setAttribute("name", "read-status");
    selectReadStatus.classList.add("options");

    const pending = document.createElement("option");
    pending.setAttribute("value", "pending");
    pending.textContent = "Pending";

    const ongoing = document.createElement("option");
    ongoing.setAttribute("value", "ongoing");
    ongoing.textContent = "Ongoing";

    const finished = document.createElement("option");
    finished.setAttribute("value", "finished");
    finished.textContent = "Finished";

    const abandoned = document.createElement("option");
    abandoned.setAttribute("value", "abandoned");
    abandoned.textContent = "Abandoned";

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.addEventListener('click', ()=> {
      this.removeBook(id);
    });

    selectReadStatus.appendChild(pending);
    selectReadStatus.appendChild(ongoing);
    selectReadStatus.appendChild(finished);
    selectReadStatus.appendChild(abandoned);
    selectReadStatus.addEventListener('change', ()=> {
      let status = selectReadStatus.value;
      status = `${status.charAt(0).toUpperCase()}${status.slice(1, status.length)}`;
      this.container[id].changeReadStatus(status);
    });

    fieldset.appendChild(legend);
    fieldset.appendChild(readStatusContainer);
    readStatusContainer.appendChild(labelStatus);
    readStatusContainer.appendChild(selectReadStatus);
    fieldset.appendChild(btn);
    // FIELDSET END

    book.appendChild(bookTitle);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(fieldset);

    return book;
  },
  populateBooksInContainer() {
    this.clearContainerDiv();
    // For each book in container
    this.container.forEach(book => {
      // Add book to innerHTML
      bookContainer.appendChild(this.createBook(book));      
    });    
  },
  removeBook(bookId) {
    this.container.splice(bookId, 1);
    this.populateBooksInContainer();
  },
};

function Book(name, author, pages) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readStatus = "Pending";
}

Book.prototype.changeReadStatus = function (newStatus) {
  switch (newStatus) {
    case "Ongoing":
    case "Pending":
    case "Finished":
    case "Abandoned":
      this.readStatus = newStatus;
      break;
    default:
      return;
  }
};

// bookshelf.addBookToShelf(
//   "Harry Potter and the Sorcerer's Stone",
//   "J.K. Rowlins",
//   1000,
// );

for (let i = 0; i < 15; i++) {
  bookshelf.addBookToShelf(`${i}`, 'J.K. Rowlins', 1000);
}

// Add transition to turn the add button 45deg so it will appear as X button
const addBtn = document.querySelector('#add');
const blurredMessageBox = document.querySelector('.blurredMessageBox');
addBtn.addEventListener('click', ()=> {
  addBtn.classList.toggle('rotate');
  blurredMessageBox.classList.toggle('show');

  clearTextBoxesFromMessageBox();
});

function clearTextBoxesFromMessageBox(){
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');

  title.value = '';
  author.value = '';
  pages.value = '';
}