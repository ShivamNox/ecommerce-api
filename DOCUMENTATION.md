# 🛒 E-Commerce API - Complete Documentation

**Version:** 2.0.0  
**Last Updated:** October 2025  
**Base URL:** `http://localhost:5000/api`

---

## 📑 Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Architecture Overview](#architecture-overview)
4. [Installation Guide](#installation-guide)
5. [Configuration](#configuration)
6. [Database Schema](#database-schema)
7. [API Reference](#api-reference)
8. [Authentication & Authorization](#authentication--authorization)
9. [Error Handling](#error-handling)
10. [Testing Guide](#testing-guide)
11. [Deployment](#deployment)
12. [Best Practices](#best-practices)
13. [Troubleshooting](#troubleshooting)

---

## 🎯 Introduction

### Overview
This is a comprehensive, production-ready e-commerce REST API built with Node.js, Express, and MongoDB. It provides a complete backend solution for online shopping platforms with features including user authentication, product management, shopping cart, order processing, payment integration, and admin panel.

### Key Features
- ✅ JWT-based authentication & authorization
- ✅ Role-based access control (User/Admin)
- ✅ Product catalog with advanced filtering
- ✅ Shopping cart management
- ✅ Stripe payment integration
- ✅ Order processing & tracking
- ✅ Product reviews & ratings
- ✅ Real-time inventory management
- ✅ Admin dashboard with analytics
- ✅ Security best practices (Helmet, Rate limiting, CORS)
- ✅ Input validation & error handling

### Technology Stack
- **Runtime:** Node.js v14+
- **Framework:** Express.js v4.18
- **Database:** MongoDB v5.0+
- **ODM:** Mongoose v7.5
- **Authentication:** JWT (jsonwebtoken)
- **Payment:** Stripe v14
- **Security:** Helmet, bcryptjs, express-rate-limit
- **Validation:** Joi v17

---

## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn
- Stripe account (for payments)
- Postman or similar API testing tool

### Quick Start (5 Minutes)

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd ecommerce-api

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Edit .env with your configurations

# 4. Start MongoDB
mongod

# 5. Seed database (optional)
npm run seed

# 6. Start the server
npm run dev
```

Server will be running at `http://localhost:5000`

---

## 🏗️ Architecture Overview

### Project Structure

```
ecommerce-api/
│
├── config/                    # Configuration files
│   ├── db.js                 # MongoDB connection
│   └── stripe.js             # Stripe configuration
│
├── controllers/              # Business logic
│   ├── authController.js    # Authentication logic
│   ├── productController.js # Product operations
│   ├── cartController.js    # Cart management
│   ├── orderController.js   # Order processing
│   ├── reviewController.js  # Review management
│   └── adminController.js   # Admin operations
│
├── middleware/              # Custom middleware
│   ├── authMiddleware.js   # JWT verification
│   ├── adminMiddleware.js  # Admin authorization
│   ├── errorMiddleware.js  # Error handling
│   └── validationMiddleware.js # Input validation
│
├── models/                  # Database models
│   ├── User.js             # User schema
│   ├── Product.js          # Product schema
│   ├── Cart.js             # Cart schema
│   ├── Order.js            # Order schema
│   └── Review.js           # Review schema
│
├── routes/                  # API routes
│   ├── authRoutes.js       # /api/auth
│   ├── productRoutes.js    # /api/products
│   ├── cartRoutes.js       # /api/cart
│   ├── orderRoutes.js      # /api/orders
│   ├── reviewRoutes.js     # /api/reviews
│   └── adminRoutes.js      # /api/admin
│
├── utils/                   # Utility functions
│   ├── validators.js       # Custom validators
│   ├── helpers.js          # Helper functions
│   └── seed.js             # Database seeder
│
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies
└── server.js               # Application entry point
```

### Application Flow

```
Client Request
    ↓
Express Server (server.js)
    ↓
Security Middleware (Helmet, CORS, Rate Limit)
    ↓
Body Parser
    ↓
Route Handler (routes/)
    ↓
Authentication Middleware (if protected)
    ↓
Validation Middleware
    ↓
Controller (business logic)
    ↓
Database Operations (models/)
    ↓
Response Formation
    ↓
Client Response
```

---

## 💻 Installation Guide

### Step 1: System Requirements
```bash
# Check Node.js version
node --version  # Should be v14+

# Check npm version
npm --version

# Check MongoDB
mongo --version  # Should be v5.0+
```

### Step 2: Project Setup
```bash
# Create project directory
mkdir ecommerce-api
cd ecommerce-api

# Initialize npm project
npm init -y

# Install dependencies
npm install express mongoose dotenv jsonwebtoken bcryptjs stripe cors helmet morgan express-rate-limit joi

# Install dev dependencies
npm install --save-dev nodemon
```

### Step 3: File Creation

Create all files as per the project structure provided in the artifact.

### Step 4: Environment Configuration

Create `.env` file:
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/ecommerce

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRE=7d

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS (optional)
CLIENT_URL=http://localhost:3000
```

### Step 5: MongoDB Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or on macOS
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update MONGO_URI in .env

**Option C: Docker**
```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest
```

### Step 6: Stripe Setup

1. Create Stripe account at https://stripe.com
2. Get API keys from Dashboard
3. Add to .env file
4. For testing, use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

---

## ⚙️ Configuration

### Environment Variables Explained

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` / `production` | Yes |
| `PORT` | Server port | `5000` | Yes |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/ecommerce` | Yes |
| `JWT_SECRET` | Secret key for JWT | Min 32 characters | Yes |
| `JWT_EXPIRE` | Token expiration | `7d`, `24h`, `30m` | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_xxx` | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_xxx` | Optional |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | `900000` (15 min) | Optional |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` | Optional |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` | Optional |

### Security Configuration

**Helmet Configuration (server.js):**
```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  }
}));
```

**CORS Configuration:**
```javascript
const corsOptions = {
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));
```

**Rate Limiting:**
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
```

---

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String,           // Required, max 50 chars
  email: String,          // Required, unique, validated
  password: String,       // Required, hashed, min 6 chars
  role: String,           // 'user' or 'admin', default: 'user'
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phone: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

**Indexes:**
- `email` (unique)

**Methods:**
- `matchPassword(enteredPassword)` - Compares passwords

### Product Model

```javascript
{
  name: String,           // Required, max 100 chars
  description: String,    // Required, max 2000 chars
  price: Number,          // Required, min 0
  category: String,       // Required, enum values
  stock: Number,          // Required, min 0, default 0
  images: [String],       // Array of image URLs
  rating: Number,         // 0-5, default 0
  numReviews: Number,     // Default 0
  featured: Boolean,      // Default false
  brand: String,
  sku: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Categories:**
- Electronics
- Clothing
- Books
- Home
- Sports
- Other

**Indexes:**
- Text index on `name` and `description` for search

**Virtuals:**
- `reviews` - Populated reviews for the product

### Cart Model

```javascript
{
  user: ObjectId,         // Required, unique, ref: 'User'
  items: [
    {
      product: ObjectId,  // Required, ref: 'Product'
      quantity: Number    // Required, min 1, default 1
    }
  ],
  totalAmount: Number,    // Default 0, calculated
  createdAt: Date,
  updatedAt: Date
}
```

**Methods:**
- `calculateTotal()` - Calculates and updates total amount

### Order Model

```javascript
{
  user: ObjectId,         // Required, ref: 'User'
  items: [
    {
      product: ObjectId,  // Required, ref: 'Product'
      name: String,       // Product snapshot
      quantity: Number,   // Required, min 1
      price: Number       // Required, snapshot
    }
  ],
  shippingAddress: {
    street: String,       // Required
    city: String,         // Required
    state: String,        // Required
    zipCode: String,      // Required
    country: String       // Required
  },
  paymentMethod: String,  // Required, default 'stripe'
  paymentResult: {
    id: String,           // Payment intent ID
    status: String,       // Payment status
    update_time: String,
    email_address: String
  },
  itemsPrice: Number,     // Required, default 0
  taxPrice: Number,       // Required, default 0
  shippingPrice: Number,  // Required, default 0
  totalPrice: Number,     // Required, default 0
  isPaid: Boolean,        // Default false
  paidAt: Date,
  isDelivered: Boolean,   // Default false
  deliveredAt: Date,
  status: String,         // Enum, default 'Pending'
  createdAt: Date,
  updatedAt: Date
}
```

**Status Values:**
- Pending
- Processing
- Shipped
- Delivered
- Cancelled

### Review Model

```javascript
{
  product: ObjectId,      // Required, ref: 'Product'
  user: ObjectId,         // Required, ref: 'User'
  rating: Number,         // Required, 1-5
  comment: String,        // Required, max 500 chars
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- Compound unique index on `product` and `user`

**Static Methods:**
- `calculateAverageRating(productId)` - Updates product rating

---

## 📚 API Reference

### Response Format

All API responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "count": 10,      // For list endpoints
  "page": 1,        // For paginated endpoints
  "pages": 5        // For paginated endpoints
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🔐 Authentication & Authorization

### 1. User Registration

**Endpoint:** `POST /api/auth/register`

**Description:** Register a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `name`: Required, 2-50 characters
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f123456",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Validation error or user already exists
- `500` - Server error

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

### 2. User Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f123456",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Server error

**Token Usage:**
Store the token and include it in subsequent requests:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 3. Get User Profile

**Endpoint:** `GET /api/auth/profile`

**Authentication:** Required (Bearer Token)

**Description:** Get logged-in user's profile information

**Headers:**
```
Authorization: Bearer <your_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f123456",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "phone": "+1234567890",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-20T14:22:00.000Z"
  }
}
```

**Error Responses:**
- `401` - No token provided or invalid token
- `404` - User not found
- `500` - Server error

---

### 4. Update User Profile

**Endpoint:** `PUT /api/auth/profile`

**Authentication:** Required

**Description:** Update user profile information

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "johnupdated@example.com",
  "phone": "+1234567890",
  "address": {
    "street": "456 Oak Avenue",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90001",
    "country": "USA"
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f123456",
    "name": "John Updated",
    "email": "johnupdated@example.com",
    "phone": "+1234567890",
    "address": {
      "street": "456 Oak Avenue",
      "city": "Los Angeles",
      "state": "CA",
      "zipCode": "90001",
      "country": "USA"
    }
  }
}
```

---

## 🛍️ Product Management

### 5. Get All Products

**Endpoint:** `GET /api/products`

**Authentication:** Not Required

**Description:** Get paginated list of products with filtering and search

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | Number | Page number (default: 1) | `?page=2` |
| `limit` | Number | Items per page (default: 10) | `?limit=20` |
| `category` | String | Filter by category | `?category=Electronics` |
| `search` | String | Search in name/description | `?search=wireless` |
| `minPrice` | Number | Minimum price filter | `?minPrice=50` |
| `maxPrice` | Number | Maximum price filter | `?maxPrice=500` |

**Example Request:**
```
GET /api/products?page=1&limit=10&category=Electronics&minPrice=100&maxPrice=500
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "614c1b5e9f1b2c001f654321",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones...",
      "price": 199.99,
      "category": "Electronics",
      "stock": 50,
      "images": ["https://example.com/image1.jpg"],
      "rating": 4.5,
      "numReviews": 23,
      "featured": true,
      "brand": "AudioTech",
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-20T10:30:00.000Z"
    }
    // ... more products
  ]
}
```

**Filter Combinations:**
```bash
# Electronics under $300
GET /api/products?category=Electronics&maxPrice=300

# Search for "shoes" in Sports category
GET /api/products?category=Sports&search=shoes

# Page 2 with 20 items
GET /api/products?page=2&limit=20
```

---

### 6. Get Single Product

**Endpoint:** `GET /api/products/:id`

**Authentication:** Not Required

**Description:** Get detailed information about a specific product including reviews

**URL Parameters:**
- `id` - Product ID (MongoDB ObjectId)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f654321",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with active noise cancellation...",
    "price": 199.99,
    "category": "Electronics",
    "stock": 50,
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ],
    "rating": 4.5,
    "numReviews": 23,
    "featured": true,
    "brand": "AudioTech",
    "sku": "AUD-WH-001",
    "reviews": [
      {
        "_id": "614c1b5e9f1b2c001f789012",
        "user": {
          "_id": "614c1b5e9f1b2c001f123456",
          "name": "John Doe"
        },
        "rating": 5,
        "comment": "Excellent sound quality!",
        "createdAt": "2024-01-15T14:30:00.000Z"
      }
    ],
    "createdAt": "2024-01-10T08:00:00.000Z",
    "updatedAt": "2024-01-20T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `404` - Product not found
- `500` - Server error

---

### 7. Get Featured Products

**Endpoint:** `GET /api/products/featured`

**Authentication:** Not Required

**Description:** Get up to 6 featured products for homepage display

**Success Response (200):**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "614c1b5e9f1b2c001f654321",
      "name": "Wireless Headphones",
      "price": 199.99,
      "images": ["https://example.com/image1.jpg"],
      "rating": 4.5,
      "category": "Electronics"
    }
    // ... up to 6 products
  ]
}
```

---

## 🛒 Shopping Cart

### 8. Get User Cart

**Endpoint:** `GET /api/cart`

**Authentication:** Required

**Description:** Get current user's shopping cart with all items

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f999999",
    "user": "614c1b5e9f1b2c001f123456",
    "items": [
      {
        "_id": "614c1b5e9f1b2c001f888888",
        "product": {
          "_id": "614c1b5e9f1b2c001f654321",
          "name": "Wireless Headphones",
          "price": 199.99,
          "images": ["https://example.com/image1.jpg"],
          "stock": 50
        },
        "quantity": 2
      },
      {
        "_id": "614c1b5e9f1b2c001f777777",
        "product": {
          "_id": "614c1b5e9f1b2c001f654322",
          "name": "Smart Watch",
          "price": 299.99,
          "images": ["https://example.com/watch.jpg"],
          "stock": 30
        },
        "quantity": 1
      }
    ],
    "totalAmount": 699.97,
    "createdAt": "2024-01-20T10:00:00.000Z",
    "updatedAt": "2024-01-20T14:30:00.000Z"
  }
}
```

**Note:** If user has no cart, an empty cart is automatically created.

---

### 9. Add to Cart

**Endpoint:** `POST /api/cart`

**Authentication:** Required

**Description:** Add a product to the shopping cart or increase quantity if already exists

**Request Body:**
```json
{
  "productId": "614c1b5e9f1b2c001f654321",
  "quantity": 2
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f999999",
    "user": "614c1b5e9f1b2c001f123456",
    "items": [
      {
        "product": {
          "_id": "614c1b5e9f1b2c001f654321",
          "name": "Wireless Headphones",
          "price": 199.99
        },
        "quantity": 2
      }
    ],
    "totalAmount": 399.98
  }
}
```

**Error Responses:**
- `400` - Insufficient stock
- `404` - Product not found
- `401` - Unauthorized

**Business Logic:**
- If product already in cart → quantity is increased
- If product not in cart → new item is added
- Stock availability is checked before adding
- Total amount is recalculated automatically

---

### 10. Update Cart Item

**Endpoint:** `PUT /api/cart/:productId`

**Authentication:** Required

**Description:** Update quantity of a specific item in cart

**URL Parameters:**
- `productId` - Product ID to update

**Request Body:**
```json
{
  "quantity": 5
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f999999",
    "items": [
      {
        "product": {
          "_id": "614c1b5e9f1b2c001f654321",
          "name": "Wireless Headphones",
          "price": 199.99
        },
        "quantity": 5
      }
    ],
    "totalAmount": 999.95
  }
}
```

**Special Cases:**
- If `quantity <= 0` → Item is removed from cart
- If item not in cart → 404 error

**Error Responses:**
- `404` - Cart or item not found
- `401` - Unauthorized

---

### 11. Remove from Cart

**Endpoint:** `DELETE /api/cart/:productId`

**Authentication:** Required

**Description:** Remove a specific product from the cart

**URL Parameters:**
- `productId` - Product ID to remove

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f999999",
    "items": [
      // remaining items
    ],
    "totalAmount": 299.99
  }
}
```

