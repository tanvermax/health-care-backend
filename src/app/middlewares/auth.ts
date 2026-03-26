import { NextFunction, Request, Response } from "express"
import { jwtHelper } from "../helper/jwtHelper"
import config from "../../config"

const auth = (...role: string[]) => {

    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.accesstoken

            if (!token) {
                throw new Error("You ar not autorized")
            }

            const verifyUser = jwtHelper.verifyToken(token, config.jwt_token_secret as string);

            req.user = verifyUser

            if (role.length && !role.includes(verifyUser.role)) {
                throw new Error("You ar not autorized")

            }
            next();

        } catch (error) {
            next(error)
        }
    }
}

export default auth;