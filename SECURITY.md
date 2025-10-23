# 🔒 Security Policy

## Overview

We take the security of our E-Commerce API seriously. This document outlines our security practices, known vulnerabilities, and how to report security issues.

---

## 🛡️ Supported Versions

| Version | Supported          | Security Updates |
| ------- | ------------------ | ---------------- |
| 2.0.x   | ✅ Yes             | Active           |
| 1.x.x   | ❌ No              | Deprecated       |

**Note:** Only the latest major version receives security updates.

---

## 🚨 Reporting a Vulnerability

### How to Report

If you discover a security vulnerability, please **DO NOT** create a public GitHub issue. Instead:

1. **Email us directly:** security@yourcompany.com
2. **Include the following information:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
   - Your contact information

### What to Expect

- **Acknowledgment:** Within 48 hours
- **Initial Assessment:** Within 5 business days
- **Status Updates:** Every 7 days until resolved
- **Resolution Timeline:** Critical issues within 30 days

### Disclosure Policy

- We request 90 days before public disclosure
- We will credit reporters (unless anonymity requested)
- Severe vulnerabilities may be disclosed earlier if actively exploited

---

## 🔐 Security Features

### Authentication & Authorization

#### JWT Token Security
```javascript
// Token Configuration
JWT_SECRET: Minimum 32 characters, randomly generated
JWT_EXPIRE: 7 days (configurable)
Algorithm: HS256
```

**Best Practices:**
- ✅ Tokens are signed and verified
- ✅ Tokens expire after set period
- ✅ Secret keys stored in environment variables
- ✅ Tokens required for protected routes
- ⚠️ **Never commit JWT secrets to version control**

#### Password Security
```javascript
// Bcrypt Configuration
Salt Rounds: 12
Algorithm: bcrypt
Min Length: 6 characters (increase in production)
```

**Implementation:**
- ✅ Passwords hashed before storage
- ✅ Original passwords never stored
- ✅ Password field excluded from queries by default
- ✅ Secure password comparison using bcrypt.compare()

**Recommendations:**
- Enforce minimum 8 characters in production
- Require mixed case, numbers, and special characters
- Implement password strength meter on frontend
- Add password history to prevent reuse

---

### API Security

#### Rate Limiting

```javascript
// Default Configuration
Window: 15 minutes (900000ms)
Max Requests: 100 per window per IP
```

**Protection Against:**
- Brute force attacks
- DDoS attacks
- Credential stuffing
- API abuse

**Configuration:**
```javascript
// Adjust in .env
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### HTTP Security Headers (Helmet)

Enabled protections:
- ✅ Content Security Policy (CSP)
- ✅ X-Frame-Options (clickjacking prevention)
- ✅ X-Content-Type-Options (MIME sniffing prevention)
- ✅ Strict-Transport-Security (HSTS)
- ✅ X-XSS-Protection
- ✅ Referrer-Policy

#### CORS Configuration

```javascript
// Default: Allow all origins in development
// Production: Whitelist specific domains
const corsOptions = {
  origin: process.env.CLIENT_URL || '*',
  credentials: true
};
```

**Production Recommendation:**
```env
CLIENT_URL=https://yourdomain.com
```

---

### Input Validation

#### Joi Validation

All user inputs validated before processing:

```javascript
// Example: Registration validation
{
  name: String (2-50 chars)
  email: Valid email format, unique
  password: Minimum 6 chars
}
```

**Protected Against:**
- SQL Injection (NoSQL injection via MongoDB)
- XSS (Cross-Site Scripting)
- Invalid data types
- Buffer overflow
- Code injection

#### Mongoose Schema Validation

Additional validation at database level:
- Type checking
- Required fields
- Min/max values
- Enum constraints
- Custom validators

---

### Data Protection

#### Sensitive Data Handling

**Never Exposed:**
- ❌ Passwords (hashed, select: false)
- ❌ JWT secrets
- ❌ Stripe secret keys
- ❌ Database credentials

**Excluded from Responses:**
```javascript
// User password excluded by default
userSchema: {
  password: { select: false }
}

// Explicit exclusion in queries
User.findById(id).select('-password')
```

#### Payment Security

**Stripe Integration:**
- ✅ PCI-DSS compliant
- ✅ Server-side payment processing
- ✅ No card data stored in database
- ✅ Secure payment intents
- ✅ Test mode for development

**Never Store:**
- Credit card numbers
- CVV codes
- Full card details

---

## 🔍 Known Security Considerations

### 1. Environment Variables

**Risk:** Exposed secrets in version control

**Mitigation:**
- ✅ `.env` in `.gitignore`
- ✅ `.env.example` provided (no real values)
- ✅ Documented in README

**Action Required:**
```bash
# Never commit
git rm --cached .env
echo ".env" >> .gitignore
```

---

### 2. MongoDB Injection

**Risk:** NoSQL injection attacks

**Mitigation:**
- ✅ Mongoose sanitization
- ✅ Joi input validation
- ✅ Type checking on schemas
- ✅ No direct string concatenation in queries

**Safe Query Example:**
```javascript
// ✅ Safe
User.findOne({ email: req.body.email })

