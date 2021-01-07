import {Router} from 'express';

const sessionsRouter = Router();

import AuthenticateUserService from '../services/AuthenticateUserService';


sessionsRouter.post('/',async (request,response)=>{
try {

    const {email,password} = request.body;

    const authenticateUser = new AuthenticateUserService();

    console.log(request.body)

    const { user } = await authenticateUser.execute({
        email,
        password,

    })

    console.log(user)

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    
    return response.json({user:userWithoutPassword});

}catch(err) {
    console.log(err)
    

    return response.status(400).json({error:err.message})
}
   
});


export default sessionsRouter;