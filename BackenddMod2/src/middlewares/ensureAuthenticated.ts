
import {verify} from 'jsonwebtoken';

import {Request,Response,NextFunction} from 'express';
import 'express-async-errors';

import authConfig from '../config/auth'
import AppError from '../errors/AppError';

interface TokenPayload { 
    iat: number;
    exp:number;
    sub:string;

}

export default function ensureAuthenticated(
    request:Request,
    response:Response,
    next:NextFunction
    ):void {

    //Validação do Token JWT

    const authHeader = request.headers.authorization;

    console.log(authHeader)

    if (!authHeader) {
        throw new AppError('JWT token is missing',401)
    }

    //Bearer sauidhasudgh

    const [,token] = authHeader.split(' ');
    console.log(authConfig.jwt.secret)
    try {
    const decoded = verify(token,authConfig.jwt.secret )

    const { sub } = decoded as TokenPayload;
    
    request.user = {
        id:sub,
    }

    return next();

} catch (err) {
    throw new AppError('Invalid JWT token',401)
}

}