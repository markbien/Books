const bookContainer = document.querySelector(".book-container");

const bookshelf = {
  container: [],
  isBookInContainer(book) {
    return this.container.findIndex((item) => item.name === book.name);
  },
  removeBook(bookToRemove) {
    const bookIndex = this.isBookInContainer(bookToRemove);
    if (bookIndex === -1) return;
    this.container.splice(bookIndex, 1);
  },
  addBookToShelf(book) {
    this.container.push(book);
  },
  clearContainerDiv() {
    bookContainer.innerHTML = "";
  },
  createBook(bookObj) {
    const book = document.createElement("div");
    book.classList.add("book");

    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = bookObj.name;

    const author = document.createElement("h4");
    author.classList.add("author");
    author.textContent = bookObj.author;

    const pages = document.createElement("div");
    pages.classList.add("pages");
    pages.textContent = `${bookObj.pages} pages`;

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

    selectReadStatus.appendChild(pending);
    selectReadStatus.appendChild(ongoing);
    selectReadStatus.appendChild(finished);
    selectReadStatus.appendChild(abandoned);

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
    // For each book in container
    this.container.forEach(book => {
      console.log(book);
    });
    // Add book to innerHTML
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

// function createBook(bookObj) {
//   const book = document.createElement("div");
//   book.classList.add("book");

//   const bookTitle = document.createElement("h3");
//   bookTitle.classList.add("book-title");
//   bookTitle.textContent = bookObj.name;

//   const author = document.createElement("h4");
//   author.classList.add("author");
//   author.textContent = bookObj.author;

//   const pages = document.createElement("div");
//   pages.classList.add("pages");
//   pages.textContent = `${bookObj.pages} pages`;

//   // FIELDSET START
//   const fieldset = document.createElement("fieldset");

//   const legend = document.createElement("legend");
//   legend.textContent = "Settings";

//   const readStatusContainer = document.createElement("div");
//   readStatusContainer.classList.add("read-status-container");

//   const labelStatus = document.createElement("label");
//   labelStatus.textContent = "Status";

//   const selectReadStatus = document.createElement("select");
//   selectReadStatus.setAttribute("name", "read-status");
//   selectReadStatus.classList.add("options");

//   const pending = document.createElement("option");
//   pending.setAttribute("value", "pending");
//   pending.textContent = "Pending";

//   const ongoing = document.createElement("option");
//   ongoing.setAttribute("value", "ongoing");
//   ongoing.textContent = "Ongoing";

//   const finished = document.createElement("option");
//   finished.setAttribute("value", "finished");
//   finished.textContent = "Finished";

//   const abandoned = document.createElement("option");
//   abandoned.setAttribute("value", "abandoned");
//   abandoned.textContent = "Abandoned";

//   const btn = document.createElement("button");
//   btn.textContent = "Delete";

//   selectReadStatus.appendChild(pending);
//   selectReadStatus.appendChild(ongoing);
//   selectReadStatus.appendChild(finished);
//   selectReadStatus.appendChild(abandoned);

//   fieldset.appendChild(legend);
//   fieldset.appendChild(readStatusContainer);
//   readStatusContainer.appendChild(labelStatus);
//   readStatusContainer.appendChild(selectReadStatus);
//   fieldset.appendChild(btn);
//   // FIELDSET END

//   book.appendChild(bookTitle);
//   book.appendChild(author);
//   book.appendChild(pages);
//   book.appendChild(fieldset);

//   return book;
// }

const harryPotter = new Book(
  "Harry Potter and the Sorcerer's Stone",
  "J.K. Rowlins",
  1000
);
const bible = new Book("The Bible", "Unknown", 1500);
const random = new Book("Random", "Rand", 1000);

bookshelf.addBookToShelf(harryPotter);
bookshelf.addBookToShelf(bible);

// bookContainer.appendChild(bookshelf.createBook(harryPotter));

bookshelf.populateBooksInContainer();
