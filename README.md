# 🛒 E-Commerce API

A complete, production-ready REST API for e-commerce platforms built with Node.js, Express, MongoDB, and Stripe.

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5.0+-brightgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 👤 User Management (Register, Login, Profile)
- 📦 Product Catalog with Search & Filters
- 🛒 Shopping Cart Management
- 💳 Stripe Payment Integration
- 📋 Order Processing & Tracking
- ⭐ Product Reviews & Ratings
- 👨‍💼 Admin Dashboard with Analytics
- 🔒 Security (Helmet, Rate Limiting, CORS)
- ✅ Input Validation & Error Handling

---

## 🚀 Quick Start

### Prerequisites

- Node.js v14 or higher
- MongoDB v5.0 or higher
- Stripe account (for payments)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd ecommerce-api

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your configurations

# 4. Start MongoDB
mongod

# 5. Seed database (optional)
npm run seed

# 6. Run the server
npm run dev
```

Server runs at: `http://localhost:5000`

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/ecommerce

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Rate Limiting (optional)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile 🔒
- `PUT /api/auth/profile` - Update profile 🔒

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product

### Shopping Cart
- `GET /api/cart` - Get user cart 🔒
- `POST /api/cart` - Add to cart 🔒
- `PUT /api/cart/:productId` - Update cart item 🔒
- `DELETE /api/cart/:productId` - Remove from cart 🔒
- `DELETE /api/cart` - Clear cart 🔒

### Orders
- `POST /api/orders` - Create order 🔒
- `GET /api/orders` - Get user orders 🔒
- `GET /api/orders/:id` - Get order by ID 🔒
- `PUT /api/orders/:id/cancel` - Cancel order 🔒

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews/product/:productId` - Create review 🔒
- `PUT /api/reviews/:id` - Update review 🔒
- `DELETE /api/reviews/:id` - Delete review 🔒

### Admin
- `GET /api/admin/dashboard` - Dashboard stats 👨‍💼
- `GET /api/admin/users` - Get all users 👨‍💼
- `GET /api/admin/orders` - Get all orders 👨‍💼
- `PUT /api/admin/orders/:id` - Update order status 👨‍💼
- `POST /api/admin/products` - Create product 👨‍💼
- `PUT /api/admin/products/:id` - Update product 👨‍💼
- `DELETE /api/admin/products/:id` - Delete product 👨‍💼

🔒 = Authentication Required | 👨‍💼 = Admin Only

**Full API documentation available in [DOCUMENTATION.md](DOCUMENTATION.md)**

---

## 🧪 Testing

### Using Postman

1. Import the API collection
2. Register a user: `POST /api/auth/register`
3. Login and copy the token: `POST /api/auth/login`
4. Set Authorization header: `Bearer <token>`
5. Test protected endpoints

### Test Credentials (after seeding)

```
Admin Account:
Email: admin@example.com
Password: admin123

User Account:
Email: john@example.com
Password: password123
```

### Stripe Test Cards

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
CVV: Any 3 digits
Expiry: Any future date
```

---

## 📁 Project Structure

```
ecommerce-api/
├── config/           # Configuration files
├── controllers/      # Business logic
├── middleware/       # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
├── .env             # Environment variables
├── server.js        # Entry point
└── package.json     # Dependencies
```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Payment:** Stripe
- **Security:** Helmet, bcryptjs, CORS, express-rate-limit
- **Validation:** Joi

---

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Rate limiting to prevent abuse
- Helmet for security headers
- CORS configuration
- Input validation and sanitization

---

## 📊 Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

---

## 🚀 Deployment

### Quick Deploy to Render

1. Push code to GitHub
2. Create account on [Render](https://render.com)
3. Create new Web Service
4. Connect your repository
5. Add environment variables
6. Deploy!

### Deploy to Heroku

```bash
heroku create your-app-name
heroku addons:create mongolab
heroku config:set JWT_SECRET=your_secret
heroku config:set STRIPE_SECRET_KEY=your_key
git push heroku main
```

**Detailed deployment guide in [DOCUMENTATION.md](DOCUMENTATION.md)**

---

## 📖 Documentation

- **[Complete API Documentation](DOCUMENTATION.md)** - Detailed endpoint reference, examples, and guides
- **[Postman Collection](postman_collection.json)** - Import for easy testing

---

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

**Port Already in Use:**
```bash
# Use different port
PORT=5001 npm run dev
```

**Common Issues:** See [DOCUMENTATION.md](DOCUMENTATION.md) for detailed troubleshooting

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@ShivamNox](https://github.com/ShivamNox)
- Email: shivamnox@gmail.com

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Stripe](https://stripe.com/) - Payment processing
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM

---

## 📞 Support

For detailed documentation, visit [DOCUMENTATION.md](DOCUMENTATION.md)

For issues and questions, please open an issue on GitHub.

---

**⭐ If you find this project helpful, please give it a star!**
