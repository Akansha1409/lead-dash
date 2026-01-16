# 🚀 3D Lead Management CRM

A full-stack CRM Dashboard featuring a **unique 3D Glassmorphism UI**, built with the MERN stack (MongoDB, Express, React, Node.js). 

This project goes beyond standard flat designs by implementing a "Deep Space" aesthetic with tactile 3D buttons, mesh gradients, and interactive floating elements, while maintaining high performance and responsiveness.

--

> **Demo Credentials:** > The app uses a simulated login. Simply click **"Login as Admin"** to access the dashboard.

---

## ✨ Features

### 🎨 User Interface (UI/UX)
- **3D Glassmorphism Design:** Translucent panels with background blur and mesh gradients.
- **Tactile Interactions:** Buttons with 3D press-down physics and shadow states.
- **High Contrast Mode:** Optimized slate-dark theme for maximum readability.
- **Animations:** Floating metric cards and smooth hover transitions.
- **Responsive:** Fully optimized for Mobile, Tablet, and Desktop.

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
