import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import {startOfHour} from 'date-fns';

/**
 * 1 - Recebimento das Informações
 * 2 - Tratativa de Erros e Exceções
 * 3 - Acesso ao repositório
 */


interface Request {
    date : Date;
    provider:string;
}



class CreateAppointmentService {

    private appointmentsRepository : AppointmentsRepository;

    constructor (appointmentsRepository:AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;

    }
    public execute({date,provider}: Request) {      // 1- Resolvido aqui
        const appointmentDate = startOfHour(date)

        const findAppointmentInSameData = this.appointmentsRepository.findByDate(appointmentDate)
    
    
        
    
        if (findAppointmentInSameData) {
            throw Error('This appointment is already booked');
        }
    
        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });
        return  appointment;
    }

}
export default CreateAppointmentService;