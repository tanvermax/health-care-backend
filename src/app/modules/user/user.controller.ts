import { NextFunction, Request, Response } from "express";

import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { filterAbleFiels, optiosAblefiels } from "./user.contstant";


const createPatient = async (req: Request, res: Response, nex: NextFunction) => {
    // console.log(req)

    const result = await UserService.createPatient(req);

    // console.log("Patients", result);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created succesfully",
        data: result
    })

}
const createDoctor = async (req: Request, res: Response, nex: NextFunction) => {
    // console.log(req)

    const result = await UserService.createDoctor(req);

    // console.log("Patients", result);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor created succesfully",
        data: result
    })

}
const getallFromDB = async (req: Request, res: Response) => {
    // console.log(req)const 

    const filter = pick(req.query, filterAbleFiels)
    const options = pick(req.query, optiosAblefiels)
    // const { page, limit, searchTerm, sortBy, sortOrder, role, status } = req.query;


    // console.log(page, limit, searchTerm, sortBy, sortOrder, role, status)
    const result = await UserService.getallFromDB(filter,options);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        meta: result.meta,
        message: " All User data ",
        data: result.data
    })

}


export const UserController = {
    createPatient, getallFromDB,createDoctor
}