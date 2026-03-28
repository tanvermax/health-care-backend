import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { UserStatus } from "@prisma/client";
import { jwtHelper } from "../../helper/jwtHelper";
import config from "../../../config";
import ApiError from "../../errors/ApiErrors";
import httpStatus from "http-status"
const login = async (payload: { email: string, password: string }) => {
    // console.log("payload",payload.password)
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })
    if (!user) {
        throw new Error("user not exit");
    }

    const inCorrectPassword = await bcrypt.compare(payload.password, user.password)

    if (!inCorrectPassword) {
        throw new ApiError(httpStatus.BAD_REQUEST,"Password is incorrect",)
    }
    // console.log(payload)
    const accesstoken= jwtHelper.genarateToken({email:user.email,role:user.role},config.jwt_token_secret as string,config.jwt_token_exprireIn as string)

    const refreshToken = jwtHelper.genarateToken({email:user.email,role:user.role},config.jwt_token__refresh_secret as string,config.jwt_token_refresh_expireIn as string)

    return {
        accesstoken,
        refreshToken,
        needPassowrdChange:user.needPasswordChange
    }

}


export const AuthService = {
    login
}