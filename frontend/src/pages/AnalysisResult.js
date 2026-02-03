import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const AnalysisResult = () => {
  const { resumeId, jobId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.post('/api/analysis/analyze', { resumeId, jobId });
        setResult(response.data);
      } catch (error) {
        setError('Error analyzing resume: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [resumeId, jobId]);

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
        <div className="loading">Processing your match with AI...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ color: 'var(--error)' }}>Analysis Failed</h2>
          <p>{error}</p>
          <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '24px' }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>No results found</h2>
        <Link to="/dashboard" className="btn btn-secondary">Go to Dashboard</Link>
      </div>
    );
  }

  const scoreColor = result.matchPercentage >= 70 ? 'var(--success)' :
    result.matchPercentage >= 40 ? 'var(--warning)' : 'var(--error)';

  return (
    <div className="container">
      <header style={{ marginBottom: '48px' }}>
        <Link to="/jobs" style={{ textDecoration: 'none', color: 'var(--primary)', fontSize: '14px', fontWeight: '600' }}>
          ← Back to Jobs
        </Link>
        <h1 style={{ marginTop: '16px', marginBottom: '8px' }}>Match Results</h1>
        <p><strong>Job Posting:</strong> {result.jobTitle}</p>
      </header>

      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', alignItems: 'start' }}>
        {/* Score Card */}
        <div className="card" style={{ textAlign: 'center', position: 'sticky', top: '100px' }}>
          <h2>ATS Score</h2>
          <div style={{
            position: 'relative',
            width: '160px',
            height: '160px',
            margin: '32px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="transparent"
                stroke="var(--background)"
                strokeWidth="12"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="transparent"
                stroke={scoreColor}
                strokeWidth="12"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * result.matchPercentage) / 100}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div style={{ position: 'absolute', fontSize: '32px', fontWeight: '800', color: scoreColor }}>
              {Math.round(result.matchPercentage)}%
            </div>
          </div>
          <p style={{ fontWeight: '600', color: scoreColor }}>
            {result.matchPercentage >= 70 ? 'Strong Match' :
              result.matchPercentage >= 40 ? 'Good Potential' : 'Needs Improvement'}
          </p>
        </div>

        {/* Detailed Feedback */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '24px' }}>Skill Analysis</h3>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', marginTop: 0 }}>
              <div>
                <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--success)', marginBottom: '16px' }}>
                  ✓ Matched Skills
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {result.matchedSkills.map((skill, i) => (
                    <span key={i} style={{
                      padding: '6px 12px',
                      background: 'rgba(34, 197, 94, 0.1)',
                      color: 'var(--success)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      {skill}
                    </span>
                  ))}
                  {result.matchedSkills.length === 0 && <p style={{ fontSize: '14px' }}>No matches found.</p>}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--error)', marginBottom: '16px' }}>
                  ! Missing Skills
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {result.missingSkills.map((skill, i) => (
                    <span key={i} style={{
                      padding: '6px 12px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: 'var(--error)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      {skill}
                    </span>
                  ))}
                  {result.missingSkills.length === 0 && <p style={{ fontSize: '14px' }}>Perfect skill alignment!</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '16px' }}>AI Recommendations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {result.skillSuggestions.map((suggestion, i) => (
                <div key={i} style={{
                  padding: '16px',
                  background: 'var(--background)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  borderLeft: '4px solid var(--primary)',
                  lineHeight: '1.6'
                }}>
                  {suggestion}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/dashboard" className="btn btn-primary" style={{ flex: 1 }}>Dashboard</Link>
            <Link to="/jobs" className="btn btn-secondary" style={{ flex: 1 }}>Back to Jobs</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
