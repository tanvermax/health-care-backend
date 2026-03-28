import { IJWTPayload } from './../../types/common';
import { Request, Response } from "express";
import pick from "../../helper/pick";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { doctorScheduleService } from "./doctorSchedules.service";



const schedulesForDoctor = catchAsync(async (req: Request & {user?:IJWTPayload}, res: Response) => {


    
})



const insertIntoDB = catchAsync(async (req: Request & {user?:IJWTPayload}, res: Response) => {

    const user = req.user
    const result = await doctorScheduleService.insertIntoDB(req.body,user as IJWTPayload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "doctor Schedule created successfully!",
        data: result
    })
})


// const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
//     const result = await ScheduleService.deleteScheduleFromDB(req.params.id);

//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Schedule deleted successfully!",
//         data: result
//     })
// })

export const doctorScheduleController = {

    insertIntoDB,schedulesForDoctor
    //  schedulesForDoctor,deleteScheduleFromDB

}