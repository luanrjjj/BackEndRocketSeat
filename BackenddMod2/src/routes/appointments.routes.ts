import {Router} from 'express';
import {uuid} from 'uuidv4';
import {startOfHour,parseISO,isEqual} from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';



const appointmentsRouter = Router();


const appointmentsRepository = new AppointmentRepository ();

 appointmentsRouter.get('/',(request,response)=>{
     const appointments = appointmentsRepository.all();

     return response.json(appointments);

 })

appointmentsRouter.post('/',(request,response)=>{
try {
    const {provider,date} = request.body;

    const parsedDate = parseISO(date);
    
    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = createAppointment.execute ({date:parsedDate,provider})
   

    return response.json(appointment)
}catch(err) {

    return response.status(400).json({error:err.message})
}
   
});


export default appointmentsRouter;