---

### 12. Clear Cart

**Endpoint:** `DELETE /api/cart`

**Authentication:** Required

**Description:** Remove all items from the cart

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f999999",
    "user": "614c1b5e9f1b2c001f123456",
    "items": [],
    "totalAmount": 0
  }
}
```

---

## 📦 Order Management

### 13. Create Order

**Endpoint:** `POST /api/orders`

**Authentication:** Required

**Description:** Create a new order from cart items with payment processing

**Request Body:**
```json
{
  "shippingAddress": {
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethodId": "pm_card_visa"
}
```

**Payment Method IDs (Stripe Test Cards):**
- `pm_card_visa` - Successful payment
- `pm_card_visa_debit` - Debit card
- Test card number: `4242 4242 4242 4242`

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f111111",
    "user": "614c1b5e9f1b2c001f123456",
    "items": [
      {
        "product": "614c1b5e9f1b2c001f654321",
        "name": "Wireless Headphones",
        "quantity": 2,
        "price": 199.99
      }
    ],
    "shippingAddress": {
      "street": "123 Main Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "paymentMethod": "stripe",
    "paymentResult": {
      "id": "pi_1234567890",
      "status": "succeeded",
      "update_time": "2024-01-20T15:30:00.000Z"
    },
    "itemsPrice": 399.98,
    "taxPrice": 39.99,
    "shippingPrice": 0,
    "totalPrice": 439.97,
    "isPaid": true,
    "paidAt": "2024-01-20T15:30:00.000Z",
    "status": "Processing",
    "createdAt": "2024-01-20T15:30:00.000Z"
  }
}
```

**Order Process:**
1. Validates cart has items
2. Checks product stock availability
3. Calculates prices (items + tax + shipping)
4. Processes Stripe payment
5. Creates order in database
6. Updates product stock (decreases)
7. Clears user's cart
8. Returns order confirmation

**Pricing Logic:**
- `itemsPrice` = Sum of (price × quantity) for all items
- `taxPrice` = itemsPrice × 0.10 (10% tax)
- `shippingPrice` = $10 (free if itemsPrice > $100)
- `totalPrice` = itemsPrice + taxPrice + shippingPrice

**Error Responses:**
- `400` - Cart empty, insufficient stock, or payment failed
- `401` - Unauthorized
- `500` - Server error

---

### 14. Get My Orders

**Endpoint:** `GET /api/orders`

**Authentication:** Required

**Description:** Get all orders for the logged-in user

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "614c1b5e9f1b2c001f111111",
      "items": [
        {
          "product": {
            "_id": "614c1b5e9f1b2c001f654321",
            "name": "Wireless Headphones",
            "images": ["https://example.com/image1.jpg"]
          },
          "quantity": 2,
          "price": 199.99
        }
      ],
      "totalPrice": 439.97,
      "status": "Delivered",
      "isPaid": true,
      "paidAt": "2024-01-20T15:30:00.000Z",
      "isDelivered": true,
      "deliveredAt": "2024-01-25T10:00:00.000Z",
      "createdAt": "2024-01-20T15:30:00.000Z"
    },
    {
      "_id": "614c1b5e9f1b2c001f222222",
      "items": [
        {
          "product": {
            "_id": "614c1b5e9f1b2c001f654322",
            "name": "Smart Watch",
            "images": ["https://example.com/watch.jpg"]
          },
          "quantity": 1,
          "price": 299.99
        }
      ],
      "totalPrice": 339.99,
      "status": "Processing",
      "isPaid": true,
      "paidAt": "2024-01-22T09:15:00.000Z",
      "isDelivered": false,
      "createdAt": "2024-01-22T09:15:00.000Z"
    }
  ]
}
```

**Order Sorting:** Orders are returned in reverse chronological order (newest first)

---

### 15. Get Order by ID

**Endpoint:** `GET /api/orders/:id`

**Authentication:** Required

**Description:** Get detailed information about a specific order

**URL Parameters:**
- `id` - Order ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f111111",
    "user": {
      "_id": "614c1b5e9f1b2c001f123456",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "items": [
      {
        "product": {
          "_id": "614c1b5e9f1b2c001f654321",
          "name": "Wireless Headphones",
          "images": ["https://example.com/image1.jpg"]
        },
        "name": "Wireless Headphones",
        "quantity": 2,
        "price": 199.99
      }
    ],
    "shippingAddress": {
      "street": "123 Main Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "paymentMethod": "stripe",
    "paymentResult": {
      "id": "pi_1234567890",
      "status": "succeeded",
      "update_time": "2024-01-20T15:30:00.000Z"
    },
    "itemsPrice": 399.98,
    "taxPrice": 39.99,
    "shippingPrice": 0,
    "totalPrice": 439.97,
    "isPaid": true,
    "paidAt": "2024-01-20T15:30:00.000Z",
    "isDelivered": true,
    "deliveredAt": "2024-01-25T10:00:00.000Z",
    "status": "Delivered",
    "createdAt": "2024-01-20T15:30:00.000Z",
    "updatedAt": "2024-01-25T10:00:00.000Z"
  }
}
```

