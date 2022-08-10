import { Router } from "express";
import BooksController from "../controllers/books.controller";
import validationBook from "../middlewares/books.middleware";

const router = Router();

const booksController = new BooksController();

const bookSlashId = '/books/:id';

router.get('/books', booksController.getAll);
router.get(bookSlashId, booksController.getById);
router.post('/books/', validationBook, booksController.create);
router.put(bookSlashId, validationBook, booksController.updateBook);
router.delete(bookSlashId, booksController.removeBook);

export default router;
