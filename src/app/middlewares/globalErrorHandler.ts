import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode:number = err.statusCode|| httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message || "Something went wrong!";
  let error = err;
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      (
        (message = "User already exits"),
         (error = err.meta),
         statusCode=httpStatus.CONFLICT
        );
    }
    if (err.code === "P1000") {
      ((message = "Authentication failed against database server "),
        (error = err.meta),
    statusCode=httpStatus.BAD_GATEWAY);
    }
    if (err.code === "P2003") {
      ((message = "Foren key constrain failed "),statusCode=httpStatus.BAD_REQUEST, (error = err.meta));
    }
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    ((message = "validation error"), statusCode=httpStatus.BAD_REQUEST,(error = err.message));
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    ((message = "Prisma clinet failed to initialize"),
     statusCode=httpStatus.BAD_REQUEST,(error = err.message));
  }

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
