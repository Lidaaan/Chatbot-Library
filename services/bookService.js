import fs from 'fs'

// Lecture du fichier json (fausse bdd)
const readLibraryData = () => {
  const jsonData = fs.readFileSync('./config/library.json', 'utf8');
  return JSON.parse(jsonData);
};

const bookService = {
  // Récupération des info d'un livre par son nom
    getBookInfoByBookName : (bookName) => {
        const books = readLibraryData();
        return books.find(book => book.Titre === bookName);
    },

    getNumberOfPageByBookName : (bookName) => {
        const books = readLibraryData();
        const book = books.find(book => book.Titre === bookName);
        return book ? book.NombreDePages : undefined; 
    },

    getBooksNameByGenre : (genre) => {
        const books = readLibraryData();
        return books.filter(book => book.Genre === genre).map(book => book.Titre);
      },

    getAuthorByBookName : (bookName) => {
        const books = readLibraryData();
        const book = books.find(book => book.Titre === bookName);
        return book ? book.Auteur : undefined;
      },

    getNumbersOfBookAvailableByBookName : (bookName) => {
        const books = readLibraryData();
        const book = books.find(book => book.Titre === bookName);
        return book ? book.Exemplaires : undefined;
      },

    getBookLocationInLibraryByBookName : (bookName) => {
        const books = readLibraryData();
        const book = books.find(book => book.Titre === bookName);
        return book ? `Étage: ${book.Etage}, Section: ${book.Section}` : undefined;
    },

    getChaptersNumberByBookName : (bookName) => {
        const books = readLibraryData();
        const book = books.find(book => book.Titre === bookName);
        return book ? book.NombreDeChapitres : undefined; 
    }
}

export default bookService