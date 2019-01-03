// Book Class: Represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const storedBooks = [
            {
                title: 'Ruination',
                author: 'Timilehin Bankole',
                isbn: '3434434'
            },
            {
                title: 'Ruination 2',
                author: 'Timilehin Bankole',
                isbn: '3434435'
            },
            {
                title: 'Ruination 3',
                author: 'Timilehin Bankole',
                isbn: '3434436'
            }
        ];

        const books = storedBooks;

        books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list'); // Grabbing our list from the DOM

        const row = document.createElement('tr');

        // Creating a row 
        row.innerHTML = ` 
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

        // Appending the row to the list
        list.appendChild(row)
    }

    

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el) {
        if( el.classList.contains('delete') ) {
            el.parentElement.parentElement.remove();
        }
    } 
}

// Store Class: Handles Storage


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if(title === '' || author === '' || isbn === '') {
        alert('Please fill in all fields!')
    } else {
        // Instantiate book
        const book = new Book(title, author, isbn); 
    
        // Add book to list
        UI.addBookToList(book);
    
        // Clear fields
        UI.clearFields();
    }

});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
});