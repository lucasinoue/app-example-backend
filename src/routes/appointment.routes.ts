import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
  const repository = getCustomRepository(AppointmentsRepository);

  const appointments = await repository.find();

  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentRouter;
