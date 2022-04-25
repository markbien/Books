class Book {
    #title; 
    #author;
    #pages;
    #status;
    constructor(title, author, pages, status = false){
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#status = status;
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
}

const library = (()=>{
    let libraryArray = [];

    const addBook = book => {
        const bookIndex = library.some(bookObj => book.title.toLowerCase() === bookObj.title.toLowerCase());
        if(!bookIndex) libraryArray.push(book);
    }

    const toggleReadStatus = bookName => {
        const ind = libraryArray.map(book => book.title).findIndex(title => title === bookName);
        libraryArray[ind].toggleStatus();
        console.log(libraryArray[ind]);
        saveToLocal();
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
        saveToLocal();
    }

    function saveToLocal(){
        let newArr = libraryArray.map(book => ({
            title: book.title,
            author: book.author,
            pages: book.pages,
            status: book.status
        }));

        localStorage.setItem('library', JSON.stringify(newArr));
    }

    function restoreLocal(){
        let newArr = JSON.parse(localStorage.getItem('library'));
        if(newArr) newArr = newArr.map(book => JSONtoBook(book))
        libraryArray = newArr ? newArr : [];
    }

    const JSONtoBook = book => {
        return new Book(book.title, book.author, book.pages, book.status);
    }

    function searchFilter(bookName){
        return libraryArray.filter(book => book.title.toLowerCase().includes(bookName));
    }

    return {addBook, showBooks, findBook, toggleReadStatus, removeBook, searchFilter, saveToLocal, restoreLocal};
})();

const displayController = (()=>{
    const $ = document.querySelector.bind(document);
    const cardContainer = $('.card-container');
    const addBookContainer = $('.addBookContainer');
    const addBookButton = $('.option > .btn');
    const closeAddBook = $('.message-box-container > span');
    const addNewBook = $('.message-box-buttons > .btn');
    const searchBox = $('#searchBook');
    const bookPages = $('#bookPages');

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

        library.saveToLocal();

        clearWindowAndEntries();
        clearDOMEntries();
        createBookEntries();
    });

    searchBox.addEventListener('keyup', showResults);
    bookPages.onkeydown = function(e){
        console.log(e.keyCode);
        if(!((e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8 ||
            (e.keyCode > 95 && e.keyCode < 106))){
            return false;
        }        
    }

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

    function showResults(){
        clearDOMEntries();
        if(this.value === '') createBookEntries();
        else {
            library.searchFilter(this.value.toLowerCase()).forEach(book => {
                createBookDOM(book.title, book.author, book.pages, book.status);
            });
        }
    }

    library.restoreLocal();
    createBookEntries();
})();