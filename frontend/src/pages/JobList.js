import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('resumeId');
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = (jobId) => {
    if (resumeId) {
      navigate(`/analysis/${resumeId}/${jobId}`);
    } else {
      navigate('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
        <div className="loading">Fetching available opportunities...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <header style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '12px' }}>Explore Opportunities</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Browse available job openings and see how well your profile matches the requirements.
        </p>
      </header>

      {!resumeId && (
        <div className="card" style={{
          background: 'rgba(245, 158, 11, 0.05)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <span style={{ fontSize: '24px' }}>💡</span>
          <div>
            <h3 style={{ fontSize: '1rem', color: 'var(--warning)', marginBottom: '4px' }}>Analyze your match</h3>
            <p style={{ fontSize: '0.875rem', margin: 0 }}>
              Go to your <Link to="/dashboard" style={{ color: 'var(--primary)', fontWeight: '600' }}>Dashboard</Link> and select a resume to see precise match scores for these jobs.
            </p>
          </div>
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '64px' }}>
          <p>No job postings available at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="grid">
          {jobs.map((job) => (
            <div key={job.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0 }}>{job.title}</h3>
                  <span style={{
                    fontSize: '12px',
                    padding: '4px 12px',
                    background: 'var(--background)',
                    borderRadius: '20px',
                    fontWeight: '600',
                    color: 'var(--text-muted)'
                  }}>
                    {job.location}
                  </span>
                </div>
                <p style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '8px' }}>{job.company}</p>
                {job.minExperience !== null && (
                  <p style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>⏳</span> {job.minExperience}+ years experience
                  </p>
                )}
                <p style={{ fontSize: '14px', marginTop: '16px', lineHeight: '1.6' }}>
                  {job.description.substring(0, 150)}...
                </p>

                {job.requiredSkills && job.requiredSkills.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '16px' }}>
                    {job.requiredSkills.slice(0, 4).map((skill, i) => (
                      <span key={i} style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        background: 'var(--background)',
                        color: 'var(--text-muted)',
                        borderRadius: '4px',
                        border: '1px solid var(--border)'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <button
                  onClick={() => handleAnalyze(job.id)}
                  className={`btn btn-block ${resumeId ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {resumeId ? 'Analyze Match' : 'Select Resume to Start'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
