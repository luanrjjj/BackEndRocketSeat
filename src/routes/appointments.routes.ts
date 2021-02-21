import {Router} from 'express';
import {parseISO} from 'date-fns';
import CreateAppointmentService from '../services/CreateAppointmentService';
import {getCustomRepository} from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


import ensureAuthenticated from '../middlewares/ensureAuthenticated'


const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated); // Será aplicado em todas as rotas de Agendamento


 appointmentsRouter.get('/',async (request,response)=>{
  console.log(request.user)

    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
     const appointments = await appointmentsRepository.find();

     return response.json(appointments);

 })

appointmentsRouter.post('/',async (request,response)=>{

   
});


export default appointmentsRouter;