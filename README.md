# audit-main
# Authentication System Backend

This is a Node.js/Express backend for an authentication system with signup, OTP verification, and login functionality.

## Features

- User registration with validation
- OTP verification via email
- User login with JWT authentication
- Secure password hashing
- MongoDB database integration

## Setup Instructions

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory with the following variables:
     ```
     PORT=5000
     NODE_ENV=development
     MONGO_URI=mongodb://localhost:27017/auth-system
     JWT_SECRET=your_jwt_secret_key
     JWT_EXPIRE=30d
     EMAIL_SERVICE=gmail
     EMAIL_USERNAME=your_email@gmail.com
     EMAIL_PASSWORD=your_app_password
     EMAIL_FROM=your_email@gmail.com
     OTP_EXPIRY=10
     ```

5. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Auth Routes

- **POST /api/auth/signup**
  - Register a new user
  - Requires: name, email, password
  - Returns: user data and sends OTP to email

- **POST /api/auth/verify-otp**
  - Verify OTP sent to user's email
  - Requires: email, otp
  - Returns: JWT token

- **POST /api/auth/resend-otp**
  - Resend OTP to user's email
  - Requires: email
  - Returns: success message

- **POST /api/auth/login**
  - Authenticate a user
  - Requires: email, password
  - Returns: user data and JWT token

## Project Structure

```
backend/
├── config/                     # Configuration files
├── controllers/                # Request handlers
├── middlewares/                # Custom middlewares
├── models/                     # Database models
├── routes/                     # API routes
├── utils/                      # Helper functions
├── .env                        # Environment variables
└── server.js                   # Main entry point
```
