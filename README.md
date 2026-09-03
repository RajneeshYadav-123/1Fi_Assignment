# 1Fi Assignment

Live Demo: [https://1fi-rajneesh.vercel.app/]((https://1fi-rajneesh.vercel.app/))

Demo Video: [https://drive.google.com/file/d/1OhvFdN7iF0ynwGnM2wA9QCxUFU4J4Wxv/view?usp=sharing](https://drive.google.com/file/d/1OhvFdN7iF0ynwGnM2wA9QCxUFU4J4Wxv/view?usp=sharing)

GitHub: [https://github.com/RajneeshYadav-123/1Fi_Assignment](https://github.com/RajneeshYadav-123/1Fi_Assignment)

Backend API: [https://frontend-ten-ochre-72.vercel.app/api/products](https://frontend-ten-ochre-72.vercel.app/api/products)

## Project Overview

This project is a complete full-stack e-commerce-style product page that displays smartphones with multiple EMI plans backed by mutual funds. It dynamically retrieves product information, variants, and EMI plans from a MongoDB database through a Node.js and Express REST API and presents them using a React frontend.

The frontend and backend are both deployed on Vercel, while MongoDB Atlas is used as the database.

## Features

* Dynamic product listing and product details pages.
* Real-time data fetching from MongoDB.
* Variant selector for options such as Color and Storage.
* Multiple EMI plan options with interest and cashback details.
* Proceed to checkout flow for demonstration purposes.
* Responsive design for mobile and desktop.
* REST API for product and health-check operations.
* Frontend and backend deployed on Vercel.

## Tech Stack

**Frontend:** React, Vite, JavaScript, Tailwind CSS, React Router, Axios

**Backend:** Node.js, Express.js, JavaScript, Mongoose, dotenv, cors

**Database:** MongoDB Atlas

**Deployment:** Vercel

## Architecture

```text
React Frontend
      |
      | HTTP/REST API
      v
Vercel
      |
      v
Node.js + Express Backend
      |
      | Mongoose
      v
MongoDB Atlas
```

## Folder Structure

```text
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
└── package.json            # Root configuration
```

## MongoDB Schema

This application uses Mongoose to interact with MongoDB. The main entity is the `Product` schema.

### Product Schema

* `name` (String)
* `slug` (String, Unique)
* `brand` (String)
* `description` (String)
* `mrp` (Number)
* `price` (Number)
* `images` (Array of Strings)
* `variants` (Subdocument Array)

  * `name`
  * `type`
  * `value`
  * `available`
* `emiPlans` (Subdocument Array)

  * `monthlyAmount`
  * `tenure`
  * `interestRate`
  * `cashback`
  * `label`
  * `isPopular`
  * `enabled`

MongoDB was selected because its flexible document-based schema allows product variants and EMI plans to be embedded directly within a product document without requiring complex relational joins.

## API Endpoints

### `GET /api/health`

Checks whether the backend API is running successfully.

**Example Response:**

```json
{
  "success": true,
  "message": "API is running successfully"
}
```

### `GET /api/products`

Retrieves a list of all products in summary format.

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

Retrieves complete product information including variants and EMI plans.

**Example Request:**

```text
/api/products/iphone-17-pro
```

**Example Response:**

```json
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
```

**Error Response:**

```json
{
  "success": false,
  "message": "Product not found"
}
```

## Environment Variables

### Backend

Create `server/.env` locally:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/1fi-store?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

For the deployed Vercel backend, configure the environment variables in the Vercel project settings.

```env
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=https://your-frontend.vercel.app
```

`PORT` does not need to be manually configured for the Vercel deployment unless it is required by the application's local development setup.

### Frontend

Create `client/.env` locally:

```env
VITE_API_URL=http://localhost:5000
```

For the deployed Vercel frontend:

```env
VITE_API_URL=https://your-backend.vercel.app
```

The frontend uses `VITE_API_URL` to communicate with the deployed Express API.

## Local Setup & Installation

### 1. Database Setup

Create a MongoDB Atlas cluster and configure:

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Configure network access.
4. Obtain the MongoDB connection string.
5. Add the connection string to `server/.env`.

### 2. Install Dependencies

From the project root:

```bash
npm run install:all
```

### 3. Seed the Database

Run:

```bash
npm run seed
```

This inserts the sample products, variants, and EMI plans into MongoDB.

### 4. Run the Application

Start the frontend and backend locally:

```bash
npm run dev
```

Local URLs:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

## Deployment

Both the frontend and backend are deployed using Vercel.

### Frontend Deployment

The React/Vite frontend is deployed as a separate Vercel project.

Configuration:

```text
Framework Preset: Vite
Root Directory: client
```

Environment variable:

```text
VITE_API_URL=https://your-backend.vercel.app
```

The frontend communicates with the deployed backend through the `VITE_API_URL` environment variable.

### Backend Deployment

The Express backend is deployed as a separate Vercel project.

Configuration:

```text
Root Directory: server
```

The backend uses the Vercel configuration in `server/vercel.json` to route incoming requests to the Express application.

Environment variables:

```text
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=https://your-frontend.vercel.app
```

The deployed backend exposes the following endpoints:

```text
https://your-backend.vercel.app/api/health
https://your-backend.vercel.app/api/products
https://your-backend.vercel.app/api/products/:slug
```

## Deployment Architecture

```text
                    Internet
                       |
              +--------+--------+
              |                 |
              v                 v
       Vercel Frontend    Vercel Backend
       React + Vite       Node + Express
              |                 |
              | HTTP/REST API   |
              +--------+--------+
                       |
                       v
                 MongoDB Atlas
```

* Add automated testing for frontend and backend APIs.
* Add proper production logging and monitoring.
