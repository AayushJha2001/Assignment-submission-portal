This document provides detailed instructions to clone, set up, and run the Assignment Submission Portal from my GitHub repository.

**Prerequisites**

Before you begin, ensure that you have the following installed on your system:

Node.js (v16 or later): Download Node.js
MongoDB (v5 or later): Download MongoDB
Git: Download Git


**Clone the Repository**
Open a terminal and navigate to the directory where you want to clone the project.

Clone the repository using the following command:

git clone https://github.com/AayushJha2001/Assignment-submission-portal.git

Navigate into the project directory:

cd assignment-portal


**Install Dependencies**

Install all the required Node.js packages using npm:

npm install


**Start MongoDB**

Start your MongoDB server locally:


**Run the Application**

Start the server:

npm start
The server will start on the port specified in the .env file (default: 3000).

You should see the following message in your terminal:

Server running at http://localhost:3000
Connected to MongoDB


**Test the API**

Using Postman
Use the base URL:

http://localhost:3000/api
Test the following endpoints:
User Routes
POST /users/register: Register a new user.
POST /users/login: Login to get a JWT token.
POST /users/upload: Upload an assignment.
GET /users/admins: Fetch all admins.
Admin Routes
GET /admins/assignments: View all assignments assigned to the admin.
POST /admins/assignments/
/accept: Accept an assignment.
POST /admins/assignments/
/reject: Reject an assignment.
