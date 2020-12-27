import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import {startOfHour} from 'date-fns';
import {getCustomRepository} from 'typeorm';

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

    
    public async execute({date,provider}: Request):Promise<Appointment> {  // 1- Resolvido aqui

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date)


        const findAppointmentInSameData = await appointmentsRepository.findByDate(appointmentDate)
    
    
        
    
        if (findAppointmentInSameData) {
            throw Error('This appointment is already booked');
        }
    
        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return  appointment;
    }

}
export default CreateAppointmentService;