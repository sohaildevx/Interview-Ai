import {InterviewReport} from '../models/interviewReport.model.js'
import { generateInterviewReport } from '../services/ai.services.js';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export async function generateInterViewReportController(req,res){
    if (!req.file) {
        return res.status(400).json({ error: 'Resume file is required' });
    }
    const resumeContent = await pdfParse(req.file.buffer);
    const {jobDescription, selfDescription} = req.body;

    try {
        const interviewReportData = await generateInterviewReport({
            jobDescription,
            resume: resumeContent.text,
            selfDescription
        })

        const fallbackTitle = interviewReportData?.title || 'Interview Report';
        const interviewReports = await InterviewReport.create({
             user: req.user.id,
             jobDescription,
             resume: resumeContent.text,
             selfDescription,
            ...interviewReportData,
            title: fallbackTitle
        })

        res.status(201).json({message: 'Interview report generated successfully', interviewReports});

    } catch (error) {
        console.error('Error generating interview report:', error);
        res.status(500).json({ error: 'Failed to generate interview report' });
    }
}

export async function getInterviewReportController(req,res){
     try {
        const {interviewId} = req.params;
        if(!interviewId){ 
            return res.status(400).json({ error: 'Interview report ID is required' });
        }

        const interviewReport = await InterviewReport.findById(interviewId);

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