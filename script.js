"use strict";

const bookShelf = (() => {
  let container;

  const checkItemsInContainer = () => {
    return container;
  };

  const returnBookObj = (index) => {
    return container[index];
  };

  const getBookIndex = (bookName) =>
    container.findIndex((item) => item.name === bookName);

  const clearContainer = () => (container = []);

  const addBookToShelf = (title, author, pages, readStatus) => {
    const newBook = new Book(title, author, pages, readStatus);
    container.push(newBook);
  };

  const removeBook = (bookName) => {
    const index = getBookIndex(bookName);
    container.splice(index, 1);
  };

  const saveCurrentStateToBrowser = () => {
    const newArr = [];
    container.forEach(book =>{ 
      newArr.push(book.toJSON()); // Get the public properties
    });
    localStorage.setItem("bookShelf", JSON.stringify(newArr));
  };

  function getCurrentStateFromBrowser() {
    // If bookShelf can't be found in localStorage then assign empty array
    const localStorageBookShelf =
      JSON.parse(localStorage.getItem("bookShelf")) || [];
    return localStorageBookShelf.map(
      (book) => new Book(book.name, book.author, book.pages, book.readStatus)
    );
  }

  const init = () => {
    container = getCurrentStateFromBrowser();
    domHandler.populateBooksFromContainerToDiv(container);
  };

  return {
    init,
    clearContainer,
    addBookToShelf,
    removeBook,
    checkItemsInContainer,
    getBookIndex,
    returnBookObj,
    saveCurrentStateToBrowser,
    getCurrentStateFromBrowser,
  };
})();

const domHandler = (() => {
  const bookContainer = document.querySelector(".book-container");
  const clearContainerDiv = () => (bookContainer.innerHTML = "");

  const populateBooksFromContainerToDiv = (container) => {
    clearContainerDiv();
    container.forEach((book) => {
      bookContainer.appendChild(createBook(book));
    });

    const noItemsMessageBox = document.querySelector(".no-books-in-list");
    if (bookShelf.checkItemsInContainer().length === 0) {
      noItemsMessageBox.classList.add("show");
    } else {
      noItemsMessageBox.classList.remove("show");
    }
  };

  const createBook = (bookObj) => {
    const book = document.createElement("div");
    book.classList.add("book");

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
    btn.addEventListener("click", () => {
      bookShelf.removeBook(bookObj.name);
      populateBooksFromContainerToDiv(bookShelf.checkItemsInContainer());
      bookShelf.saveCurrentStateToBrowser();
    });

    selectReadStatus.appendChild(pending);
    selectReadStatus.appendChild(ongoing);
    selectReadStatus.appendChild(finished);
    selectReadStatus.appendChild(abandoned);
    selectReadStatus.addEventListener("change", () => {
      let status = selectReadStatus.value;
      status = `${status.charAt(0).toUpperCase()}${status.slice(
        1,
        status.length
      )}`;

      const bookIndex = bookShelf.getBookIndex(bookObj.name);
      bookShelf.returnBookObj(bookIndex).changeReadStatus(status);
      bookShelf.saveCurrentStateToBrowser();
    });

    selectReadStatus.value = bookObj.readStatus.toLowerCase();

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
  };

  // Add transition to turn the add button 45deg so it will appear as X button
  const addBtn = document.querySelector("#add");
  const blurredMessageBox = document.querySelector(".blurredMessageBox");
  addBtn.addEventListener("click", () => {
    toggleMessageBoxAndAddButton();
  });

  function toggleMessageBoxAndAddButton() {
    addBtn.classList.toggle("rotate");
    blurredMessageBox.classList.toggle("show");
    clearTextBoxesFromMessageBox();
  }

  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const errorMessage = document.querySelector('.error');

  title.addEventListener('input', ()=> {
    if (title.validity.valid) {
      errorMessage.textContent = "";
      errorMessage.className = "error";
    } else {
      showError();
    }
  });

  author.addEventListener('input', ()=> {
    if (author.validity.valid) {
      errorMessage.textContent = "";
      errorMessage.className = "error";
    } else {
      showError();
    }
  });

  pages.addEventListener('input', ()=> {
    if (pages.validity.valid) {
      errorMessage.textContent = "";
      errorMessage.className = "error";
    } else {
      showError();
    }
    console.log(pages.validity.valid);
  });

  function showError(){
    if (title.validity.valueMissing) {
      errorMessage.textContent = "Please enter a valid title name for this book.";
    } else if (author.validity.valueMissing) {
      errorMessage.textContent = "Please enter a valid author name for this book.";
    } else if (pages.validity.valueMissing) {
      errorMessage.textContent = "Please enter how many pages this book has.";
    } else if (pages.validity.rangeUnderflow) {
      errorMessage.textContent = `${pages.value} is invalid. Enter a valid number.`;
    }

    errorMessage.classList.add("show");
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', (e)=> {
    if (!title.validity.valid || !author.validity.valid || !pages.validity.valid) {
      showError();
      e.preventDefault();
    }
  });

  function clearTextBoxesFromMessageBox() {
    title.value = "";
    author.value = "";
    pages.value = "";
  }

  const addBookToContainerBtn = document.querySelector("#addBtn");
  addBookToContainerBtn.addEventListener("click", () => {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    if (bookShelf.getBookIndex(title.value) !== -1) {
      alert("This book already exists in the list!");
      return;
    } else if (title.value === "" || author.value === "" || pages.value === "") {
      return;
    }

    bookShelf.addBookToShelf(title.value, author.value, pages.value);
    toggleMessageBoxAndAddButton();
    populateBooksFromContainerToDiv(bookShelf.checkItemsInContainer());
    bookShelf.saveCurrentStateToBrowser();
  });

  return {
    createBook,
    clearContainerDiv,
    populateBooksFromContainerToDiv,
  };
})();

class Book {
  #name;
  #author;
  #pages;
  #readStatus;

  constructor(name, author, pages, readStatus = "Pending") {
    this.#name = name;
    this.#author = author;
    this.#pages = pages;
    this.#readStatus = readStatus;
  }

  get name() {
    return this.#name;
  }

  get author() {
    return this.#author;
  }

  get pages() {
    return this.#pages;
  }

  get readStatus() {
    return this.#readStatus;
  }

  toJSON() { // Required because JSON.stringify can't access private properties
    return {
      name: this.#name,
      author: this.#author,
      pages: this.#pages,
      readStatus: this.#readStatus,
    };
  }

  changeReadStatus(newStatus) {
    switch (newStatus) {
      case "Ongoing":
      case "Pending":
      case "Finished":
      case "Abandoned":
        this.#readStatus = newStatus;
        break;
      default:
        return;
    }
  }
}
bookShelf.init();

// const title = document.querySelector('#title');
// title.addEventListener('input', function(){
//   if (title.validity.valueMissing || title.value === "") {
//     title.setCustomValidity("Please enter a title for this book.");
//   } else if (title.validity.valid) {
//     title.setCustomValidity("");
//   }
// });

// const author = document.querySelector('#author');
// author.addEventListener('input', function(){
//   if (author.validity.valueMissing) {
//     author.setCustomValidity("Please enter an author for this book.");
//   } else if (author.validity.valid) {
//     author.setCustomValidity("");
//   }
// });

// const pages = document.querySelector("#pages");
// pages.addEventListener('input', function(){
//   console.log("test")
//   if (pages.validity.rangeUnderflow) {
//     pages.setCustomValidity(`Please enter a valid number of pages. You entered "${pages.value} pages."`)
//     console.log("underflow")
//   } else if (pages.validity.valid) {
//     pages.setCustomValidity("");
//   }
// });