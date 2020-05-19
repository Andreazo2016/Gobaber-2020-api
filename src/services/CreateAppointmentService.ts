import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

/**
 * Service é responsvel por uma unica coisa, e só
 * Service vai ter somente um único método
 */

interface Request {
    provider: string;
    date: Date;
}


class CreateAppointmentService {

    /**Só fica no service o que é regra de négocio da aplicação */
    public async execute({ provider, date }: Request): Promise<Appointment> {

        const appointmentRepository = getCustomRepository(AppointmentRepository)

        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked')
        }

        const appointment = await appointmentRepository.createAppointment({ provider, date: appointmentDate })

        return appointment
    }
}

export default CreateAppointmentService;
