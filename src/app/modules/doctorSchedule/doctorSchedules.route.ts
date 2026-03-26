
import express from "express";
import { doctorScheduleController } from "./doctorSchedules.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";


const router = express.Router();

// router.get(
//     "/",

//     doctorScheduleController.schedulesForDoctor
// )

router.post(
    "/",auth(UserRole.DOCTOR),
    doctorScheduleController.insertIntoDB
)


// router.delete(
//     "/:id",
//     ScheduleController.deleteScheduleFromDB
// )
export const DoctorScheduleRoutes = router;