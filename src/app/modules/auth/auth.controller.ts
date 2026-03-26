import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
    // console.log(req)

    const result = await AuthService.login(req.body);

    const { accesstoken, refreshToken,needPassowrdChange } = result;

    res.cookie('accesstoken',accesstoken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60
    })
    res.cookie('refreshToken', refreshToken,{
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 *24 *90
    })
    // console.log("Patients", result);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User login succesfully succesfully",
        data: {
            needPassowrdChange
        }
    })

})
const logout = catchAsync(async (req: Request, res: Response) => {
    // console.log(req)

    const result = await AuthService.login(req.body);

    const { accesstoken, refreshToken,needPassowrdChange } = result;

    res.cookie('accesstoken',accesstoken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60
    })
    res.cookie('refreshToken', refreshToken,{
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 *24 *90
    })
    // console.log("Patients", result);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User login succesfully succesfully",
        data: {
            needPassowrdChange
        }
    })

})

export const AuthController = {
    login,logout
}