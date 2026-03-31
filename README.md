# Library-Management-System


## Library Management System (Backend)

A production-level backend system built with Node.js, Express, PostgreSQL, and Prisma, designed with clean architecture and real-world scalability in mind.

---

##  Project Structure

```
library-management-system/
│
├── prisma/                         # Prisma ORM (Database Layer)
│   ├── schema.prisma               # Database schema (models & relations)
│   ├── migrations/                 # Auto-generated migrations
│   └── seed.js                     # Seed initial data
│
├── src/
│   │
│   ├── config/                     # Application configuration
│   │   ├── prisma.js               # Prisma client instance
│   │   ├── env.js                  # Environment variable loader
│   │   └── constants.js            # App constants (fine rate, limits, etc.)
│   │
│   ├── controllers/                # Request → Response handling (NO business logic)
│   │   ├── auth.controller.js
│   │   ├── book.controller.js
│   │   ├── borrow.controller.js
│   │   ├── queue.controller.js
│   │   └── user.controller.js
│   │
│   ├── services/                  # 🔥 Core Business Logic Layer
│   │   ├── auth.service.js
│   │   ├── book.service.js
│   │   ├── borrow.service.js      # (Transactions handled here)
│   │   ├── queue.service.js
│   │   ├── fine.service.js
│   │   └── user.service.js
│   │
│   ├── routes/                    # API Routes
│   │   ├── auth.routes.js
│   │   ├── book.routes.js
│   │   ├── borrow.routes.js
│   │   ├── queue.routes.js
│   │   └── index.js               # Route aggregator
│   │
│   ├── middleware/                # Request pipeline control
│   │   ├── auth.middleware.js     # JWT verification
│   │   ├── role.middleware.js     # Role-based access control
│   │   ├── validation.middleware.js
│   │   ├── error.middleware.js    # Global error handler
│   │   └── rateLimit.middleware.js (optional)
│   │
│   ├── validators/                # Request validation schemas
│   │   ├── auth.validator.js
│   │   ├── book.validator.js
│   │   └── borrow.validator.js
│   │
│   ├── utils/                     # Reusable helper functions
│   │   ├── jwt.js                 # JWT generation & verification
│   │   ├── hash.js                # Password hashing utilities
│   │   ├── apiResponse.js         # Standard API response format
│   │   ├── asyncHandler.js        # Async error wrapper
│   │   └── logger.js              # Logging (Winston/Morgan)
│   │
│   ├── modules/                   # (Optional) Feature-based modular structure
│   │   ├── auth/
│   │   ├── books/
│   │   ├── borrow/
│   │   └── queue/
│   │
│   ├── app.js                     # Express app configuration
│   └── server.js                  # Application entry point
│
├── tests/                         # (Optional) Test cases
│   ├── auth.test.js
│   ├── borrow.test.js
│   └── book.test.js
│
├── .env                           # Environment variables
├── .env.example                   # Sample environment config
├── package.json
├── README.md
└── .gitignore
```


