import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: String;

    @Column('timestamp')
    date: Date;
}

export default Appointment;
