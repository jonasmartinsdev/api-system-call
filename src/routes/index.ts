import { Router } from 'express';
import calledRoutes from './called.routes';
import customersRoutes from './customers.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/called', calledRoutes);
routes.use('/customers', customersRoutes);

export default routes;
