# 📚 Welcome to my Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

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

## ✅ You're All Set!
Backend runs on: http://localhost:5000 (or your custom port)

Frontend runs via Expo Go (locally and live reload)

Customize, explore, and enjoy! 🎉
