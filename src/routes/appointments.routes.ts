import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentsRepository';
const appointmentsRouter = Router()

//Rota: Receber uma requisição, chmamar outro arquivo, e devolver uma resposta


appointmentsRouter.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentRepository.find()
    return response.json(appointments)
})


appointmentsRouter.post('/', async (request, response) => {

    try {
        const { provider, date } = request.body


        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService()

        const appointment = await createAppointment.execute({ provider, date: parsedDate })

        return response.json(appointment)

    } catch (e) {
        return response
            .status(400)
            .json({ error: e.message })
    }
})

export default appointmentsRouter
