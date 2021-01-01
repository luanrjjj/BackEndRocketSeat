import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn} from 'typeorm';
import User from './User';


/**
 * 
 * Um par Um (OneToOne) Um usuário tem um agendamento
 * Um para Muitos (OneToMany) Um usuário tem mais de um Agendamento
 * Muitos para Muitos (ManyToMany) Se mais um prestdor de serviço pudesse participar do Serviço
 */
@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @ManyToOne(() => User)
    @JoinColumn({name:'provider_id'})
    provider : string;

    @Column()
    provider_id: string;

    

  
    @Column('timestamp with time zone')
    date : Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at:Date;
   
   
}
export default Appointment;