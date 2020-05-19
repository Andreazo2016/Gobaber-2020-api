import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

interface CreateAppointment {
    provider: string;
    date: Date;
}

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment>{


    public async findByDate(date: Date): Promise<Appointment | null> {

        const findAppointment = await this.findOne({
            where: { date }
        })

        return findAppointment || null;
    }

    public async createAppointment({ provider, date }: CreateAppointment):Promise<Appointment> {
        const appointment = await this.create({
            provider,
            date
        });

        await this.save(appointment);

        return appointment;
    }


}

export default AppointmentRepository;