// ❌ Unsafe (avoided)
User.findOne({ email: { $ne: null } })
```

---

### 3. Cross-Site Scripting (XSS)

**Risk:** Malicious scripts in user input

**Mitigation:**
- ✅ Input validation with Joi
- ✅ Output encoding
- ✅ Content Security Policy (Helmet)
- ✅ MongoDB escaping

**Recommendation:**
- Sanitize HTML in product descriptions
- Implement frontend XSS protection

---

### 4. Cross-Site Request Forgery (CSRF)

**Risk:** Unauthorized actions on behalf of authenticated users

**Current Status:** ⚠️ Not implemented (stateless JWT API)

**Mitigation:**
- JWT tokens provide implicit CSRF protection
- No cookies used for authentication
- For cookie-based sessions: Implement CSRF tokens

---

### 5. Brute Force Attacks

**Risk:** Multiple login attempts to guess passwords

**Mitigation:**
- ✅ Rate limiting (100 requests per 15 min)
- ✅ Strong password hashing (bcrypt)

**Additional Recommendations:**
- Implement account lockout after N failed attempts
- Add CAPTCHA after 3 failed attempts
- Log suspicious activity

---

### 6. Session Security

**Current Implementation:** Stateless JWT

**Considerations:**
- ✅ No server-side session storage needed
- ✅ Scalable across multiple servers
- ⚠️ Cannot invalidate tokens before expiry

**Recommendations:**
- Implement token blacklist for logout
- Add refresh token mechanism
- Consider Redis for token management

---

### 7. File Upload Vulnerabilities

**Current Status:** ⚠️ Not implemented

**If Adding File Upload:**
- Validate file types (whitelist)
- Limit file sizes
- Scan for malware
- Store files outside web root
- Use cloud storage (S3, Cloudinary)
- Generate unique filenames

---

## 🔧 Security Configuration

### Production Environment

#### Essential Configuration

```env
# Environment
NODE_ENV=production

# Strong Secrets (32+ characters)
JWT_SECRET=use_a_long_random_string_min_32_chars_here

# Database (with authentication)
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/db

# Stripe Live Keys
STRIPE_SECRET_KEY=sk_live_your_live_key_here

# Strict Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50

# CORS (specific domain)
CLIENT_URL=https://yourdomain.com
```

#### HTTPS Configuration

**Always use HTTPS in production:**
```javascript
// Behind Nginx/Apache
app.set('trust proxy', 1);

// Or using Express HTTPS
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

https.createServer(options, app).listen(443);
```

---

### Security Checklist

#### Before Deployment

- [ ] Change all default credentials
- [ ] Generate strong JWT secret (32+ chars)
- [ ] Use production Stripe keys
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS with specific domain
- [ ] Set NODE_ENV=production
- [ ] Review and tighten rate limits
- [ ] Enable database authentication
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Remove console.log statements
- [ ] Update dependencies to latest versions
- [ ] Run security audit: `npm audit`
- [ ] Test all endpoints with security tools
- [ ] Set up error monitoring (Sentry)
- [ ] Configure firewall rules
- [ ] Implement IP whitelisting for admin routes

---

## 🛠️ Security Testing

### Automated Security Audit

```bash
# Check for known vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Force fix (may introduce breaking changes)
npm audit fix --force
```

### Manual Security Testing

#### 1. Test Authentication
```bash
# Test without token
curl -X GET http://localhost:5000/api/auth/profile

# Test with invalid token
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer invalid_token"

# Test with expired token
# (Wait for token expiration or manually create expired token)
```

#### 2. Test Input Validation
```bash
# SQL Injection attempt
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"\" OR \"1\"=\"1"}'

# XSS attempt
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"<script>alert(\"XSS\")</script>","email":"test@test.com","password":"pass123"}'
```

#### 3. Test Rate Limiting
```bash
# Send 101 requests rapidly
for i in {1..101}; do
  curl -X GET http://localhost:5000/api/products
done
# Should return 429 after 100 requests
```

#### 4. Test Authorization
```bash
# Try accessing admin route as regular user
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer user_token"
# Should return 403 Forbidden
```

---

## 📊 Security Monitoring

### Logging

**Recommended: Winston Logger**
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'security.log', level: 'warn' })
  ]
});

// Log security events
logger.warn('Failed login attempt', { 
  email: req.body.email, 
  ip: req.ip,
  timestamp: new Date()
});
```

### Events to Monitor

- ❗ Failed login attempts (multiple from same IP)
- ❗ Invalid token usage
- ❗ Rate limit exceeded
- ❗ Admin route access attempts
- ❗ Database connection failures
- ❗ Payment failures
- ❗ Unusual order patterns

---

## 🔄 Security Updates

### Update Policy

- **Critical:** Patch within 24 hours
- **High:** Patch within 7 days
- **Medium:** Patch within 30 days
- **Low:** Include in next regular release

### Dependency Updates

```bash
# Check outdated packages
npm outdated

# Update all dependencies
npm update

# Update to latest (including major versions)
npx npm-check-updates -u
npm install
```

**Recommended Schedule:**
- Security patches: Immediately
- Minor updates: Monthly
- Major updates: Quarterly (with testing)

---

## 📚 Security Resources

### Tools

- **npm audit** - Vulnerability scanning
- **Snyk** - Continuous security monitoring
- **OWASP ZAP** - Security testing
- **Helmet** - HTTP security headers
- **express-rate-limit** - Rate limiting
- **Joi** - Input validation

### Best Practices

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

## 📞 Security Contact

**For security issues only:**
- Email: security@yourcompany.com
- PGP Key: [Link to public key]

**Response Time:**
- Critical: Within 24 hours
- High: Within 48 hours
- Medium/Low: Within 5 business days

---

## 📝 Security Acknowledgments

We thank the following individuals for responsibly disclosing security vulnerabilities:

- *No vulnerabilities reported yet*

---

## 🔖 Version History

### v2.0.0 (Current)
- Enhanced JWT security
- Rate limiting implementation
- Helmet security headers
- Input validation with Joi
- Stripe payment security

---

**Last Updated:** October 2025

**Note:** This is a living document. Security practices and policies are regularly reviewed and updated.
