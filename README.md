"# Hackathon" 
# 🚀 GearGuard – Maintenance Management System (CMMS)
GearGuard is a **modern Maintenance Management System** built to manage equipment, maintenance requests, technicians, and workflows efficiently.  
It supports **role-based access**, **automated technician assignment**, and a **Kanban-based maintenance lifecycle**.
---
## 📌 Problem Statement
Organizations face difficulty in:
- Managing maintenance requests
- Assigning the right technician
- Tracking equipment lifecycle
- Handling preventive & corrective maintenance efficiently
**GearGuard** solves this by providing a centralized, automated, and role-based CMMS platform.
---
## ✨ Features
### 🔐 Authentication & Roles
- Login & Signup
- Roles:
  - **Manager**
  - **Technician**
- Secure JWT-based authentication

### 🧑‍🔧 Technician Management
- Technicians have categories:
  - IT
  - Mechanical
  - Electrical
  - Vehicle
- Managers can view all technicians
### 🛠 Maintenance Requests
- Create corrective & preventive requests
- Select maintenance category
- Automatic technician assignment based on category
- Fallback to **Unassigned** if no technician is available
### 📋 Kanban Board
- Status flow:
  - New → In Progress → Repaired / Scrapped
- Drag & drop workflow
- Shows technician name & category
### 🧾 Equipment Management
- Add & manage equipment
- Scrap equipment from Kanban
- Scrapped equipment auto-removed after defined period
### 📅 Preventive Maintenance Calendar
- Schedule preventive tasks
- Calendar-based view
### 📜 History & Audit
- View repaired & scrapped requests
- Track past maintenance actions
### 🎨 Modern UI
- White & sky-blue theme
- Gradient navbar
- Clean cards & layouts
- Professional SaaS-style design
---
## 🏗 Tech Stack
### Frontend
- React + Vite
- React Router
- Context API
- Axios
### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
---


## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/GearGuard.git
cd GearGuard

backend setup
cd backend
npm install

add this in .env file
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/gearguard
JWT_SECRET=supersecretkey123

run this for backend
npm run dev

Frontend Setup
cd frontend
npm install
npm run dev

frontend will run at : http://localhost:5173
backend will run at : http://localhost:5000
