import express from 'express';
import { UserRoute } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ScheduleRoutes } from '../modules/schedule/schedule.routes';
import { DoctorScheduleRoutes } from '../modules/doctorSchedule/doctorSchedules.route';


const router = express.Router();

const moduleRoutes = [
    
    {
        path: '/user',
        route: UserRoute
    },
    {
        path:"/auth",
        route:AuthRoutes
    },
    {
        path:"/schedule",
        route:ScheduleRoutes
    },
    {
        path:"/doctor-schedule",
        route:DoctorScheduleRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;