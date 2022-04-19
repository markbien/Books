const $ = document.querySelector.bind(document);

class Book {
    #title; 
    #author;
    #pages;
    #status;
    constructor(title, author, pages){
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#status = false;
    }

    get title(){
        return this.#title;
    }
    
    get author(){
        return this.#author;
    }

    get pages(){
        return this.#pages;
    }

    get status(){
        return this.#status;
    }

    toggleStatus(){
        this.#status = !this.#status;
    }

    showDetails(){
        console.log(`Book Name: ${this.#title}, Author: ${this.#author}, Pages: ${this.#pages}, Has been read: ${this.#status}`);
    }
}

const library = (()=>{
    let libraryArray = [];

    const addBook = book => libraryArray.push(book);
    const getBook = index => libraryArray[index];
    const showBooks = ()=> {
        return libraryArray;
    }

    return {addBook, getBook, showBooks};
})();

const displayController = (()=>{
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

    function createBookEntries(){
        library.showBooks().forEach(book => {
            createBookDOM(book.title, book.author,  book.pages, book.status);
        });
    }

    function createBookDOM(title, author, pages, status){
        const cardContainer = $('.card-container');
        const card = document.createElement('div');
        card.classList.add('card');
        const h1Title = document.createElement('h1');
        const hrFirst = document.createElement('hr');
        const h3Author = document.createElement('h3');
        const hrSecond = document.createElement('hr');
        const h3Pages = document.createElement('h3');
        const hrThird = document.createElement('hr');
        const cardOptions = document.createElement('div');
        cardOptions.classList.add('card-options');
        const divStatus = document.createElement('div');
        const labelStatusName = document.createElement('label');
        labelStatusName.setAttribute('for', 'readStatus')
        labelStatusName.textContent = "Has been read?";
        const readStatus = document.createElement('input');
        readStatus.setAttribute('type', 'checkbox');
        readStatus.setAttribute('id', 'readStatus');
        const btnDiv = document.createElement('div');
        const removeBTN = document.createElement('button');
        removeBTN.textContent = 'Remove book';

        h1Title.textContent = title;
        h3Author.textContent = author;
        h3Pages.textContent = pages;
        if(status === true) readStatus.checked = true;
        
        card.appendChild(h1Title);
        card.appendChild(hrFirst);
        card.appendChild(h3Author);
        card.appendChild(hrSecond);
        card.appendChild(h3Pages);
        card.appendChild(hrThird);
        card.appendChild(cardOptions);
        cardOptions.appendChild(divStatus);
        divStatus.appendChild(labelStatusName);
        divStatus.appendChild(readStatus);
        cardOptions.appendChild(btnDiv);
        btnDiv.appendChild(removeBTN);
        cardContainer.appendChild(card);
    }

    const newBook = new Book('H.P.', 'J.K.Rowlins', 1000);
    // const newBook2 = new Book('ASDF', 'QWER', 500);
    library.addBook(newBook);
    // library.addBook(newBook2);
    // library.showBooks();

    // console.log(library.getBook(0));
    // library.getBook(0).toggleStatus();
    // console.log(library.getBook(0));

    createBookEntries();
})();