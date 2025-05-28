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
| a@email.com     | 1234   |
| b@email.com| 1234   |
| c@email.com   | 1234 |

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
git clone https://github.com/Atanurag/budget_backend.git
cd budget_backend
npm install (install dependencies)
node index.js (run app)
```
### 2. Assumptions
Each user has one budget per month.

JWT token must be included in Authorization: Bearer <token> header for all protected routes.

No user registration or password reset API as per requirements.

### 3. Acknowledgements
Express.js for backend routing and middleware

Mongoose ODM for MongoDB

jsonwebtoken for JWT authentication

Render.com for deployment hosting

### 4. Folder Structure

src/
├── models/          
├── routes/          
├── middleware/      
├── db.js         
└── index.js        

