# WanderLust

Welcome to **Wanderlust**! This project aims to create a user-friendly and engaging platform for travelers to explore and share their adventures.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
---

## Project Overview
Wanderlust is designed to be a one-stop destination for all things travel. From discovering new places to sharing travel experiences, our platform offers a wide range of features to enhance the travel journey. Whether you're planning a trip or reminiscing, Wanderlust helps you connect with other travellers and organise your adventures.

---


## Features
🏕 Create, edit, and delete travel listings
🧾 Detailed listing pages with images and descriptions
🔐 Authentication system (register, login, logout)
👤 Authorization (only owners can edit/delete their listings)
📸 Cloud image upload (Cloudinary)
📍 Map integration using Mapbox (optional)
💬 Flash messages for feedback (success/error)
⚙ Responsive UI with Bootstrap

---

## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap  
- **Backend:** Node.js, Express.js, EJS, Multer, REST API  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** Passport (npm)  
- **Storage:** Cloudinary / MongoDB Atlas
- **Version Control:** Git, GitHub

---

## 🚀 Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/Narsimlu-561/WanderLust.git
    cd WanderLust
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Setup Environment Variables**
    - Create a `.env` file in the root directory.
    - Add the necessary environment variables:
      ```env
      MONGO_URI=your_mongodb_connection_string
      SESSION_SECRET=your_secret_key
      AWS_ACCESS_KEY_ID=your_aws_key
      AWS_SECRET_ACCESS_KEY=your_aws_secret
      ```

4. **Run the Application**
    ```bash
    nodemon app.js
    ```
