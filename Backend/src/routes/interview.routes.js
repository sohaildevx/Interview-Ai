import express from 'express';
import { upload } from '../middlewares/file.middleware.js';
import {generateInterViewReportController} from '../controller/interviewReport.controller.js'
import {authUser} from '../middlewares/auth.middleware.js'

export const interviewRouter = express.Router();

interviewRouter.post('/generate-report', authUser, upload.single('resume'), generateInterViewReportController);