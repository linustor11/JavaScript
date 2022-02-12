class Book {
   constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
   }
}

class UI {
   addBookToList(book) {
      const list = document.getElementById('book-list');
      //create tr element
      const row = document.createElement('tr');
      //insert cols
      row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
      `;
   
      list.appendChild(row);
   
   }

   showAlert(message, className) {
      // Create a div
      const div = document.createElement('div');
      // Add Text
      div.className = `alert ${className}`;
      // Add Text
      div.appendChild(document.createTextNode(message));
      //Get form
      const form = document.querySelector('#book-form');
      // Get parent
      const container = document.querySelector('.container');
      // Insert Before
      container.insertBefore(div, form);

      //timeout after 3 seconds
      setTimeout(function() {
         document.querySelector('.alert').remove();
      }, 3000);
   }

   deleteBook(target) {
      if(target.className === 'delete') {
         target.parentElement.parentElement.remove();
      }
   }

   clearFields() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
   }
}

// Local Storage Class
class Store {
   static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
         books = [];
      } else {
         books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
   }

   static displayBooks() {
      const books = Store.getBooks();

      books.forEach(function(book){
         const ui = new UI;

         //Add Book to UI
         ui.addBookToList(book);
      });

   }

   static addBook(book) {
      const books = Store.getBooks();

      books.push(book);

      localStorage.setItem('books', JSON.stringify(books));

   }

   static removeBook(isbn) {
      const books = Store.getBooks();

      books.forEach(function(book, index){
         if(book.isbn === isbn) {
            books.splice(index, 1);
         }
      });
      localStorage.setItem('books', JSON.stringify(books));
   }

}

//DOM Load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);



// Event Listener for add Book
document.getElementById('book-form').addEventListener('submit', function(e){
   // Get form values
   const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
         isbn = document.getElementById('isbn').value;

   // Instantiate Book
   const book = new Book(title, author, isbn);

   // Instantiate UI
   const ui = new UI();
   // console.log(ui);

   // Validate
   if(title === '' || author === '' || isbn === '') {
      // Error alert
      ui.showAlert('Please fill in all the fields', 'error');
   } else {
      //Add Book To List
      ui.addBookToList(book);

      // Add Book to LS
      Store.addBook(book);

      //Show Success
      ui.showAlert('Book Added!', 'sucess');

      // clear fields
      ui.clearFields();

   }

   e.preventDefault();
});

// Event Listener for delete Book
document.getElementById('book-list').addEventListener('click', function(e){
   //Instantiate UI
   const ui = new UI();
   
   // Delete Book
   ui.deleteBook(e.target);

   //Remove from LS
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

   //Show message
   ui.showAlert('Book Removed!', 'sucess');


   e.preventDefault();
});