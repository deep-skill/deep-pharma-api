import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
        console.log(
            `Request: Method: ${req.method}, status: ${res.statusCode}, url: ${req.url}, body: ${JSON.stringify(req.body)}`
        );
    })
    next();
};