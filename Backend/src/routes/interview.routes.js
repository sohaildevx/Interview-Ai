import express from 'express';
import { upload } from '../middlewares/file.middleware.js';
import {generateInterViewReportController, getInterviewReportController, getAllInterviewReportsController} from '../controller/interviewReport.controller.js'
import {authUser} from '../middlewares/auth.middleware.js'

export const interviewRouter = express.Router();

interviewRouter.post('/', authUser, upload.single('resume'), generateInterViewReportController);

// Get a specific interview report by ID
interviewRouter.get('/report/:interviewId', authUser, getInterviewReportController);


// Get all interview reports for a user
interviewRouter.get('/', authUser, getAllInterviewReportsController);