# 1Fi Assignment

Live Demo: [https://1fi-rajneesh.vercel.app/](https://1fi-rajneesh.vercel.app/)

Demo Video: [https://drive.google.com/file/d/1OhvFdN7iF0ynwGnM2wA9QCxUFU4J4Wxv/view?usp=sharing](https://drive.google.com/file/d/1OhvFdN7iF0ynwGnM2wA9QCxUFU4J4Wxv/view?usp=sharing)

GitHub: [https://github.com/RajneeshYadav-123/1Fi_Assignment](https://github.com/RajneeshYadav-123/1Fi_Assignment)

Backend API: [https://frontend-ten-ochre-72.vercel.app/api/products](https://frontend-ten-ochre-72.vercel.app/api/products)


Project Overview

The application is a full-stack product experience where users can browse smartphones, view detailed product information, select available variants, and choose from different EMI plans.

Product data is stored in MongoDB Atlas and accessed through a Node.js and Express REST API. The React frontend consumes these APIs and dynamically renders the product information.

Both the frontend and backend are deployed on Vercel.

Features
Product listing and product details pages
Dynamic product data fetched from MongoDB
Product variant selection such as color and storage
Multiple EMI plan options
EMI interest rate and cashback information
Popular EMI plan indication
Product pricing with MRP and discounted price
Demo checkout flow
Responsive design for desktop and mobile
REST API for products and health checks
MongoDB-backed product data
Separate Vercel deployments for frontend and backend
Tech Stack
Frontend
React
Vite
JavaScript
Tailwind CSS
React Router
Axios
Backend
Node.js
Express.js
JavaScript
Mongoose
dotenv
CORS
Database
MongoDB Atlas
Deployment
Vercel
Architecture
                    Internet
                       |
              +--------+--------+
              |                 |
              v                 v
       Vercel Frontend    Vercel Backend
       React + Vite       Node + Express
              |                 |
              |   REST API      |
              +-------->--------+
                       |
                       v
                 MongoDB Atlas

The frontend communicates with the Express backend through HTTP REST APIs. The backend uses Mongoose to interact with MongoDB Atlas.

Project Structure
1Fi_Assignment/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seed/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   ├── vercel.json
│   └── .env.example
│
├── README.md
├── .gitignore
└── package.json
Database Schema

The application uses a Product collection in MongoDB. Mongoose is used to define and interact with the schema.

Product
Field	Type	Description
name	String	Product name
slug	String	Unique URL-friendly identifier
brand	String	Product brand
description	String	Product description
mrp	Number	Maximum retail price
price	Number	Selling price
images	Array	Product image URLs
variants	Array	Available product variants
emiPlans	Array	Available EMI plans
Product Variants

Each product can contain multiple variants.

name
type
value
available

For example, variants can represent different colors or storage capacities.

EMI Plans

Each product can have multiple EMI plans.

monthlyAmount
tenure
interestRate
cashback
label
isPopular
enabled

Keeping variants and EMI plans inside the product document makes it straightforward to retrieve all information required for a product details page in a single API request.

API Documentation
Health Check

GET

/api/health

Used to verify that the backend is running.

Example response:

{
  "success": true,
  "message": "API is running successfully"
}
Get All Products

GET

/api/products

Returns a list of products with summary information.

Example response:

{
  "success": true,
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Apple iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "mrp": 134900,
      "price": 127400,
      "images": ["url"]
    }
  ]
}
Get Product by Slug

GET

/api/products/:slug

Returns complete product information including variants and EMI plans.

Example:

/api/products/iphone-17-pro

Example response:

{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "Apple iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "price": 127400,
    "variants": [],
    "emiPlans": []
  }
}

If the requested product does not exist:

{
  "success": false,
  "message": "Product not found"
}
Local Setup
Prerequisites

Make sure the following are installed:

Node.js
npm
MongoDB Atlas account
1. Clone the Repository
git clone https://github.com/RajneeshYadav-123/1Fi_Assignment.git
cd 1Fi_Assignment
2. Install Dependencies

Install the dependencies for both frontend and backend:

npm run install:all
3. Configure Environment Variables

Create the required environment files.

Backend

Create:

server/.env

Add:

PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=http://localhost:5173
Frontend

Create:

client/.env

Add:

VITE_API_URL=http://localhost:5000

Do not commit .env files or database credentials to GitHub.

4. Seed the Database

Run:

npm run seed

This adds the sample products, variants, and EMI plans to MongoDB.

5. Start the Application

Run:

npm run dev

The application will be available at:

Frontend: http://localhost:5173
Backend:  http://localhost:5000
Deployment

The project is deployed using two separate Vercel projects.

Frontend

The React/Vite application is deployed on Vercel.

Framework: Vite
Root Directory: client

The frontend uses the following environment variable:

VITE_API_URL=https://frontend-ten-ochre-72.vercel.app

This allows the deployed frontend to communicate with the production backend.

Backend

The Express API is also deployed on Vercel.

Root Directory: server
Entry point: src/server.js
Vercel configuration: server/vercel.json

The backend uses environment variables for the MongoDB connection and frontend origin.

MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=https://1fi-rajneesh.vercel.app
Production API

The deployed backend is available at:

https://frontend-ten-ochre-72.vercel.app

For example:

https://frontend-ten-ochre-72.vercel.app/api/health
https://frontend-ten-ochre-72.vercel.app/api/products
https://frontend-ten-ochre-72.vercel.app/api/products/:slug
Deployment Architecture
                    User
                     |
                     v
          https://1fi-rajneesh.vercel.app
                     |
                     | REST API
                     v
     https://frontend-ten-ochre-72.vercel.app
                     |
                     | Mongoose
                     v
               MongoDB Atlas
Design & Implementation Notes

The application follows a simple separation of concerns:

React handles the user interface and client-side routing.
Axios handles communication between the frontend and backend.
Express provides the REST API.
Controllers contain request-handling logic.
Mongoose manages MongoDB interaction and schemas.
MongoDB Atlas stores products, variants, and EMI plans.
Vercel hosts both the frontend and backend.

The product details API returns the complete product document so that the frontend can render product information, variants, and EMI plans without making multiple requests for the same product.

Future Improvements
Add user authentication and authorization.
Integrate a real payment gateway such as Razorpay or Stripe.
Add an admin dashboard for product and inventory management.
Add order management and order history.
Add automated unit and integration tests.
Add API validation and improved error handling.
Add caching for frequently requested product data.
Add production monitoring and structured logging.
Links

Live Application:
https://1fi-rajneesh.vercel.app/

Backend API:
https://frontend-ten-ochre-72.vercel.app/api/products

Demo Video:
https://drive.google.com/file/d/1OhvFdN7iF0ynwGnM2wA9QCxUFU4J4Wxv/view?usp=sharing

GitHub Repository:
https://github.com/RajneeshYadav-123/1Fi_Assignment
