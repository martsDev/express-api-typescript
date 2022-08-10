import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import BookService from "../services/books.services";

class BooksController {
    constructor(private bookService = new BookService()) {}

    public getAll = async (_req: Request, res: Response) => {

        const books = await this.bookService.getAll();

        res.status(StatusCodes.OK).json(books);
    };

    public getById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const book = await this.bookService.getById(id);

        if(!book) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Book not found!' });
        };

        res.status(StatusCodes.OK).json(book);
    };

    public create = async (req: Request, res: Response) => {
        const book = req.body;

        const bookCreated = await this.bookService.create(book);

        res.status(StatusCodes.CREATED).json(bookCreated);
    };

    public updateBook = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const book = req.body;

        await this.bookService.updateBook(id, book);

        res.status(StatusCodes.NO_CONTENT).end();
    };

    public removeBook = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        await this.bookService.removeBook(id);

        res.status(StatusCodes.OK).json({ message: 'Book deleted successfully' });
    };
};

export default BooksController;
