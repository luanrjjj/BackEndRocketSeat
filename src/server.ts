import "reflect-metadata";

import routes from './routes';
import uploadConfig from './config/upload'
import  express,{Request , Response, NextFunction, response} from 'express';
import AppError from './errors/AppError'

import './database';

const app =express ();

app.get('/',(request,response)=> {
    return response.json({message:'Hello Gold;'});
})

app.use(express.json());
app.use('/files',express.static(uploadConfig.directory))

app.use(routes);

app.use((err:Error,request: Request, response:Response ,next: NextFunction)=> {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.log(err);
    return response.status(500).json({
        status: 'error',
        messsage: 'Internal Server Error',
    })
}); 

app.listen(3333,()=>{
    console.log('Server started on port 3333')
});
