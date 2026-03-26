import { Request } from "express";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploade } from "../../helper/fileUpload";
import { paginationHelper } from "../../helper/paginationHelper";
import { Prisma, UserRole } from "@prisma/client";
import { userSearchableFileds } from "./user.contstant";

const createPatient = async (req: Request) => {
    if (req.file) {
        const uploadResult = await fileUploade.uploadTocloudinary(req.file)

        req.body.patient.profilePhoto = uploadResult?.secure_url
    }

    const haspassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(
        async (tnx) => {
            await tnx.user.create({
                data: {
                    email: req.body.patient.email,
                    password: haspassword,

                }
            });
            return await tnx.patient.create({
                data: req.body.patient
            })
        }
    )

    // console.log("payload", result)
    return result;


}


const createDoctor = async (req: Request) => {
const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploade.uploadTocloudinary(file);
        req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url
    }
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10)

    const userData = {
        email: req.body.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdDoctorData = await transactionClient.doctor.create({
            data: req.body.doctor
        });

        return createdDoctorData;
    });

    return result;
}
const getallFromDB = async (params: any, options: any) => {


    const { page,
        limit,
        skip,
        sortBy,
        sortOrder } = paginationHelper.calculatePagination(options)



    const { searchTerm, ...filterData } = params;


    const andConditions: Prisma.UserWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: userSearchableFileds.map(filds => ({
                [filds]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })

    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}


    const result = await prisma.user.findMany(
        {
            skip,
            take: limit,
            where: whereConditions,
            orderBy: {
                [sortBy]: sortOrder
            }
        });
    const total = await prisma.user.count({
        where: whereConditions
    });

    return {
        meta:{
            page,limit,total
        },
        data:result
    };

}


export const UserService = {
    createPatient, getallFromDB,createDoctor
}