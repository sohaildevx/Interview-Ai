import React, { useState } from 'react'
import '../style/interview.scss'

const Interview = () => {
  const [activeTab, setActiveTab] = useState('technical');

  // Dummy data 
  const skillGaps = ["redis", "Message queue", "Event loop"];

  const renderContent = () => {
    switch(activeTab) {
      case 'technical':
        return <div>Here will be the main content for Technical questions.</div>;
      case 'behavioral':
        return <div>Here will be the main content for Behavioral questions.</div>;
      case 'roadmap':
        return <div>Here will be the main content for the Road Map.</div>;
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
              Technical questions
            </li>
            <li 
              className={activeTab === 'behavioral' ? 'active' : ''} 
              onClick={() => setActiveTab('behavioral')}
            >
              Behavioral questions
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
        <h3>Skill Gaps</h3>
        <div className="skill-tags">
          {skillGaps.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </aside>
    </div>
  )
}

export default Interview
