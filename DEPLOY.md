# ATS Resume Analyzer - Deployment Guide

This guide explains how to deploy the ATS Resume Analyzer application (Frontend + Backend) to a cloud provider like **Render** or run it locally using **Docker**.

## Project Structure
- `backend/`: Spring Boot Application (Java 17)
- `frontend/`: React Application (Node 18)
- `docker-compose.yml`: Orchestration for local development
- `render.yaml`: Blueprint for deployment on Render.com

## Option 1: Cloud Deployment (Render.com)

We recommend using Render's **Blueprints** feature for a seamless deployment.

### Prerequisites
1. A GitHub/GitLab repository containing this code.
2. A [Render.com](https://render.com) account.
3. A MySQL database (Render offers managed MySQL, or you can use an external provider like Railway, PlanetScale, or AWS RDS).

### Steps
1. **Push your code** to your remote repository.
2. **Create a Database**:
   - Note down the `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD`.
   - Connection string format: `jdbc:mysql://<hostname>:<port>/<database_name>`
3. **Deploy to Render**:
   - Go to the Render Dashboard.
   - Click **New +** -> **Blueprint**.
   - Connect your repository.
   - Render will detect `render.yaml`.
   - **Fill in the Environment Variables** when prompted:
     - `DB_URL`: Your MySQL JDBC URL.
     - `DB_USERNAME`: Database username.
     - `DB_PASSWORD`: Database password.
   - Click **Apply**.

### Post-Deployment Configuration
1. Once the **Backend** service is live, copy its URL (e.g., `https://ats-backend.onrender.com`).
2. The **Frontend** service will automatically try to connect to the backend using Render's internal service discovery, but for the browser to connect, the `REACT_APP_API_BASE_URL` must be the **public** URL of the backend.
   - Go to the **Frontend Service** in Render Dashboard -> **Environment**.
   - Ensure `REACT_APP_API_BASE_URL` is set to the **Backend Public URL** (e.g., `https://ats-backend.onrender.com`).
   - If `render.yaml` set it to the internal URL, update it to the public URL and redeploy the frontend.
3. Update **Backend CORS**:
   - Go to the **Backend Service** -> **Environment**.
   - Update `CORS_ORIGINS` to match your **Frontend Public URL** (e.g., `https://ats-frontend.onrender.com`).
   - Redeploy the backend.

## Option 2: Local Deployment (Docker Compose)

Run the entire stack locally with a single command.

### Prerequisites
- Docker Desktop installed and running.

### Steps
1. Open a terminal in the project root.
2. Run:
   ```bash
   docker-compose up --build
   ```
3. Access the application:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:8080](http://localhost:8080)
   - **Database**: Port 3306

## Validation
- Check Backend Health: `https://<backend-url>/health` should return `OK`.
- Check Frontend: Open the frontend URL. Try logging in or uploading a resume.

## Notes
- **Frontend Config**: The frontend `App.js` has been configured to read `REACT_APP_API_BASE_URL`.
- **Backend Config**: The backend `SecurityConfig.java` has been configured to read `CORS_ORIGINS` and `DB_URL` from environment variables.