**Authorization:**
- Users can only view their own orders
- Admins can view any order

**Error Responses:**
- `403` - Not authorized to view this order
- `404` - Order not found
- `401` - Unauthorized

---

### 16. Cancel Order

**Endpoint:** `PUT /api/orders/:id/cancel`

**Authentication:** Required

**Description:** Cancel a pending order (cannot cancel shipped/delivered orders)

**URL Parameters:**
- `id` - Order ID to cancel

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f111111",
    "status": "Cancelled",
    "items": [
      {
        "product": "614c1b5e9f1b2c001f654321",
        "quantity": 2,
        "price": 199.99
      }
    ],
    "totalPrice": 439.97
  }
}
```

**Business Logic:**
- Only orders with status "Pending" or "Processing" can be cancelled
- Product stock is restored when order is cancelled
- Refund process should be handled separately (not automated)

**Error Responses:**
- `400` - Cannot cancel shipped or delivered orders
- `403` - Not authorized (not order owner)
- `404` - Order not found

---

## ⭐ Product Reviews

### 17. Create Review

**Endpoint:** `POST /api/reviews/product/:productId`

**Authentication:** Required

**Description:** Create a review for a purchased product

**URL Parameters:**
- `productId` - Product ID to review

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent product! Highly recommended."
}
```

