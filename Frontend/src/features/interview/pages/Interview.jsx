import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../style/interview.scss'
import {useInterview} from "../hooks/interview";

const AccordionItem = ({ q }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="q-badge">Q{q.id}</span>
        <span className="q-text">{q.question}</span>
        <span className="icon">{isOpen ? '˄' : '˅'}</span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <div className="section-label intention">INTENTION</div>
          <p>{q.intention}</p>
          <div className="section-label model-answer">MODEL ANSWER</div>
          <p>{q.modelAnswer}</p>
        </div>
      )}
    </div>
  );
};

const Interview = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const {report, loading, getReportById} = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    
    if (!report || report._id !== interviewId) {
      if (interviewId) {
        getReportById(interviewId);
      }
    }
  }, [interviewId, report, getReportById]);

  const technicalData = (report?.technicalQuestions || []).map((item, index) => ({
    id: index + 1,
    question: item.question,
    intention: item.intention,
    modelAnswer: item.answer
  }));

  const behavioralData = (report?.behavioralQuestions || []).map((item, index) => ({
    id: index + 1,
    question: item.question,
    intention: item.intention,
    modelAnswer: item.answer
  }));

  const skillGaps = report?.skillGaps || [];
  const preparationData = (report?.preparationTips || []).map((item, index) => ({
    id: index + 1,
    title: item.focus,
    description: item.tasks,
    day: item.day
  }));

  const matchScore = typeof report?.matchScore === 'number' ? report.matchScore : 0;

  const renderContent = () => {
    if (loading || !report) {
      return (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Analyzing profile and preparing questions...</p>
        </div>
      );
    }

    switch(activeTab) {
      case 'technical':
        return (
          <div className="technical-content">
            <div className="header-row">
              <h2>Technical Questions</h2>
              <span className="q-count">{technicalData.length} questions</span>
            </div>
            <div className="questions-list">
              {technicalData.length === 0 ? (
                <p className="empty-state">No technical questions yet.</p>
              ) : (
                technicalData.map(q => (
                  <AccordionItem key={q.id} q={q} />
                ))
              )}
            </div>
          </div>
        );
      case 'behavioral':
        return (
          <div className="technical-content">
            <div className="header-row">
              <h2>Behavioral Questions</h2>
              <span className="q-count">{behavioralData.length} questions</span>
            </div>
            <div className="questions-list">
              {behavioralData.length === 0 ? (
                <p className="empty-state">No behavioral questions yet.</p>
              ) : (
                behavioralData.map(q => (
                  <AccordionItem key={q.id} q={q} />
                ))
              )}
            </div>
          </div>
        );
      case 'roadmap':
        return (
          <div className="technical-content">
            <div className="header-row">
              <h2>Road Map</h2>
              <span className="q-count">{preparationData.length} steps</span>
            </div>
            <div className="questions-list">
              {preparationData.length === 0 ? (
                <p className="empty-state">No preparation plan yet.</p>
              ) : (
                preparationData.map(step => (
                  <div key={step.id} className="accordion-item" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <span className="q-badge" style={{ background: 'rgba(65, 179, 163, 0.1)', color: '#41b3a3' }}>
                        Day {step.day}
                      </span>
                      <span className="q-text" style={{ fontWeight: '600', color: 'var(--ink)' }}>{step.title}</span>
                    </div>
                    <p style={{ margin: 0, paddingLeft: '4.5rem', color: 'var(--slate)', fontSize: '0.95rem', textAlign: 'left' }}>
                      {step.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="interview-page">
      <aside className="sidebar-left">
        <nav>
          <ul>
            <li 
              className={activeTab === 'technical' ? 'active' : ''} 
              onClick={() => setActiveTab('technical')}
            >
              Technical Questions
            </li>
            <li 
              className={activeTab === 'behavioral' ? 'active' : ''} 
              onClick={() => setActiveTab('behavioral')}
            >
              Behavioral Questions
            </li>
            <li 
              className={activeTab === 'roadmap' ? 'active' : ''} 
              onClick={() => setActiveTab('roadmap')}
            >
              Road Map
            </li>
          </ul>
        </nav>
      </aside>

      
      <main className="content-middle">
        {renderContent()}
      </main>

      
      <aside className="sidebar-right">
        <div className="match-score-section">
          <h3>MATCH SCORE</h3>
          <div className="score-circle">
            <span className="score-value">{matchScore}</span>
            <span className="score-unit">%</span>
          </div>
          <p className="score-text">{report?.title || 'Interview report overview'}</p>
        </div>

        <div className="skill-gaps-section">
          <h3>SKILL GAPS</h3>
          <div className="skill-tags">
            {skillGaps.length === 0 ? (
              <span className="skill-tag">No gaps identified</span>
            ) : (
              skillGaps.map((item, index) => (
                <span key={`${item.skill}-${index}`} className={`skill-tag gap-${index + 1}`}>
                  {item.skill}
                </span>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Interview
