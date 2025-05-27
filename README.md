# Personal Budget Tracker – Backend (Node.js + Express + MongoDB)

This is the backend API for the **Personal Budget Tracker** application. It handles user authentication, transaction management, and budget tracking with data stored in MongoDB Atlas.

---

## ✅ Live API Endpoint

Backend API hosted on Render:  
https://budget-backend-2xm2.onrender.com

---

## ✅ Demo Credentials

You can use the following test user credentials to log in and test the API:

| Email              | Password  |
|--------------------|-----------|
| demo@budget.com     | demo123   |
| testuser@example.com| test123   |
| user1@budget.com    | password1 |

---

## ✨ Features

- **User Authentication**
  - Login with email and password
  - JWT-based authentication
  - All routes are protected except login and register

- **Transactions**
  - Create, update, delete, and fetch income/expense transactions

- **Budget Management**
  - Set and update monthly budget per user
  - Get budget summary comparing actual expenses with budget

- **Data Models**
  - **User**: Stores email, hashed password, and basic info
  - **Transaction**: Income and expense entries linked to user and category
  - **Budget**: Monthly budget data linked to user

---

## ⚙️ Tech Stack

- **Node.js** with **Express.js**
- **MongoDB Atlas** for database
- **Mongoose** ODM for MongoDB interaction
- **JWT** for stateless authentication
- **Deployed on Render platform**

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/personal-budget-tracker-backend.git
cd personal-budget-tracker-backend
