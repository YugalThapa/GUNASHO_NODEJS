# 🗣️ Gunasho – Community Complaint System

Gunasho is a Node.js-based backend project that allows users (citizens) to register complaints, track their status, and communicate with administrators. It includes authentication, image proof uploads, email notifications, and filtering by complaint status/category.

---

## 📁 Project Structure
<pre> ```
GUNASHO_NODEJS/
│
├── src/
│ ├── Controller/
│ │ ├── complainController.js      # Handles complaint logic (register, update, delete, history)
│ │ └── userController.js          # Handles user registration, login
│ │
│ ├── Middleware/
│ │ ├── authMiddleware.js          # JWT token verification
│ │ └── imageMiddleware.js         # Multer configuration for file/image uploads
│ │
│ ├── Model/
│ │ ├── complainModel.js           # Mongoose schema for complaints
│ │ └── userModel.js               # Mongoose schema for users
│ │
│ ├── Routes/
│ │ ├── complainRoute.js           # Routes for complaint APIs
│ │ └── userRoute.js               # Routes for user auth APIs
│ │
│ ├── Services/
│ │ └── mailSender.js              # Sends confirmation emails using nodemailer
│ │
│ ├── Static/
│ │ ├── complainMail.js            # HTML template for complaint-related emails
│ │ └── registerMail.js            # HTML template for user registration confirmation
│ │
│ └── storage/                     # Folder to store uploaded complaint images
│
├── .env                           # Environment variables (Mongo URL, JWT secret, etc.)
├── .gitignore                     # Ignored files/folders for Git
├── index.js                       # Entry point of the application
├── package.json                   # Project dependencies and scripts
└── package-lock.json              # Version-locked dependencies
```<pre> 
---

## 🚀 Features

- ✅ User registration and login (JWT authentication)
- 📄 Submit complaints with:
  - Category
  - Description
  - Optional image proof (uploaded with Multer)
- 🔍 Filter complaint history by category and status
- 📧 Email notifications (using NodeMailer)
- 👮 Admin-ready support for verifying complaints (future scope)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

    ```bash
        git clone https://github.com/YugalThapa/GUNASHO_NODEJS.git
        cd GUNASHO_NODEJS

### 2. Install Dependencies
    ```bash
        npm install 


### 3. Configure Environment
    Create a .env file with:
        DB_URL = your_mongodb_connection_string
        PORT = 3000
        EMAIL = your_email@gmail.com
        APP_PASSWORD = app_password
        JWT_SECRET_KEY = your_jwt_secret

### 4. Start the Server
    ```bash
        npm run dev

## 🧪 Testing (Postman Tips)
Use form-data to submit a complaint with an image:

    Key: image → Type: File

    Other keys: complainFor, category, description


