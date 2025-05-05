const Book = require('../models/Book')
const Author = require('../models/Author');

exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(book);
};

exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  const assigned = await Author.findOne({ libros: req.params.id });
  if (assigned) return res.status(400).json({ error: 'No se puede eliminar un libro asignado a un autor' });

  const deleted = await Book.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json({ mensaje: 'Libro eliminado' });
};