**Validation:**
- `rating`: Required, number between 1-5
- `comment`: Required, max 500 characters

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f333333",
    "product": "614c1b5e9f1b2c001f654321",
    "user": {
      "_id": "614c1b5e9f1b2c001f123456",
      "name": "John Doe"
    },
    "rating": 5,
    "comment": "Excellent product! Highly recommended.",
    "createdAt": "2024-01-26T14:30:00.000Z",
    "updatedAt": "2024-01-26T14:30:00.000Z"
  }
}
```

**Review Requirements:**
- User must have purchased the product (completed paid order)
- User can only review each product once
- Product rating is automatically updated after review submission

**Error Responses:**
- `400` - User already reviewed this product
- `403` - User hasn't purchased this product
- `404` - Product not found
- `401` - Unauthorized

---

### 18. Get Product Reviews

**Endpoint:** `GET /api/reviews/product/:productId`

**Authentication:** Not Required

**Description:** Get all reviews for a specific product

**URL Parameters:**
- `productId` - Product ID

**Success Response (200):**
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "614c1b5e9f1b2c001f333333",
      "user": {
        "_id": "614c1b5e9f1b2c001f123456",
        "name": "John Doe"
      },
      "rating": 5,
      "comment": "Excellent product! Highly recommended.",
      "createdAt": "2024-01-26T14:30:00.000Z"
    },
    {
      "_id": "614c1b5e9f1b2c001f444444",
      "user": {
        "_id": "614c1b5e9f1b2c001f123457",
        "name": "Jane Smith"
      },
      "rating": 4,
      "comment": "Good quality, fast delivery.",
      "createdAt": "2024-01-25T10:15:00.000Z"
    }
  ]
}
```

