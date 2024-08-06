const bookContainer = document.querySelector('.book-container');

      const bookshelf = {
        container: [],
        isBookInContainer(book) {
          return this.container.findIndex(item => item.name === book.name);
        },
        removeBook(bookToRemove){
          const bookIndex = this.isBookInContainer(bookToRemove);
          if (bookIndex === -1) return;
          this.container.splice(bookIndex, 1);
        },
        addBookToShelf(book){
          this.container.push(book);
        },
        clearContainerDiv(){
          bookContainer.innerHTML = '';
        },
        populateBooksInContainer(){
          
        },
      };



      function Book(name, author, pages) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.readStatus = "Pending";          
      }

      Book.prototype.changeReadStatus = function(newStatus){
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
      }

      function createBook(bookObj){
        const book = document.createElement('div');
        book.classList.add("book");

        const bookTitle = document.createElement('h3');
        bookTitle.textContent = bookObj.name;

        const author = document.createElement('h4');
        author.textContent = bookObj.author;

        const pages = document.createElement('div');
      }

      const harryPotter = new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowlins", 1000);
      const bible = new Book("The Bible", "Unknown", 1500);
      const random = new Book("Random", "Rand", 1000);

      bookshelf.addBookToShelf(harryPotter);
      bookshelf.addBookToShelf(bible);