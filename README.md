# AI Resume Analyser

An **AI-powered, serverless resume analysis web application** that helps job seekers evaluate, optimize, and improve their resumes using modern AI and cloud-native technologies.

**Live Demo:** https://airesumeanalyser-woad.vercel.app  
**GitHub:** https://github.com/Shantanu67hy/AI-Resume-Analyser

 Overview

In today’s hiring process, most resumes are filtered by **Applicant Tracking Systems (ATS)** before reaching recruiters.  
**AI Resume Analyser** is built to help users understand how their resume performs against such systems and receive **actionable, AI-driven feedback**.

The project is designed with a **modern serverless architecture**, using **PuterJS as the backend**, eliminating the need for traditional servers while still supporting authentication, file handling, and AI processing.

---

 Key Features

- Resume upload & cloud storage  
- AI-based resume parsing & analysis  
- Skill & keyword extraction  
- ATS-style resume evaluation  
- Improvement suggestions & insights  
- Built-in authentication (via PuterJS)  
- Fully serverless backend  
- Responsive and clean UI  
---
Architecture
Frontend (React + TypeScript)
|
| PuterJS Cloud APIs
↓
PuterJS Runtime (Serverless Backend)
|
├── Authentication
├── File Storage
└── AI Processing


### Why this architecture?
- No backend server to manage  
- No database setup required  
- Secure, scalable, and cloud-native  
- Faster development and deployment  

---

## Tech Stack

### Frontend
- React.js  
- TypeScript  
- Vite  
- Tailwind CSS  
- React Router  

### Backend
- **PuterJS**
  - Authentication
  - Cloud file system
  - Serverless backend execution
  - AI orchestration

### Deployment
- Vercel (Frontend hosting)

---

## Backend with PuterJS (How It Works)

Instead of a traditional backend (Express / Flask / Django), **PuterJS** is used to handle:

-  Secure resume file uploads and storage  
-  User authentication and session management  
-  AI-powered resume analysis logic  
-  On-demand serverless execution  

This significantly reduces infrastructure complexity while maintaining **production-grade backend capabilities**.
