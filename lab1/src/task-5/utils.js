export function getBooksByGenre(books, genre) {
  return books.filter((b) => b.genre === genre);
}

export function getAveragePages(books) {
  return books.reduce((sum, b) => sum + b.pages, 0) / books.length;
}

export function getOldestBook(books) {
  return books.reduce((oldest, b) => (b.year < oldest.year ? b : oldest));
}

export default class BookCollection {
  constructor(books) {
    this.books = [...books];
  }

  getSortedByYear() {
    return [...this.books].sort((a, b) => a.year - b.year);
  }

  addBook(book) {
    this.books.push(book);
  }

  get count() {
    return this.books.length;
  }
}
