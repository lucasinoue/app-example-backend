import { Router } from 'express';
import appointmentRouter from './appointment.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);

export default routes;