**Sorting:** Reviews are sorted by creation date (newest first)

---

### 19. Update Review

**Endpoint:** `PUT /api/reviews/:id`

**Authentication:** Required

**Description:** Update user's own review

**URL Parameters:**
- `id` - Review ID

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated: Still good but battery life could be better."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f333333",
    "user": {
      "_id": "614c1b5e9f1b2c001f123456",
      "name": "John Doe"
    },
    "rating": 4,
    "comment": "Updated: Still good but battery life could be better.",
    "createdAt": "2024-01-26T14:30:00.000Z",
    "updatedAt": "2024-01-27T09:00:00.000Z"
  }
}
```

**Authorization:** Users can only update their own reviews

**Error Responses:**
- `403` - Not authorized (not review owner)
- `404` - Review not found

---

### 20. Delete Review

**Endpoint:** `DELETE /api/reviews/:id`

**Authentication:** Required

**Description:** Delete a review (own review or admin)

**URL Parameters:**
- `id` - Review ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Review deleted"
}
```

**Authorization:**
- Users can delete their own reviews
- Admins can delete any review

**Business Logic:**
- Product rating is automatically recalculated after deletion

---

## 👨‍💼 Admin Panel

### 21. Create Product (Admin)

**Endpoint:** `POST /api/admin/products`

