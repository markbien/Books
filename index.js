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

    

    // const newBook = new Book('H.P.', 'J.K.Rowlins', 1000);
    // const newBook2 = new Book('ASDF', 'QWER', 500);
    // library.addBook(newBook);
    // library.addBook(newBook2);
    // library.showBooks();

    // console.log(library.getBook(0));
    // library.getBook(0).toggleStatus();
    // console.log(library.getBook(0));
})();