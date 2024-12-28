# 🌐 Fullstack App

This is a **Fullstack Application** built with a **React (Next.js)** frontend and an **Express (Node.js)** backend. The project is structured to ensure scalability, maintainability, and ease of use. Below is a detailed description of the folder structure, packages used, and steps to run the app.

---

## 📂 **Project Structure**

```
fullstack-app/
├── backend/                 # Backend API and server-side logic
│   ├── src/                 # Backend source code
│   └── package.json         # Backend dependencies and scripts
├── frontend/                # Frontend client-side app
│   └── package.json         # Frontend dependencies and scripts
├── package.json             # Root dependencies and scripts for fullstack app
└── README.md                # Project documentation
```

---

## 🛠️ **Backend**

### **Folder Structure**
The backend is organized for modularity and scalability:

```
backend/
├── src/
│   ├── api/                 # Routes, controllers, and middlewares
│   ├── config/              # Config files (DB, environment)
│   ├── core/                # Business logic and domain models
│   ├── infrastructure/      # Database models and repositories
│   ├── tests/               # Integration and unit tests
│   ├── app.js               # Express app configuration
│   └── server.js            # Server startup logic
├── .env                     # Environment variables
└── package.json             # Dependencies and scripts
```

### **Key Packages**
- **`express`**: Web framework for Node.js 🌐  
- **`mongoose`**: MongoDB object modeling 🗄️  
- **`passport`**: Authentication middleware 🔐  
- **`bcrypt`**: Secure password hashing 🔑  
- **`dotenv`**: Environment variables management 📜  
- **`axios`**: HTTP client for API requests 🌐  
- **`nodemon`**: Dev server with live reload 🔄  

---

## 🎨 **Frontend**

### **Folder Structure**
The frontend is powered by **Next.js** for server-side rendering and TailwindCSS for styling.

```
frontend/
├── pages/                   # Next.js pages (routing)
├── components/              # Reusable UI components
├── styles/                  # Global and TailwindCSS styles
├── public/                  # Static assets
├── .env.local               # Environment variables
└── package.json             # Dependencies and scripts
```

### **Key Packages**
- **`next`**: React framework with SSR and static site generation ⚡  
- **`react`**: UI library for building components 🎨  
- **`axios`**: Fetching data from the backend 🌐  
- **`tailwindcss`**: Utility-first CSS framework ✨  
- **`typescript`**: Type safety for the frontend ⚙️  

---

## 🚀 **How to Run the Fullstack App**

### Prerequisites
- **Node.js** (LTS version or higher) installed.
- **MongoDB** running locally or hosted.

### 1️⃣ **Install Dependencies**
From the root directory, run:
```bash
npm install
```

This installs dependencies for both the backend and frontend.

---

### 2️⃣ **Set Up Environment Variables**

#### Backend `.env`
In the `backend/` directory, create a `.env` file with the following:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/fleet-management
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
```

#### Frontend `.env.local`
In the `frontend/` directory, create a `.env.local` file with the following:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### 3️⃣ **Run the App**

#### Development Mode
```bash
npm run dev
```

This will:
- Start the backend at **`http://localhost:5000`**.  
- Start the frontend at **`http://localhost:3000`**.

#### Production Mode
1. Build both the frontend and backend:
   ```bash
   npm run build
   ```
2. Start the app:
   ```bash
   npm start
   ```

---

## 📦 **Scripts**

Here are some useful commands:

### Root
- `npm run dev`: Starts both the backend and frontend in development mode.
- `npm run start`: Starts the app in production mode.

### Backend
- `npm run dev`: Starts the backend with live reload using `nodemon`.
- `npm run start`: Starts the backend in production.

### Frontend
- `npm run dev`: Starts the Next.js frontend in development mode.
- `npm run build`: Builds the frontend for production.
- `npm run start`: Serves the production build.

---

## 🎯 **Features**
- **Frontend**:
  - Built with **Next.js** and **React**.
  - **TailwindCSS** for responsive and modern styling.

- **Backend**:
  - RESTful API built with **Express**.
  - MongoDB integration using **Mongoose**.
  - User authentication with **Passport** and **bcrypt**.

- **Fullstack**:
  - Seamless integration between the backend API and the frontend client.
  - Environment-specific configuration for production and development.

---

Enjoy building! 🚀