# 1Fi SDE1 Assignment

Live Demo: [ADD DEPLOYED URL]

Demo Video: [ADD GOOGLE DRIVE/YOUTUBE URL]

GitHub: [ADD GITHUB URL]

## Project Overview
This project is a complete full-stack e-commerce-style product page that displays smartphones with multiple EMI plans backed by mutual funds. It dynamically retrieves product information, variants, and EMI plans from a MongoDB database through an Express API and presents them using a React frontend.

## Features
- Dynamic product listing and details pages.
- Real-time data fetching from MongoDB.
- Variant selector (e.g., Color, Storage).
- Multiple EMI plan options with interest and cashback details.
- Proceed to checkout flow (demo only).
- Responsive design for mobile and desktop.

## Tech Stack
**Frontend:** React, Vite, JavaScript, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express.js, JavaScript, Mongoose, dotenv, cors  
**Database:** MongoDB Atlas  

## Architecture
```
React Frontend
      |
      | HTTP/REST API
      v
Node.js + Express Backend
      |
      | Mongoose
      v
MongoDB
```

## Folder Structure
```
1fi-emi-store/
│
├── client/                 # Frontend React Application
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # React Router pages
│   │   ├── services/       # API integration
│   │   ├── utils/          # Helper functions
│   │   ├── App.jsx         # Main router
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Tailwind CSS
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Backend Express Application
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── seed/           # Database seeding script
│   │   ├── app.js          # Express app setup
│   │   └── server.js       # Server entry point
│   ├── package.json
│   └── .env.example
│
├── README.md
├── .gitignore
└── package.json            # Root configuration for concurrent execution
```

## MongoDB Schema
This application uses Mongoose to interact with MongoDB. The main entity is the `Product` schema.

**Product Schema:**
- `name` (String)
- `slug` (String, Unique)
- `brand` (String)
- `description` (String)
- `mrp` (Number)
- `price` (Number)
- `images` (Array of Strings)
- `variants` (Subdocument Array)
  - `name`, `type`, `value`, `available`
- `emiPlans` (Subdocument Array)
  - `monthlyAmount`, `tenure`, `interestRate`, `cashback`, `label`, `isPopular`, `enabled`

MongoDB was selected due to its flexible schema design, allowing variants and EMI plans to be easily embedded within a product document without requiring complex relational joins.

## API Endpoints

### `GET /api/health`
Check API health.
**Example Response:**
```json
{
  "success": true,
  "message": "API is running successfully"
}
```

### `GET /api/products`
Retrieve a list of all products (summary view).
**Example Response:**
```json
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
```

### `GET /api/products/:slug`
Retrieve full product details including variants and EMI plans.
**Example Request:** `/api/products/iphone-17-pro`
**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "Apple iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "price": 127400,
    "variants": [...],
    "emiPlans": [...]
  }
}
```
**Error Response:**
```json
{
  "success": false,
  "message": "Product not found"
}
```

## Setup & Installation

### 1. Database Setup (MongoDB Atlas)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist your IP address.
3. Get the connection string (URI).

### 2. Environment Variables
Create `.env` files in both `server/` and `client/` directories based on the `.env.example` provided.

**server/.env**
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/1fi-store?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

**client/.env**
```
VITE_API_URL=http://localhost:5000
```

### 3. Installation
Install dependencies for both frontend and backend from the root directory:
```bash
npm run install:all
```

### 4. Database Seeding
Seed the database with sample products and EMI data:
```bash
npm run seed
```

### 5. Running the Application
Start both the frontend and backend servers concurrently:
```bash
npm run dev
```
- Frontend will run on `http://localhost:5173`
- Backend will run on `http://localhost:5000`

## Deployment Instructions

### Frontend (Vercel)
1. Push your repository to GitHub.
2. Go to Vercel and import the repository.
3. Set the Framework Preset to **Vite**.
4. Set the Root Directory to `client`.
5. Add Environment Variable: `VITE_API_URL` (URL of your deployed backend).
6. Deploy.

### Backend (Render / Railway)
1. Import the repository in Render.
2. Select **Web Service**.
3. Set the Root Directory to `server`.
4. Build Command: `npm install`
5. Start Command: `node src/server.js`
6. Add Environment Variables: `PORT=5000`, `MONGODB_URI` (your atlas URI), `CLIENT_URL` (your deployed Vercel URL).
7. Deploy.

## Future Improvements
- Implement a real authentication system.
- Integrate a real payment gateway (Razorpay/Stripe).
- Add an admin dashboard for inventory management.
- Implement caching for product data.
