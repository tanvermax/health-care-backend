
import express from "express";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ScheduleController } from "./schedule.controller";

const router = express.Router();

router.get(
    "/",

    ScheduleController.schedulesForDoctor
)

router.post(
    "/",
    ScheduleController.insertIntoDB
)


router.delete(
    "/:id",
    ScheduleController.deleteScheduleFromDB
)
export const ScheduleRoutes = router;