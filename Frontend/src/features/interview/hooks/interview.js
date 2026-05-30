import {generateInterviewReport, getInterviewReportById, getAllInterviewReports} from "../../auth/services/axios";
import {useContext} from "react";
import {InterviewContext} from "../interview.context";

export const useInterview = ()=>{
     const context = useContext(InterviewContext);
     if(!context){
        throw new Error("useInterview must be used within an InterviewProvider");
     }
     
     const {loading, setLoading, report, setReport, reports, setReports} = context;

        const generateReport = async ({jobDescription, resumefile, selfDescription})=>{
            setLoading(true);
            try {
                const response = await generateInterviewReport({jobDescription, resumefile, selfDescription});
                setReport(response.data.interviewReports);
                return response.data;
            } catch (error) {
                console.error('Error generating interview report:', error);
                throw error;
            }finally {
                setLoading(false);
            }
        }

        const getReportById = async (interviewId)=>{
            setLoading(true);
            try {
                const response = await getInterviewReportById(interviewId);
                setReport(response.data.interviewReport);
            } catch (error) {
                console.error('Error fetching interview report:', error);
            }finally {
                setLoading(false);
            }
        }

        const getReports = async ()=>{
            setLoading(true);
            try {
                const response = await getAllInterviewReports();
                setReports(response.data.interviewReports);
            } catch (error) {
                console.error('Error fetching interview reports:', error);
            }finally {
                setLoading(false);
            }
        }

        return {loading, report, reports, generateReport, getReportById, getReports};
}