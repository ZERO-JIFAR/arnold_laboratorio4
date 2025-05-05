const Author = require('../models/Author');
const Book = require('../models/Book');

exports.getAllAuthors = async (req, res) => {
  const authors = await Author.find().populate('libros');
  res.json(authors);
};

exports.getAuthorById = async (req, res) => {
  const author = await Author.findById(req.params.id).populate('libros');
  if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
  res.json(author);
};

exports.createAuthor = async (req, res) => {
  const author = new Author(req.body);
  await author.save();
  res.status(201).json(author);
};

exports.updateAuthor = async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
  res.json(author);
};

exports.deleteAuthor = async (req, res) => {
  const deleted = await Author.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Autor no encontrado' });
  res.json({ mensaje: 'Autor eliminado' });
};

exports.addBookToAuthor = async (req, res) => {
  const author = await Author.findById(req.params.id);
  const book = await Book.findById(req.params.bookId);

  if (!author || !book) {
    return res.status(400).json({ error: 'Autor o libro no encontrado' });
  }

  if (!author.libros.includes(book._id)) {
    author.libros.push(book._id);
    await author.save();
  }

  res.json({ mensaje: 'Libro agregado al autor', author });
};
