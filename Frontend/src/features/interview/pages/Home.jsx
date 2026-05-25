import React from 'react'
import "../style/home.scss";

export const Home = () => {
  return (
        <main className='home'> 
          <div className="hero">
            <h1>Interview Prep Studio</h1>
            <p>Turn your resume and job description into a focused practice plan.</p>
          </div>
          <div className="left">
                <label htmlFor="jobDescription">Job Description</label>
                <textarea name="jobDescription" id="jobDescription" placeholder="Enter job description"></textarea>
         </div>

         <div className='right'>
              <div className='input-group'>
                    <label htmlFor="numQuestions">Upload Resume</label>
                    <input type="file" name="resume" id="resume" accept=".pdf"/>
              </div>

              <div className='input-group'>
                    <label htmlFor="selfDescription">Self Description</label>
                    <textarea name="selfDescription" id="selfDescription" placeholder="Enter your self description"></textarea>
              </div>
                <button className='generate-btn'>Generate Questions</button>
         </div>
    </main>
  )
}

export default Home
