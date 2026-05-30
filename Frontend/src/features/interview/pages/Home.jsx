import React, {useState, useRef} from 'react'
import "../style/home.scss";
import {useInterview} from "../hooks/interview";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    
    const {loading, generateReport} = useInterview();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const resumeRef = useRef();

    const navigate = useNavigate();

    const handleGenerateReport = async()=>{
         const resumeFile = resumeRef.current.files[0];
         if(!resumeFile){
            alert("Please upload your resume");
            return;
         }

       try {
            const data = await generateReport({jobDescription, resumefile: resumeFile, selfDescription});
    
            if(data?.interviewReports?._id){
                navigate(`/interview/${data.interviewReports._id}`);
            }
       } catch(error) {
           alert("Failed to generate report. Please try again.");
       }
    }

  return (
        <main className='home'> 
          <div className="hero">
            <h1>Interview Prep Studio</h1>
            <p>Turn your resume and job description into a focused practice plan.</p>
          </div>
          <div className="left">
                <label htmlFor="jobDescription">Job Description</label>
                <textarea name="jobDescription" id="jobDescription" placeholder="Enter job description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}></textarea>
         </div>

         <div className='right'>
              <div className='input-group'>
                    <label htmlFor="numQuestions">Upload Resume</label>
                    <input ref={resumeRef} type="file" name="resume" id="resume" accept=".pdf"/>
              </div>

              <div className='input-group'>
                    <label htmlFor="selfDescription">Self Description</label>
                    <textarea name="selfDescription" id="selfDescription" placeholder="Enter your self description" value={selfDescription} onChange={(e) => setSelfDescription(e.target.value)}></textarea>
              </div>
                <button className={`generate-btn ${loading ? 'loading' : ''}`} onClick={handleGenerateReport} disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-mini"></span>
                            Generating...
                        </>
                    ) : "Generate Questions"}
                </button>
         </div>
    </main>
  )
}

export default Home
