
import { Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { prisma } from "../../shared/prisma";
import { addMinutes, addHours, format } from "date-fns";
import { IJWTPayload } from "../../types/common";

const insertIntoDB = async (payload: {
    scheduleIds:string[]
}, user: IJWTPayload) => {


    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    })
    console.log(payload, user)

    const doctorScheduleData= payload.scheduleIds.map(scheduleId=>({
     
        doctorId:doctorData.id,
        scheduleId
    }))

    console.log(doctorScheduleData);
   return await prisma.doctorSchedule.createMany({
        data:doctorScheduleData
    })
    
    

}


// const schedulesForDoctor = async (filters: any, options: IOptions) => {
//     const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

//    const { startDateTime: filterStartDateTime, endDateTime: filterEndDateTime } = filters;

//     console.log(filters);


//     const andConditions: Prisma.ScheduleWhereInput[] = [];

//     if (filterStartDateTime && filterEndDateTime) {
//         andConditions.push({
//             AND: [
//                 {
//                     startDateTime: {
//                         gte: filterStartDateTime
//                     }
//                 },
//                 {
//                     endDateTime: {
//                         lte: filterEndDateTime
//                     }
//                 }
//             ]
//         })
//     }


//      const whereConditions: Prisma.ScheduleWhereInput = andConditions.length > 0 ? {
//         AND: andConditions
//     } : {}

//     const result = await prisma.schedule.findMany({
//         where:whereConditions,
//         skip,
//         take:limit,
//         orderBy:{
//             [sortBy]:sortOrder
//         }

//     })

//  const total = await prisma.schedule.count({
//         where: whereConditions
//     });

//     return {
//         meta:{
//             page,limit,total
//         },
//         data:result
//     };


// }


// const deleteScheduleFromDB = async (id: string) => {
//     return await prisma.schedule.delete({
//         where: {
//             id
//         }
//     })
// }


export const doctorScheduleService = {

    insertIntoDB,
    //  schedulesForDoctor,deleteScheduleFromDB

}
