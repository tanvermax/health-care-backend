import z from "zod"

const createPatientValidationShema = z.object({
    password : z.string(),
    patient:z.object({
        name:z.string().nonempty("Name is required"),
        email:z.string().nonempty("Email is required"),
        address:z.string().optional()
    })
});
const createDoctorValidationShema = z.object({
    password : z.string(),
    doctor:z.object({
        name:z.string().nonempty("Name is required"),
        contactNumber: z.string().nonempty("Contact number is required"),
        email:z.string().nonempty("Email is required"),
        address:z.string().optional()
    })
});


export const UserValidation ={
    createPatientValidationShema,createDoctorValidationShema
}