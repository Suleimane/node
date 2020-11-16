import {Router} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controlers/UserController';
import SessionController from './app/controlers/SessionController';
import FileController from './app/controlers/FileController';
import ProviderController from './app/controlers/ProviderController';
import AvailableController from './app/controlers/AvailableController';
import AppointmentController from './app/controlers/AppointmentController';
import ScheduleController from './app/controlers/ScheduleController';
import NotificationController from './app/controlers/NotificationController';
import authMiddlerares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddlerares);

routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.get('/schedules', ScheduleController.index);
routes.post('/files', upload.single('file'), FileController.store);

export default routes;

