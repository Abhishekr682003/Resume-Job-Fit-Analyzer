import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ['application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF, DOC, or DOCX file');
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Resume uploaded successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Error uploading resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '8px' }}>Upload Resume</h1>
        <p style={{ textAlign: 'center', marginBottom: '40px' }}>
          Upload your professional resume for instant AI analysis.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ display: 'none' }}>Resume File</label>
            <div
              onClick={() => document.getElementById('resumeInput').click()}
              style={{
                border: '2px dashed var(--border)',
                borderRadius: '12px',
                padding: '48px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'var(--transition)',
                background: file ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                borderColor: file ? 'var(--primary)' : 'var(--border)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.background = 'rgba(79, 70, 229, 0.02)';
              }}
              onMouseLeave={(e) => {
                if (!file) {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <input
                id="resumeInput"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                required
              />
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(79, 70, 229, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: 'var(--primary)',
                fontSize: '24px'
              }}>
                📄
              </div>
              <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>
                {file ? file.name : 'Click to select resume'}
              </h3>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>
                {file ? 'File selected ready for upload' : 'Support PDF, DOC, DOCX up to 10MB'}
              </p>
            </div>
          </div>

          {error && <div className="error-message" style={{ marginBottom: '20px' }}>{error}</div>}
          {success && (
            <div className="success-message" style={{
              marginBottom: '20px',
              padding: '12px',
              background: '#F0FDF4',
              color: 'var(--success)',
              borderRadius: '8px',
              border: '1px solid #DCFCE7',
              fontSize: '0.875rem',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              {success}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading || !file}
            style={{ marginTop: '32px' }}
          >
            {loading ? 'Analyzing & Uploading...' : 'Upload & Analyze Resume'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResumeUpload;
