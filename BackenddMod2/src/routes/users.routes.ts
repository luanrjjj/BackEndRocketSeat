import {Router} from 'express';

import CreateUserService from '../services/CreateUserService'


const usersRouter = Router();


/**
 * Repositories
 * Services
 * 
 */



usersRouter.post('/',async (request,response)=>{
try {

    const {name,email,password} = request.body

   
    console.log(request.body)
    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password
    });

    console.log(user)

   
    return response.json(user);

}catch(err) {
    console.log(err)
    

    return response.status(400).json({error:err.message})
}
   
});


export default usersRouter;