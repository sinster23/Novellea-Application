# 📚 Welcome to my Expo app 👋

Welcome to the **Novellea App**!  
This project helps users discover and get personalized recommendations for novels they might enjoy. 
Users can also send their personal recommendations and join thhe community of Novellees.

<table>
  <tr>
    <td><img src="https://github.com/sinster23/Screenshots/blob/main/novellea-images/p5.jpeg" alt="Screenshot 1" width="280"/></td>
    <td><img src="https://github.com/sinster23/Screenshots/blob/main/novellea-images/p4.jpeg" alt="Screenshot 2" width="280"/></td>
    <td><img src="https://github.com/sinster23/Screenshots/blob/main/novellea-images/p3.jpeg" alt="Screenshot 3" width="280"/></td>
    <td><img src="https://github.com/sinster23/Screenshots/blob/main/novellea-images/p2.jpeg" alt="Screenshot 4" width="280"/></td>
    <td><img src="https://github.com/sinster23/Screenshots/blob/main/novellea-images/p1.jpeg" alt="Screenshot 5" width="280"/></td>
  </tr>
</table>

---

## ✨ Features

- 📖 Get suggestions from the Novel lovers  
- 📝 Personalize and share novel recommendations  
- 🔐 User authentication and profile management  
- ⚡ Fast and intuitive user interface  
- 🖼️ User avatars powered by DiceBear  
- ☁️ Cloudinary image storage for efficient media management  

---

## 📁 Folders Overview

### `/backend`
- `src/lib/` - Contains additional backend components (Crude, Mongo, Cloudinary)  
- `src/middleware/` - Authentication & error handling middleware  
- `src/models/` - MongoDB schemas and models  
- `src/routes/` - API endpoints for user and books route  
- `index.js` - Main entry point for the backend server  

### `/ui`
- `app/` - Screens like Login, Signup, Home, Profile  
- `components/` - Reusable UI components (e.g., NovelCard, Header, Cards)  
- `lib/` - Additional components in utils  
- `constants/` - CSS constants  
- `assets/` - Images, icons, fonts (including JetBrains Mono)  
- `store/` - Uses AuthStore for easy usage  

---

## 🚀 Tech Stack

### 🔹 Frontend (Mobile App)
- **React Native** with **Expo**  
- **DiceBear Avatars** for user profile images  
- **Storyset** for illustrations and designs  
- **JetBrains Mono** font for clean typography  
- **React Navigation** for app routing  
- **NativeWind / TailwindCSS** for styling  

### 🔹 Backend (API Server)
- **Node.js + Express.js** for REST API  
- **MongoDB** for database storage  
- **Cloudinary** for storing and managing user-uploaded images  
- **JWT** for user authentication  
- **Render.com** for deploying the backend API (thanks to Crude Jobs for surviving free subscription limits 😄)

---

## 🚀 Clone the Repository

```bash
# Clone the repository
https://github.com/sinster23/Novellea-Application.git

# Move into the project directory
cd Novellea
```
### 🖥️ Backend Setup

```bash
cd backend
npm install
# or
yarn install

# Create your environment variables file
cp .env.example .env

# Add your credentials in the newly created .env file

# Start the backend server
npm run dev
# or
node server.js
```

### 📱 Frontend Setup

```bash
cd ui
npm install
# or
yarn install

# Start the Expo development server
npx expo start

# Scan the QR code with Expo Go on your mobile device
```

---

## ⚙️ Environment Variables
Make sure you fill in the .env files with your own credentials:

Backend .env Example:
```bash
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
---

## 🚀 Deploy Backend API on Render

You can easily deploy your backend server on [Render](https://render.com). Follow the steps below to get your API live and connected to your frontend app.

---

### 🔧 Prerequisites
- MongoDB Atlas database connection
- Cloudinary account for image uploads
- GitHub repository containing the backend code

---

### 🛠️ Step-by-Step Guide

#### 1️⃣ Sign Up and Connect GitHub Repo
1. Go to [Render](https://render.com/).
2. Sign up or log in with your GitHub account.
3. Click **"New Web Service"**.
4. Connect your GitHub repo (select the repo where your backend code lives).

#### 2️⃣ Configure Your Web Service
- **Name**: Choose any name for your backend service.
- **Environment**: Node
- **Region**: Closest to your users (e.g., Oregon for US)
- **Branch**: main (or whichever branch you're using)
- **Build Command**:
  ```bash
  npm install
  ```
  - **Start Command**:
  ```bash
  npm run dev
  # or
  node index.js
  ```
  
---

### Deploy the Service
- Click Create Web Service.
- Render will install dependencies, build, and deploy your backend.
- Once deployed, Render will provide you with a Public URL, something like:

```bash
https://your-backend-service.onrender.com
```

---

## ✅ You're All Set!
Backend runs on: http://localhost:5000 (or your custom port)

Frontend runs via Expo Go (live on render.com)

Customize, explore, and enjoy! 🎉
