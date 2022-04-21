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

    const addBook = book => {
        const bookIndex = libraryArray.findIndex(bookie => bookie.title.toLowerCase() === book.title.toLowerCase());
        if(bookIndex === -1) libraryArray.push(book);
    }

    const toggleReadStatus = bookName => {
        const ind = libraryArray.map(book => book.title).findIndex(title => title === bookName);
        libraryArray[ind].toggleStatus();
    }
    const showBooks = ()=> {
        return libraryArray;
    }
    const findBook = inp => {
        return libraryArray.filter(book => book.title.toLowerCase().includes(inp.toLowerCase()));        
    };

    const removeBook = bookTitle => {
        const bookToRemove = libraryArray.map(book => book.title).findIndex(title => title === bookTitle);
        libraryArray.splice(bookToRemove, 1);
    }

    function searchFilter(bookName){
        return libraryArray.filter(book => book.title.toLowerCase().includes(bookName));
    }

    return {addBook, showBooks, findBook, toggleReadStatus, removeBook, searchFilter};
})();

const displayController = (()=>{
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const cardContainer = $('.card-container');
    const addBookContainer = $('.addBookContainer');
    const addBookButton = $('.option > .btn');
    const closeAddBook = $('.message-box-container > span');
    const addNewBook = $('.message-box-buttons > .btn');
    const searchBox = $('#searchBook');
    const list = $('.search-container');
    const ul = list.querySelector('ul');

    addBookButton.addEventListener('click', ()=> {
        addBookContainer.classList.add('show');
    });

    closeAddBook.addEventListener('click', ()=> {
        clearWindowAndEntries();
    });

    addNewBook.addEventListener('click', ()=>{
        const bookTitle = $('#bookName');
        const bookAuthor = $('#bookAuthor');
        const bookPages = $('#bookPages');
        
        const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value);
        library.addBook(newBook);

        clearWindowAndEntries();
        clearDOMEntries();
        createBookEntries();
    });

    searchBox.addEventListener('keyup', showResults);

    function clearWindowAndEntries(){
        addBookContainer.classList.remove('show');
        addBookContainer.querySelectorAll('input').forEach(inp => inp.value ="");
    }

    function clearDOMEntries(){
        cardContainer.innerHTML = '';
    }

    function createBookEntries(){
        library.showBooks().forEach(book => {
            createBookDOM(book.title, book.author, book.pages, book.status);
        });
    }

    function createBookDOM(title, author, pages, status){        
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
        readStatus.dataset.title = title;
        const btnDiv = document.createElement('div');
        const removeBTN = document.createElement('button');
        removeBTN.textContent = 'Remove book';
        removeBTN.dataset.title = title;

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

        readStatus.addEventListener('click', function(){
            const bookTitle = this.dataset.title;
            library.toggleReadStatus(bookTitle);
            clearDOMEntries();
            createBookEntries();
        });

        removeBTN.addEventListener('click', function(){
            library.removeBook(this.dataset.title);
            clearDOMEntries();
            createBookEntries();
        });
    }

    // function showResults(){
    //     const results = library.findBook(this.value);
    //     ul.innerHTML = '';
    //     results.forEach(result => {
    //         showResultsInDom(result.title);
    //     });

    //     if(this.value === ''){
    //         ul.innerHTML = '';
    //     }
    // }

    // function showResultsInDom(result){
    //     const item = document.createElement('li');
    //     item.textContent = result;

    //     ul.appendChild(item);
    // }

    function showResults(){
        // library.searchFilter(this.value.toLowerCase());
        clearDOMEntries();
        if(this.value === '') createBookEntries();
        else {
            library.searchFilter(this.value.toLowerCase()).forEach(book => {
                createBookDOM(book.title, book.author, book.pages, book.status);
            });
        }
    }

    const newBook = new Book('H.P.', 'J.K.Rowlins', 1000);
    const newBook2 = new Book('ASDF', 'QWER', 500);
    const newBook3 = new Book('ASD', 'QWER', 500);
    library.addBook(newBook);
    library.addBook(newBook2);
    library.addBook(newBook3);

    createBookEntries();
})();