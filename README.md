# Library-Management-System


## Library Management System (Backend)

A production-level backend system built with Node.js, Express, PostgreSQL, and Prisma, designed with clean architecture and real-world scalability in mind.

---

##  Project Structure

```
library-management-system/
│
├── prisma/
│   ├── schema.prisma              # Database schema (single source of truth)
│   ├── migrations/                # Auto-generated SQL migrations
│   │   └── 20240101_init/
│   │       └── migration.sql
│   └── seed.js                    # Sample data for testing
│
├── src/
│   │
│   ├── config/
│   │   ├── database.js            # Prisma client initialization
│   │   ├── constants.js           # App-wide constants
│   │   │                          # (FINE_PER_DAY, BORROW_DAYS, etc.)
│   │   └── config.js              # Environment-based configuration
│   │
│   ├── controllers/               # HTTP request/response handlers
│   │   ├── authController.js      # signup, login
│   │   ├── bookController.js      # CRUD operations
│   │   ├── borrowController.js    # borrow, return, history
│   │   ├── queueController.js     # queue management
│   │   └── userController.js      # user profile, fines
│   │
│   ├── services/                  # Business logic layer
│   │   ├── authService.js         # Authentication logic
│   │   ├── bookService.js         # Book management logic
│   │   ├── borrowService.js       # CORE: Borrow/return logic
│   │   ├── queueService.js        # Queue FIFO management
│   │   ├── fineService.js         # Fine calculation logic
│   │   └── notificationService.js # (Optional) Email/SMS notifications
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification (protect route)
│   │   ├── roleMiddleware.js      # RBAC (authorize roles)
│   │   ├── validator.js           # Joi schema validation
│   │   ├── errorHandler.js        # Global error handler
│   │   └── rateLimiter.js         # Rate limiting middleware
│   │
│   ├── routes/
│   │   ├── index.js               # Route aggregator (imports all routes)
│   │   ├── authRoutes.js          # POST /signup, /login
│   │   ├── bookRoutes.js          # GET, POST, PUT, DELETE /books
│   │   ├── borrowRoutes.js        # POST /borrow, /return, GET /history
│   │   ├── queueRoutes.js         # GET /queues, DELETE /queues/:id
│   │   └── userRoutes.js          # GET /profile, /fines
│   │
│   ├── utils/
│   │   ├── asyncHandler.js        # Wraps async functions (error catching)
│   │   ├── AppError.js            # Custom error class
│   │   ├── responseHandler.js     # Standard API response format
│   │   ├── logger.js              # Winston logger setup
│   │   └── helpers.js             # Date calculations, etc.
│   │
│   ├── validators/                # Joi validation schemas
│   │   ├── authValidator.js       # Signup/login schemas
│   │   ├── bookValidator.js       # Book CRUD schemas
│   │   └── borrowValidator.js     # Borrow/return schemas
│   │
│   └── app.js                     # Express app setup (middleware, routes)
│
├── tests/                         # (Optional) Unit & integration tests
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   └── integration/
│       └── api/
│
├── .env                           # Environment variables 
├── .env.example                   # Template for .env
├── .gitignore                     # Ignore node_modules, .env, etc.
├── package.json                   # Dependencies and scripts
├── server.js                      # Entry point (starts server)
└── README.md                      # Project documentation
```


