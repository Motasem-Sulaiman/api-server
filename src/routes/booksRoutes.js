const express = require("express");
const booksRouter = express.Router();
const { BooksModel } = require("../models/index");


booksRouter.get("/books", getBooks);
booksRouter.post("/books", addBooks);
booksRouter.get("/books/:id", getOneBook);
booksRouter.put("/books/:id", updateBook);
booksRouter.delete("/books/:id", deleteBook);


async function getBooks(req,res){
    let booksResult = await BooksModel.read();
    res.status(200).json(booksResult);


}
async function getOneBook(req, res) {
    const bookId = parseInt(req.params.id);
  
    let books = await BooksModel.read(bookId)
    res.status(200).json(books);
  }
  
  async function addBooks(req, res) {
    let newBooks = req.body;
    let addedBooks = await BooksModel.add(newBooks);
    res.status(201).json(addedBooks);
  }
  
  async function updateBook(req,res){
  let bookId=parseInt(req.params.id)
  let updateBooks=req.body;
  let foundBooks= await BooksModel.update(updateBooks,bookId)
  res.status(201).json(foundBooks)
  
  
  }
  async function deleteBook(req,res){
  let bookId=parseInt(req.params.id)
  let deleteBook=await BooksModel.delete(bookId)
  res.status(204).json(deleteBook)
  
  }
module.exports=booksRouter