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
- Travel discovery with personalized recommendations
- User stories: share travel experiences with photos and text
- Maps (Mapbox)
- this website includes Authentication, Authorization, Error Handling
- Reviews and ratings for destinations, hotels, and activities
- Image uploads (handled via Multer / Cloudinary / MongoDB Atlas DataBase)

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
