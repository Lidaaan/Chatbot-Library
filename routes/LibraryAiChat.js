import express from "express";
import LibraryAi from "../lib/myLibraryAI.js";
import bookService from "../services/bookService.js";
const chatRouter = express.Router()

chatRouter.post('/chat',async (req,res)=> {
    
    const message = req.body.message
    
    const response = await LibraryAi.getUserIntent(message)

    const intent = JSON.parse(response.message.content)
    var bookInfo = null
    
    if(intent){
        
        switch(intent.intent){
            case "get_number_of_pages_from_book_name":
                bookInfo = bookService.getNumberOfPageByBookName(intent.Titre)
                break;
            case "get_book_genre":
                bookInfo = bookService.getBooksNameByGenre(intent.Genre)
                break;
            case "get_number_of_chapter_from_book" : 
                bookInfo = bookService.getChaptersNumberByBookName(intent.Titre)

                break;
            case "get_author_of_book":
                bookInfo = bookService.getAuthorByBookName(intent.Titre)
                break;
            case "get_year_of_book":
                bookInfo = bookService.getBookInfoByBookName(intent.Titre)
                break;
            case "get_number_of_book_available" : 
                bookInfo = bookService.getNumbersOfBookAvailableByBookName(intent.Titre)
                break;
            case "get_book_location":
                bookInfo = bookService.getBookLocationInLibraryByBookName(intent.Titre)
                
                break;
            default :
                errorResponse = await LibraryAi.RetrieveError()
                res.send(errorResponse.message.content)
        }
    } 

    const finalResponse = await LibraryAi.transformAnswerForUser(message,bookInfo)

    res.send(finalResponse.message.content)
})

export default chatRouter