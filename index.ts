import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import 'express-async-errors';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => res.status(StatusCodes.OK).send('Hello World!'));


// middleware de erro

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const { name, message, details } = err as any;
    console.log(`name: ${name}`);

    switch (name) {
        case 'ValidationError':
            res.status(StatusCodes.BAD_REQUEST).json({ message: details[0].message });
            break;
        case 'NotFoundError':
            res.status(StatusCodes.NOT_FOUND).json({ message });
            break;
        case 'ConflictError':
            res.status(StatusCodes.CONFLICT).json({ message });
            break;
        default:
            console.error(err);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    };

    next();
})





app.listen(port, () => console.log(`Example app listening on port ${port}!`));
