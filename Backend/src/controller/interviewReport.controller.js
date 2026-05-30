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

export async function getInterviewReportController(req,res){
     try {
        const {interviewReportId} = req.params;
        if(!interviewReportId){ 
            return res.status(400).json({ error: 'Interview report ID is required' });
        }

        const interviewReport = await InterviewReport.findById(interviewReportId);

        res.status(200).json({interviewReport});
     } catch (error) {
        console.error('Error fetching interview report:', error);
        res.status(500).json({ error: 'Failed to fetch interview report' });
     }
}

export async function getAllInterviewReportsController(req,res){
     try {
        const interviewReports = await InterviewReport.find({user: req.user.id}).select('-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps -preparationTips');

        res.status(200).json({interviewReports});
     } catch (error) {
        console.error('Error fetching interview reports:', error);
        res.status(500).json({ error: 'Failed to fetch interview reports' });
     }
}