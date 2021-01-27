
import {verify} from 'jsonwebtoken';

import {Request,Response,NextFunction} from 'express';

import authConfig from '../config/auth'

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
        throw new Error('JWT token is missing')
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
    throw new Error('Invalid JWT token')
}

}