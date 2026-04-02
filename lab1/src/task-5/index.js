import { LIBRARY_NAME, books } from "./data.js";
import BookCollection from "./utils.js";
import { getBooksByGenre as byGenre, getAveragePages, getOldestBook } from "./utils.js";

console.log("=== Завдання 5: Модулі ===");

console.log("Бібліотека:", LIBRARY_NAME);
console.log("Всього книг:", books.length);

console.log("Книги жанру 'programming':", byGenre(books, "programming"));
console.log("Середня кількість сторінок:", getAveragePages(books));
console.log("Найстаріша книга:", getOldestBook(books));

const collection = new BookCollection(books);
console.log("Відсортовано за роком:", collection.getSortedByYear());
console.log("Кількість книг у колекції:", collection.count);

collection.addBook({
  title: "New Book",
  author: "Someone",
  year: 2020,
  pages: 200,
  genre: "novel",
});

console.log("Після додавання:", collection.count);
