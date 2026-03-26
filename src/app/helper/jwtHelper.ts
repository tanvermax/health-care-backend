import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";


const genarateToken = (payload: any, secret: Secret, expiresIn: string) => {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: expiresIn as any
    }) 
    return token
}


const verifyToken = (token:string,secret:Secret)=>{
    return jwt.verify(token,secret) as JwtPayload
}


export const jwtHelper ={
    genarateToken,verifyToken
}