**Authentication:** Required (Admin Only)

**Description:** Create a new product in the catalog

**Request Body:**
```json
{
  "name": "New Laptop",
  "description": "High-performance laptop with 16GB RAM and 512GB SSD",
  "price": 1299.99,
  "category": "Electronics",
  "stock": 25,
  "brand": "TechBrand",
  "images": [
    "https://example.com/laptop1.jpg",
    "https://example.com/laptop2.jpg"
  ],
  "featured": true
}
```

**Validation:**
- `name`: Required, 3-100 characters
- `description`: Required, 10-2000 characters
- `price`: Required, minimum 0
- `category`: Required, must be valid enum value
- `stock`: Required, minimum 0

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f555555",
    "name": "New Laptop",
    "description": "High-performance laptop with 16GB RAM and 512GB SSD",
    "price": 1299.99,
    "category": "Electronics",
    "stock": 25,
    "brand": "TechBrand",
    "images": [
      "https://example.com/laptop1.jpg",
      "https://example.com/laptop2.jpg"
    ],
    "featured": true,
    "rating": 0,
    "numReviews": 0,
    "createdAt": "2024-01-28T10:00:00.000Z",
    "updatedAt": "2024-01-28T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `403` - Access denied (not admin)
- `401` - Unauthorized

---

### 22. Update Product (Admin)

**Endpoint:** `PUT /api/admin/products/:id`

**Authentication:** Required (Admin Only)

**Description:** Update existing product information

**URL Parameters:**
- `id` - Product ID

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Laptop",
  "price": 1199.99,
  "stock": 30,
  "featured": false
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f555555",
    "name": "Updated Laptop",
    "price": 1199.99,
    "stock": 30,
    "featured": false,
    // ... other fields
  }
}
```

---

### 23. Delete Product (Admin)

**Endpoint:** `DELETE /api/admin/products/:id`

**Authentication:** Required (Admin Only)

**Description:** Delete a product from the catalog

**URL Parameters:**
- `id` - Product ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product deleted"
}
```

**Warning:** Deleting a product doesn't affect existing orders containing that product

---

### 24. Get All Orders (Admin)

**Endpoint:** `GET /api/admin/orders`

**Authentication:** Required (Admin Only)

**Description:** Get all orders in the system

**Success Response (200):**
```json
{
  "success": true,
  "count": 150,
  "data": [
    {
      "_id": "614c1b5e9f1b2c001f111111",
      "user": {
        "_id": "614c1b5e9f1b2c001f123456",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "items": [
        {
          "product": {
            "_id": "614c1b5e9f1b2c001f654321",
            "name": "Wireless Headphones"
          },
          "quantity": 2,
          "price": 199.99
        }
      ],
      "totalPrice": 439.97,
      "status": "Processing",
      "isPaid": true,
      "createdAt": "2024-01-20T15:30:00.000Z"
    }
    // ... more orders
  ]
}
```

---

### 25. Update Order Status (Admin)

**Endpoint:** `PUT /api/admin/orders/:id`

**Authentication:** Required (Admin Only)

**Description:** Update order status (for order fulfillment workflow)

**URL Parameters:**
- `id` - Order ID

**Request Body:**
```json
{
  "status": "Shipped"
}
```

