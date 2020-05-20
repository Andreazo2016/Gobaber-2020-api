import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

/**
 * Service é responsvel por uma unica coisa, e só
 * Service vai ter somente um único método
 */


import AppError from '../errors/AppError';

interface Request {
    provider_id: string;
    date: Date;
}


class CreateAppointmentService {

    /**Só fica no service o que é regra de négocio da aplicação */
    public async execute({ provider_id, date }: Request): Promise<Appointment> {

        const appointmentRepository = getCustomRepository(AppointmentRepository)

        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked')
        }

        const appointment = await appointmentRepository.createAppointment({ provider_id, date: appointmentDate })

        return appointment
    }
}

export default CreateAppointmentService;
