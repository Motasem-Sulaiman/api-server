const express = require("express");
const authorsRouter = express.Router();
const { AuthorsModel,BooksModel } = require("../models/index");

authorsRouter.get("/authors", getAuthour);
authorsRouter.post("/authors", addAuthour);
authorsRouter.get("/authors/:id", getOneAuthor);
authorsRouter.put("/authors/:id", updateAuthor);
authorsRouter.delete("/authors/:id", deleteAuthor);
authorsRouter.get("/authorbooks/:id",getAuthorBooks)

async function getAuthorBooks(req, res) {
  const authourId=parseInt(req.params.id);
  let authorBooksResult = await AuthorsModel.readAuthorBooks(authourId,BooksModel.model);
  res.status(200).json(authorBooksResult);
}
async function getAuthour(req, res) {
  let authorsResult = await AuthorsModel.read();
  res.status(200).json(authorsResult);
}
async function getOneAuthor(req, res) {
  const authorId = parseInt(req.params.id);

  let authors = await AuthorsModel.read(authorId);
  res.status(200).json(authors);
}

async function addAuthour(req, res) {
  let newAuthors = req.body;
  let addedAuthors = await AuthorsModel.add(newAuthors);
  res.status(201).json(addedAuthors);
}

async function updateAuthor(req, res) {
  let authorId = parseInt(req.params.id);
  let updateAuthors = req.body;
  let foundAuthor = await AuthorsModel.update(updateAuthors, authorId);

  res.status(201).json(foundAuthor);
}
async function deleteAuthor(req, res) {
  let authorId = parseInt(req.params.id);
  let deleteAuthor = await AuthorsModel.delete(authorId)
  res.status(204).json(deleteAuthor);
}
module.exports = authorsRouter;