**Valid Status Values:**
- `Pending`
- `Processing`
- `Shipped`
- `Delivered`
- `Cancelled`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "614c1b5e9f1b2c001f111111",
    "status": "Shipped",
    "isDelivered": false,
    // ... other fields
  }
}
```

**Special Behavior:**
- When status set to "Delivered":
  - `isDelivered` is automatically set to `true`
  - `deliveredAt` is set to current timestamp

---

### 26. Get All Users (Admin)

**Endpoint:** `GET /api/admin/users`

**Authentication:** Required (Admin Only)

**Description:** Get list of all registered users

**Success Response (200):**
```json
{
  "success": true,
  "count": 1250,
  "data": [
    {
      "_id": "614c1b5e9f1b2c001f123456",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "phone": "+1234567890",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
    // ... more users
  ]
}
```

**Note:** Password fields are excluded from response

---

### 27. Get Dashboard Stats (Admin)

**Endpoint:** `GET /api/admin/dashboard`

**Authentication:** Required (Admin Only)

**Description:** Get comprehensive dashboard statistics

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "totalProducts": 450,
    "totalOrders": 3842,
    "totalRevenue": 458750.50,
    "recentOrders": [
      {
        "_id": "614c1b5e9f1b2c001f111111",
        "user": {
          "name": "John Doe",
          "email": "john@example.com"
        },
        "totalPrice": 439.97,
        "status": "Processing",
        "createdAt": "2024-01-28T15:30:00.000Z"
      }
      // ... 4 more recent orders
    ],
    "lowStockProducts": [
      {
        "_id": "614c1b5e9f1b2c001f654321",
        "name": "Wireless Headphones",
        "stock": 3,
        "price": 199.99
      }
      // ... up to 10 low stock products
    ]
  }
}
```

**Dashboard Metrics:**
- `totalUsers` - Count of all registered users
- `totalProducts` - Count of all products
- `totalOrders` - Count of all orders
- `totalRevenue` - Sum of all paid orders
- `recentOrders` - Last 5 orders
- `lowStockProducts` - Products with stock < 10

---

## 🔒 Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "message": "Error description here"
}
```

### HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Validation errors, invalid input |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server-side errors |

### Common Error Scenarios

**Authentication Errors:**
```json
// Missing token
{
  "success": false,
  "message": "Not authorized to access this route"
}

// Invalid token
{
  "success": false,
  "message": "Not authorized, token failed"
}

// Admin access required
{
  "success": false,
  "message": "Access denied. Admin only."
}
```

**Validation Errors:**
```json
{
  "success": false,
  "message": "\"email\" must be a valid email"
}

{
  "success": false,
  "message": "\"password\" length must be at least 6 characters long"
}
```

**Resource Errors:**
```json
{
  "success": false,
  "message": "Product not found"
}

{
  "success": false,
  "message": "Order not found"
}
```

**Business Logic Errors:**
```json
{
  "success": false,
  "message": "Insufficient stock"
}

{
  "success": false,
  "message": "Cart is empty"
}

{
  "success": false,
  "message": "Cannot cancel shipped or delivered orders"
}
```

---

## 🧪 Testing Guide

### Using Postman

#### 1. Setup Environment

Create a Postman environment with these variables:
```
BASE_URL: http://localhost:5000/api
TOKEN: (will be set after login)
```

#### 2. Testing Authentication Flow

**Step 1: Register User**
```
POST {{BASE_URL}}/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

**Step 2: Login**
```
POST {{BASE_URL}}/auth/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}

// Copy token from response
// Set TOKEN variable in Postman
```

**Step 3: Access Protected Route**
```
GET {{BASE_URL}}/auth/profile
Headers:
  Authorization: Bearer {{TOKEN}}
```

#### 3. Testing Product Flow

```
// Get all products
GET {{BASE_URL}}/products?page=1&limit=10

// Search products
GET {{BASE_URL}}/products?search=wireless&category=Electronics

// Get single product
GET {{BASE_URL}}/products/:productId

// Get featured products
GET {{BASE_URL}}/products/featured
```

#### 4. Testing Shopping Cart

```
// Add to cart
POST {{BASE_URL}}/cart
Headers: Authorization: Bearer {{TOKEN}}
Body:
{
  "productId": "614c1b5e9f1b2c001f654321",
  "quantity": 2
}

// Get cart
GET {{BASE_URL}}/cart
Headers: Authorization: Bearer {{TOKEN}}

// Update cart item
PUT {{BASE_URL}}/cart/:productId
Headers: Authorization: Bearer {{TOKEN}}
Body:
{
  "quantity": 3
}

// Remove from cart
DELETE {{BASE_URL}}/cart/:productId
Headers: Authorization: Bearer {{TOKEN}}
```

#### 5. Testing Order Creation

```
POST {{BASE_URL}}/orders
Headers: Authorization: Bearer {{TOKEN}}
Body:
{
  "shippingAddress": {
    "street": "123 Test St",
    "city": "Test City",
    "state": "TC",
    "zipCode": "12345",
    "country": "USA"
  },
  "paymentMethodId": "pm_card_visa"
}
```

### Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get Profile:**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Automated Testing (Optional)

