import {Router} from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService'
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import updateUserAvatarService from '../services/updateUserAvatarService'

const usersRouter = Router();
const upload = multer(uploadConfig)



usersRouter.post('/',async (request,response)=>{

});

usersRouter.patch('/avatar',ensureAuthenticated,upload.single('avatar'), async (request,response)=> {
    console.log(request.file)
    
})
export default usersRouter;