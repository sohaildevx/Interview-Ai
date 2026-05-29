import React, { useState } from 'react'
import '../style/interview.scss'

const technicalQuestions = [
  {
    id: 1,
    question: "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
    intention: "To assess the candidate's deep understanding of Node.js internal architecture and non-blocking I/O.",
    modelAnswer: "The candidate should explain the different phases of the event loop (timers, pending callbacks, idle/prepare, poll, check, close). They should mention how Libuv handles the thread pool and how the callback queue works with the call stack to ensure performance without blocking the main thread."
  },
  {
    id: 2,
    question: "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
    intention: "To evaluate knowledge of database query optimization.",
    modelAnswer: "Use $match and $limit early in the pipeline to reduce data, utilize indexes properly, and avoid memory-heavy stages if possible."
  },
  {
    id: 3,
    question: "Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?",
    intention: "To check caching strategies and temporary data storage knowledge.",
    modelAnswer: "Application logic checks the cache first. If the data is absent, it queries the database and updates the cache. Redis is ideal for session management, rate limiting, and caching database results."
  },
  {
    id: 4,
    question: "What are the challenges of migrating a monolithic application to a modular service-based architecture?",
    intention: "To assess architectural design and migration experience.",
    modelAnswer: "Challenges include data consistency (handling distributed transactions), service discovery, increased network latency, and complex debugging and monitoring."
  }
];

const behavioralQuestions = [
  {
    id: 1,
    question: "Tell me about a time you had to work with a difficult team member.",
    intention: "To assess conflict resolution and communication skills.",
    modelAnswer: "The candidate should describe a specific situation, the actions they took to resolve the issue professionally, and the positive outcome."
  },
  {
    id: 2,
    question: "Describe a situation where you had to meet a tight deadline.",
    intention: "To understand time management and prioritization abilities under pressure.",
    modelAnswer: "Look for examples of breaking down tasks, prioritizing effectively, communicating with stakeholders, and delivering quality work on time."
  },
  {
    id: 3,
    question: "How do you handle receiving negative feedback?",
    intention: "To evaluate coachability and emotional intelligence.",
    modelAnswer: "The candidate should demonstrate a willingness to listen, reflect, and take actionable steps for improvement without being defensive."
  }
];

const roadmapSteps = [
  {
    id: 1,
    title: "System Design Fundamentals",
    description: "Review core concepts like load balancing, caching strategies, and database sharding to bridge gaps in distributed systems design."
  },
  {
    id: 2,
    title: "Advanced Message Queues",
    description: "Deep dive into Kafka and RabbitMQ implementation and best practices."
  },
  {
    id: 3,
    title: "CI/CD & Deployment",
    description: "Practice setting up robust CI/CD pipelines using Docker and Kubernetes to improve production-level deployment skills."
  }
];

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

  // Dummy data 
  const skillGaps = ["Message Queues (Kafka/RabbitMQ)", "Advanced Docker & CI/CD Pipelines", "Distributed Systems Design", "Production-level Redis management"];

  const renderContent = () => {
    switch(activeTab) {
      case 'technical':
        return (
          <div className="technical-content">
            <div className="header-row">
              <h2>Technical Questions</h2>
              <span className="q-count">{technicalQuestions.length} questions</span>
            </div>
            <div className="questions-list">
              {technicalQuestions.map(q => (
                <AccordionItem key={q.id} q={q} />
              ))}
            </div>
          </div>
        );
      case 'behavioral':
        return (
          <div className="technical-content">
            <div className="header-row">
              <h2>Behavioral Questions</h2>
              <span className="q-count">{behavioralQuestions.length} questions</span>
            </div>
            <div className="questions-list">
              {behavioralQuestions.map(q => (
                <AccordionItem key={q.id} q={q} />
              ))}
            </div>
          </div>
        );
      case 'roadmap':
        return (
          <div className="technical-content">
            <div className="header-row">
              <h2>Road Map</h2>
              <span className="q-count">{roadmapSteps.length} steps</span>
            </div>
            <div className="questions-list">
              {roadmapSteps.map(step => (
                <div key={step.id} className="accordion-item" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span className="q-badge" style={{ background: 'rgba(65, 179, 163, 0.1)', color: '#41b3a3' }}>Step {step.id}</span>
                    <span className="q-text" style={{ fontWeight: '600', color: 'var(--ink)' }}>{step.title}</span>
                  </div>
                  <p style={{ margin: 0, paddingLeft: '4.5rem', color: 'var(--slate)', fontSize: '0.95rem', textAlign: 'left' }}>
                    {step.description}
                  </p>
                </div>
              ))}
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
            <span className="score-value">88</span>
            <span className="score-unit">%</span>
          </div>
          <p className="score-text">Strong match for this role</p>
        </div>

        <div className="skill-gaps-section">
          <h3>SKILL GAPS</h3>
          <div className="skill-tags">
            {skillGaps.map((skill, index) => (
              <span key={index} className={`skill-tag gap-${index + 1}`}>{skill}</span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Interview
