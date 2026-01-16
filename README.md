# 🚀 Lead Management Dashboard (Mini CRM)

A full-stack CRM application featuring a **unique 3D Glassmorphism UI**, built with the MERN stack. This dashboard allows users to manage leads with server-side searching, filtering, sorting, and pagination.

---

## 🌐 Deployed Links
* **Frontend (Live App):** [PASTE_VERCEL_LINK_HERE]
* **Backend (API):** [PASTE_RENDER_LINK_HERE]

---

## 🔑 Demo Credentials
The application uses a simulated authentication system for the assignment.

* **Login Method:** Click the **"Login as Admin"** button on the home screen.
* **Username/Password:** Not required (Simulated Admin Access).

---

## ✨ Features

### 🎨 User Interface (UI/UX)
- **3D Glassmorphism Design:** Translucent panels with background blur and mesh gradients.
- **Tactile Interactions:** Buttons with 3D press-down physics and shadow states.
- **High Contrast Mode:** Optimized slate-dark theme for maximum readability.
- **Animations:** Floating metric cards and smooth hover transitions.
- **Responsive:** Fully optimized for Mobile, Tablet, and Desktop.

 ---

 ## 🛠 Tech Stack

| Component    | Technology                                      |
| :----------- | :---------------------------------------------- |
| **Frontend** | React (Vite), Tailwind CSS (v3), Lucide React   |
| **Backend** | Node.js, Express.js, REST API                   |
| **Database** | MongoDB Atlas (Cloud)                           |
| **Dev Tools**| Postman, Git, VS Code                           |
| **Deployment**| Vercel (Client), Render (Server)               |

---

### ⚙️ Functional Features
- **Server-Side Pagination:** Efficiently handles large datasets.
- **Advanced Search:** Real-time search by Name or Email.
- **Filtering & Sorting:** Filter by Lead Status (New, Qualified, etc.) and Sort by Date/Name.
- **Analytics:** Real-time metrics for Total Leads, Conversion Rates, and New Opportunities.
- **Data Seeding:** Automated script to generate 350+ dummy leads for testing.

---

## 📂 Project Structure

```bash
lead-dashboard/
├── backend/                 # Node.js & Express API
│   ├── models/
│   │   └── Lead.js          # Mongoose Schema
│   ├── .env                 # Environment variables (Mongo URI)
│   ├── package.json         # Backend dependencies
│   ├── seed.js              # Script to populate DB with dummy data
│   └── server.js            # Main server entry point
│
├── frontend/                # React + Vite Client
│   ├── public/
│   ├── src/
│   │   ├── App.jsx          # Main Dashboard Component
│   │   ├── index.css        # Tailwind & Custom 3D Styles
│   │   └── main.jsx         # React Entry
│   ├── package.json         # Frontend dependencies
│   ├── postcss.config.js    # PostCSS Config
│   ├── tailwind.config.js   # Tailwind Config
│   └── vite.config.js       # Vite Config
│
└── README.md                # Documentation
```

---

## ⚙️ Environment Variables

To run this project locally, you need to configure the following environment variables.

**1. Backend (`backend/.env`)**
Create a file named `.env` inside the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/crm-db
```

**2. Frontend (frontend/src/App.jsx)**
```bash
Local Development: const API_URL = 'http://localhost:5000/api';
Production: const API_URL = 'https://your-backend-app.onrender.com/api';
```

---

## ⚡ Setup & Installation

### 1. Clone the Repository
```bash
git clone <YOUR_GITHUB_REPO_LINK>
cd lead-dashboard
```
### 2. Backend Setup
Navigate to the backend directory, install dependencies, and start the server.
```bash
cd backend
npm install
```
### 🌱 Seeding Method (Important): This project includes a script to populate the database with 350+ dummy leads. Run this once before starting the server.
```bash
node seed.js
(Output should say: "Seeded 350 Leads")
```
### Start Server:
```bash
node server.js
Server runs on http://localhost:5000
```
### 3. Frontend Setup
Open a new terminal window and navigate to the frontend directory.
```bash
cd ../frontend
npm install
npm run dev
Frontend runs on http://localhost:5173
```
---
