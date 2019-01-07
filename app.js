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
        const books = Store.getBooks();

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

    static showAlerts(message, className, position) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        const table = document.querySelector('#book-table');
        if(position === 'upper') {
            container.insertBefore(div, form);
        } else {
            container.insertBefore(div, table);
        }

        // Prompt to vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
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

// Store Class: Handles Storage    // local storage only stores things as strings
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books =[];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

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
        UI.showAlerts('Please fill in all fields', 'warning', 'upper');
    } else {
        // Instantiate book
        const book = new Book(title, author, isbn); 
    
        // Add book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);
    
        // Show Success Message
        UI.showAlerts('Book Added', 'success', 'lower');

        // Clear fields
        UI.clearFields();
    }

});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show  message
    UI.showAlerts('Book Removed', 'danger', 'lower');
});