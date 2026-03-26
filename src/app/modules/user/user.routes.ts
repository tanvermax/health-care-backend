import express, { NextFunction, Request, Response } from 'express'
import { UserController } from './user.controller';
import { fileUploade } from '../../helper/fileUpload';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();



router.post('/create-patient',
    fileUploade.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createPatientValidationShema.parse(JSON.parse(req.body.data))
        return UserController.createPatient(req, res, next)
    },
);

router.post('/create-admin',
    fileUploade.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createPatientValidationShema.parse(JSON.parse(req.body.data))
        return UserController.createPatient(req, res, next)
    },
);
router.post('/create-doctor',
    fileUploade.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createDoctorValidationShema.parse(JSON.parse(req.body.data))
        return UserController.createDoctor(req, res, next)
    },
);

router.get('/',auth(UserRole.ADMIN,UserRole.DOCTOR),UserController.getallFromDB);


export const UserRoute = router