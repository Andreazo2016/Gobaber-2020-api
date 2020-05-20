import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);


//Rota: Receber uma requisição, chmamar outro arquivo, e devolver uma resposta
appointmentsRouter.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentRepository.find();
    return response.json(appointments);
})


appointmentsRouter.post('/', async (request, response) => {

        const { provider_id, date } = request.body

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({ provider_id, date: parsedDate })

        return response.json(appointment);

})

export default appointmentsRouter
