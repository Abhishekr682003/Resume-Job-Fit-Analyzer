import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await axios.get('/api/resumes/my-resumes');
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
        <div className="loading">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="dashboard-hero">
        <h1>Welcome back, {user?.firstName}!</h1>
        <p>
          Optimize your career with AI. Manage your resumes and get detailed
          ATS analysis against top job postings.
        </p>
      </header>

      <section>
        <div className="section-header">
          <h2>My Resumes</h2>
          <Link to="/upload" className="btn btn-primary">
            Upload New Resume
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="empty-state">
            <h3>No resumes yet</h3>
            <p>Upload your first resume to start analyzing matches.</p>
            <Link to="/upload" className="btn btn-primary" style={{ marginTop: '24px' }}>
              Upload Your First Resume
            </Link>
          </div>
        ) : (
          <div className="grid">
            {resumes.map((resume) => (
              <div key={resume.id} className="card resume-card">
                <div className="card-content">
                  <h3 style={{ marginBottom: '8px' }}>{resume.fileName}</h3>
                  <p style={{ fontSize: '14px' }}>
                    Added on {new Date(resume.uploadDate || resume.uploadedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  {resume.skills && resume.skills.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                      {resume.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} style={{
                          fontSize: '12px',
                          padding: '4px 10px',
                          background: 'rgba(79, 70, 229, 0.1)',
                          color: 'var(--primary)',
                          borderRadius: '20px',
                          fontWeight: '600'
                        }}>
                          {skill}
                        </span>
                      ))}
                      {resume.skills.length > 3 && (
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          +{resume.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <Link
                    to={`/jobs?resumeId=${resume.id}`}
                    className="btn btn-primary btn-block"
                  >
                    Analyze with Jobs
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginTop: '64px' }}>
        <div className="card" style={{ background: 'var(--text-main)', color: 'white' }}>
          <h2 style={{ color: 'white' }}>Quick Actions</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Ready for your next move?</p>
          <div className="quick-actions-grid" style={{ marginTop: '24px' }}>
            <Link to="/upload" className="btn btn-primary">
              Upload New Resume
            </Link>
            <Link to="/jobs" className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}>
              Browse Job Openings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
