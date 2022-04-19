const $ = document.querySelector.bind(document);

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

    set status(newVal){
        this.#status = newVal;
    }

    showDetails(){
        console.log(`Book Name: ${this.#title}, Author: ${this.#author}, Pages: ${this.#pages}, Has been read: ${this.#status}`);
    }
}

const library = (()=>{
    const newBook = new Book('H.P.', 'J.K.Rowlins', 1000);
    newBook.pages = 1500;
    newBook.showDetails();
})();

const displayController = (()=>{
    
})();