Create `tests/` folder with Jest or Mocha tests:

```javascript
// tests/auth.test.js
const request = require('supertest');
const app = require('../server');

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
  });
});
```

---

## 🚀 Deployment

### Option 1: Deploy to Render

**Step 1: Prepare Repository**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

**Step 2: Create Render Account**
- Go to https://render.com
- Sign up / Login
- Click "New +" → "Web Service"

**Step 3: Configure Service**
- Connect GitHub repository
- Name: `ecommerce-api`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Instance Type: Free or Starter

**Step 4: Add Environment Variables**
```
NODE_ENV=production
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-secret-key>
STRIPE_SECRET_KEY=<your-stripe-key>
```

**Step 5: Deploy**
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Your API will be live at `https://your-app.onrender.com`

---

### Option 2: Deploy to Heroku

```bash
# Install Heroku CLI
brew install heroku/brew/heroku

# Login
heroku login

# Create app
heroku create ecommerce-api-yourname

# Add MongoDB
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key
heroku config:set STRIPE_SECRET_KEY=your_stripe_key

# Deploy
git push heroku main

# Open app
heroku open
```

---

### Option 3: Deploy to Digital Ocean

1. Create droplet (Ubuntu 22.04)
2. SSH into server
3. Install Node.js and MongoDB
4. Clone repository
5. Install PM2 process manager
6. Setup Nginx reverse proxy
7. Configure SSL with Let's Encrypt

---

### MongoDB Atlas Setup (Cloud Database)

**Step 1: Create Account**
- Go to https://www.mongodb.com/cloud/atlas
- Sign up for free tier

**Step 2: Create Cluster**
- Choose free M0 tier
- Select region closest to your server
- Create cluster

**Step 3: Setup Access**
- Database Access → Add user
- Network Access → Add IP (0.0.0.0/0 for all)

**Step 4: Get Connection String**
- Click "Connect"
- Choose "Connect your application"
- Copy connection string
- Replace `<password>` with your password

**Example:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

---

## 📋 Best Practices

### Security Best Practices

1. **Environment Variables**
   - Never commit `.env` file
   - Use strong JWT secrets (32+ characters)
   - Rotate secrets periodically

2. **Password Security**
   - Minimum 6 characters (increase in production)
   - Hash with bcrypt (12 rounds)
   - Never log passwords

3. **API Security**
   - Use HTTPS in production
   - Implement rate limiting
   - Validate all inputs
   - Sanitize user data

4. **Token Management**
   - Set reasonable expiration (7 days)
   - Implement token refresh
   - Store securely on client (httpOnly cookies)

### Performance Optimization

1. **Database**
   - Add indexes on frequently queried fields
   - Use pagination for large datasets
   - Implement caching (Redis)

2. **API**
   - Enable gzip compression
   - Implement query result caching
   - Use connection pooling

3. **Code**
   - Use async/await properly
   - Avoid N+1 queries
   - Implement lazy loading

### Monitoring & Logging

**Production Logging:**
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

**Health Checks:**
```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

---

## 🔧 Troubleshooting

### Common Issues

**1. MongoDB Connection Failed**
```
Error: MongoDB connection failed
```
**Solutions:**
- Check if MongoDB is running: `sudo systemctl status mongod`
- Verify MONGO_URI in `.env`
- Check network connectivity
- Verify MongoDB Atlas IP whitelist

**2. JWT Token Invalid**
```
Error: Not authorized, token failed
```
**Solutions:**
- Check JWT_SECRET matches
- Verify token format: `Bearer <token>`
- Check token expiration
- Re-login to get new token

**3. Stripe Payment Failed**
```
Error: Payment failed
```
**Solutions:**
- Verify Stripe secret key
- Use test cards in development
- Check Stripe dashboard for errors
- Verify payment amount > 0

**4. Port Already in Use**
```
Error: EADDRINUSE: address already in use :::5000
```
**Solutions:**
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

**5. Module Not Found**
```
Error: Cannot find module 'express'
```
**Solutions:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Support & Contact

### Documentation Resources
- Express.js: https://expressjs.com/
- Mongoose: https://mongoosejs.com/
- Stripe API: https://stripe.com/docs/api
- JWT: https://jwt.io/

### API Status
Check API health: `GET /health`

---

## 📝 Changelog

### Version 2.0.0 (Current)
- ✅ Complete authentication system
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ Product reviews
- ✅ Admin panel
- ✅ Payment integration
- ✅ Security enhancements

### Future Enhancements
- 📧 Email notifications
- 🔄 Password reset
- 📦 Order tracking with webhooks
- 🖼️ Image upload
- 🔍 Advanced search with Elasticsearch
- 💬 Real-time chat support
- 📊 Advanced analytics
- 🌍 Multi-currency support

---

## 📄 License

MIT License - Feel free to use for personal and commercial projects

---

**End of Documentation**

For questions or issues, please create an issue in the repository or contact the development team.
