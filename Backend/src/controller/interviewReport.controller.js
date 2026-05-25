import {InterviewReport} from '../models/interviewReport.model.js'
import { generateInterviewReport } from '../services/ai.services.js';
import { PDFParse } from 'pdf-parse';

export async function generateInterViewReportController(req,res){

    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {jobDescription, selfDescription} = req.body;

    try {
        const interviewReportData = await generateInterviewReport({
            jobDescription,
            resume: resumeContent.text,
            selfDescription
        })

        const interviewReports = await InterviewReport.create({
             user: req.user.id,
             jobDescription,
             resume: resumeContent.text,
             selfDescription,
            ...interviewReportData
        })

        res.status(201).json({message: 'Interview report generated successfully', interviewReports});

    } catch (error) {
        console.error('Error generating interview report:', error);
        res.status(500).json({ error: 'Failed to generate interview report' });
    }
}