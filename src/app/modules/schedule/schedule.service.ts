
import { Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { prisma } from "../../shared/prisma";
import { addMinutes, addHours, format } from "date-fns";

const insertIntoDB = async (payload: any) => {

    const { startTime, endTime, startDate, endDate } = payload;
    // console.log(payload)
    // console.log({startTime, endTime, startDate, endDate})

    const intervalTime = 30;
    const schedules = [];

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);


    while (currentDate <= lastDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(startTime.split(":")[0])
                ),
                Number(startTime.split(":")[1])
            )

        )
        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(endTime.split(":")[0])
                ),
                Number(endTime.split(":")[1])
            )

        )

        // console.log(startDateTime, endDateTime);



        while (startDateTime < endDateTime) {
            const slotStartDateTime = startDateTime;

            const slotEndDateTime = addMinutes(startDateTime, intervalTime);
            const scheduleData = {
                startDateTime: slotStartDateTime,
                endDateTime: slotEndDateTime
            }

            // console.log(schedules)

            const exitstingSchedule = await prisma.schedule.findFirst({
                where: scheduleData
            })

            if (!exitstingSchedule) {
                const resullt = await prisma.schedule.create({
                    data: scheduleData
                })
                schedules.push(resullt)
            }


            slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + intervalTime);

        }

        currentDate.setDate(currentDate.getDate() + 1)
    }



    return schedules
}


const schedulesForDoctor = async (filters: any, options: IOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

   const { startDateTime: filterStartDateTime, endDateTime: filterEndDateTime } = filters;

    console.log(filters);


    const andConditions: Prisma.ScheduleWhereInput[] = [];

    if (filterStartDateTime && filterEndDateTime) {
        andConditions.push({
            AND: [
                {
                    startDateTime: {
                        gte: filterStartDateTime
                    }
                },
                {
                    endDateTime: {
                        lte: filterEndDateTime
                    }
                }
            ]
        })
    }

    
     const whereConditions: Prisma.ScheduleWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}

    const result = await prisma.schedule.findMany({
        where:whereConditions,
        skip,
        take:limit,
        orderBy:{
            [sortBy]:sortOrder
        }
        
    })
    
 const total = await prisma.schedule.count({
        where: whereConditions
    });

    return {
        meta:{
            page,limit,total
        },
        data:result
    };


}


const deleteScheduleFromDB = async (id: string) => {
    return await prisma.schedule.delete({
        where: {
            id
        }
    })
}


export const ScheduleService = {

    insertIntoDB, schedulesForDoctor,deleteScheduleFromDB

}
