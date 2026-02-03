# Complete Setup and Run Guide (MERN Stack)

## Step-by-Step Instructions to Run the AI-Based ATS Resume Analyzer

---

## 📋 Prerequisites Check

Before starting, ensure you have the following installed:

### 1. Node.js and npm
- **Required:** Node.js 16+ and npm 8+
- **Check version:**
  ```bash
  node -v
  npm -v
  ```
- **Download:** [Node.js Official Site](https://nodejs.org/)

### 2. MongoDB
- **Required:** MongoDB Server (Local or Cloud Atlas)
- **Local:** [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- **Cloud:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🗄️ Step 1: Database Setup

1. **Start MongoDB Service** (if local):
   - **Windows:** Search for "Services", find `MongoDB`, and ensure it's "Running".
   - **Command Line:** `mongod` (if in PATH).

2. **Database Name:** The application will automatically create a database named `ats_resume_db` on first connection.

---

## ⚙️ Step 2: Backend Configuration

1. **Navigate to Backend Directory:**
   ```bash
   cd backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Edit or create `.env` file in the `backend` folder:
   ```env
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/ats_resume_db
   JWT_SECRET=your_long_random_secret_string
   CORS_ORIGINS=http://localhost:3000
   ```

---

## 🚀 Step 3: Run Backend

1. **Start the Server:**
   ```bash
   # Production mode
   npm start
   
   # Development mode (with nodemon)
   npm run dev
   ```

2. **Verify Backend is Running:**
   Look for: `Server running on port 8080` and `MongoDB Connected`.
   - Test Health: `http://localhost:8080/api/health` (should return `{"status":"UP"}`)

**Keep this terminal window open!**

---

## 🎨 Step 4: Frontend Setup

1. **Open a NEW Terminal.**

2. **Navigate to Frontend Directory:**
   ```bash
   cd frontend
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Verify Backend Connection:**
   Ensure `frontend/.env` has the correct API URL:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:8080
   ```

---

## 🌐 Step 5: Run Frontend

1. **Start React App:**
   ```bash
   npm start
   ```

2. **Access Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✅ Step 6: Verify Workflow

1. **Register:** Create a new account.
2. **Login:** Access the dashboard.
3. **Upload:** Go to "Upload Resume" and select a PDF or DOCX file.
4. **Jobs:** Create a job or browse existing ones.
5. **Analyze:** Run the analysis to see the match percentage and skill gaps.

---

## 🐛 Troubleshooting

- **MongoDB Connection Error:** Ensure MongoDB service is running and the URI in `.env` is correct.
- **Proxy/CORS Errors:** Ensure the backend is on port 8080 and the frontend is on 3000.
- **Port In Use:** Kill any process on 8080 or 3000, or change ports in the respective `.env` files.

---

**Need Help?** Check the main `README.md` for more details!
