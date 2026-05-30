import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const instance = axios.create({
    baseURL: `${apiBaseUrl}/auth`,
    withCredentials: true,
});

export const generateInterviewReport = async ({jobDescription, resumefile, selfDescription}) => {
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('selfDescription', selfDescription);
    formData.append('resume', resumefile);

    const response = await instance.post('/interview', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
}

export const getInterviewReportById  = async (interviewId)=>{
    const response = await instance.get(`/interview/${interviewId}`);
    return response;
}

export const getAllInterviewReports = async ()=>{
    const response = await instance.get('/interview');
    return response;
}
export default instance;