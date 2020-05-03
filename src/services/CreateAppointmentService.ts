// import TransactionsRepository from '../repositories/TransactionsRepository';
// import Transaction from '../models/Transaction';

// class CreateTransactionService {
//   private transactionsRepository: TransactionsRepository;

//   constructor(transactionsRepository: TransactionsRepository) {
//     this.transactionsRepository = transactionsRepository;
//   }

//   public execute({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
//     const balance = this.transactionsRepository.getBalance();

//     if (type === 'outcome' && value > balance.total) {
//       throw new Error('Insuficient funds');
//     }

//     const transaction = this.transactionsRepository.create({
//       title,
//       value,
//       type,
//     });

//     return transaction;
//   }
// }

// export default CreateTransactionService;

import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      date,
    );

    if (findAppointmentInSameDate) {
      throw new Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
