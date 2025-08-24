# Full-Stack Travel Blog - React, Express, MySQL CRUD Application

A complete full-stack web application demonstrating modern web development practices with React frontend, Express.js backend, and MySQL database. Features comprehensive CRUD operations, JWT authentication, file uploads, and responsive design.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange?logo=mysql)
![Express](https://img.shields.io/badge/Express-4.19.2-black?logo=express)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

### 🔧 Technical Features
- **Full CRUD Operations**: Create, Read, Update, Delete for all entities
- **JWT Authentication**: Secure token-based authentication system
- **File Upload System**: Image upload with validation and storage
- **RESTful API**: Well-structured API endpoints with proper HTTP methods
- **Database Relationships**: Complex relationships with Sequelize ORM
- **Responsive Design**: Mobile-first approach with Material-UI
- **Form Validation**: Client and server-side validation with Formik & Yup
- **Error Handling**: Comprehensive error handling and logging
- **Security Features**: CORS, rate limiting, input sanitization
- **Testing Setup**: Jest configuration for unit and integration tests

### 📱 User Interface
- **Modern React Components**: Functional components with hooks
- **Material-UI Integration**: Professional component library
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Real-time Interactions**: Dynamic content updates
- **Image Gallery**: Photo upload and display functionality
- **User Dashboard**: Profile management and content creation

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **React Router DOM 6.24.0** - Client-side routing
- **Material-UI 5.16.1** - Component library and design system
- **Axios 1.7.2** - HTTP client with interceptors
- **Formik 2.4.6** - Form handling and management
- **Yup 1.4.0** - Schema validation
- **React Quill 2.0.0** - Rich text editor

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js 4.19.2** - Web application framework
- **MySQL 8.0+** - Relational database
- **Sequelize 6.37.3** - ORM for database operations
- **JWT 9.0.2** - JSON Web Token authentication
- **Bcrypt 5.1.1** - Password hashing
- **Multer 1.4.5** - File upload middleware
- **CORS 2.8.5** - Cross-origin resource sharing

### Development & Deployment
- **Docker & Docker Compose** - Containerization
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Nginx** - Reverse proxy and static file serving

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/travel-blog-react-express-mysql.git
cd travel-blog-react-express-mysql
```

### 2. Database Setup
```bash
# Start MySQL service
sudo service mysql start  # Linux
# or
brew services start mysql  # macOS

# Create database
mysql -u root -p
CREATE DATABASE blogArticle;
EXIT;
```

### 3. Environment Configuration

**Server Environment** (`server/.env`):
```bash
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_NAME=blogArticle
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_super_secure_jwt_secret_key
CLIENT_URL=http://localhost:3000
```

**Client Environment** (`client/.env`):
```bash
REACT_APP_API_URL=http://localhost:3001
```

### 4. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 5. Start Development Servers
```bash
# Terminal 1 - Start backend server
cd server
npm run dev

# Terminal 2 - Start frontend development server
cd client
npm start
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📁 Project Structure

```
travel-blog-react-express-mysql/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── auth/          # Authentication context and utilities
│   │   ├── components/    # Reusable React components
│   │   ├── config/        # API configuration and endpoints
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main application component
│   │   └── index.js       # Application entry point
│   ├── Dockerfile         # Frontend container configuration
│   └── nginx.conf         # Nginx configuration
├── server/                # Express backend application
│   ├── config/           # Database and app configuration
│   ├── middlewares/      # Express middlewares
│   ├── models/           # Sequelize database models
│   ├── routes/           # API route handlers
│   ├── uploads/          # File upload storage
│   ├── __tests__/        # Test files
│   └── index.js          # Server entry point
├── Dockerfile            # Backend container configuration
├── docker-compose.yml    # Multi-container setup
└── README.md            # Project documentation
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users` | User registration |
| `POST` | `/api/users/login` | User login |
| `GET` | `/api/users/authCheck` | Verify authentication |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/posts` | Get all posts |
| `POST` | `/api/posts` | Create new post |
| `GET` | `/api/posts/byId/:id` | Get specific post |
| `PUT` | `/api/posts/:id` | Update post |
| `DELETE` | `/api/posts/:id` | Delete post |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/comments/:postId` | Get comments for post |
| `POST` | `/api/comments` | Add comment |
| `DELETE` | `/api/comments/:id` | Delete comment |

### Reactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/likes` | Like a post |
| `POST` | `/api/dislikes` | Dislike a post |

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

### API Testing
```bash
# Test health endpoint
curl http://localhost:3001/health

# Test authentication
curl -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)
```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d
```

### Manual Docker Build
```bash
# Build backend image
docker build -t travel-blog-server .

# Build frontend image
cd client
docker build -t travel-blog-client .
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with configurable rounds
- **Input Validation**: Client and server-side validation
- **CORS Protection**: Configurable cross-origin requests
- **Rate Limiting**: API rate limiting to prevent abuse
- **Security Headers**: Helmet.js for security headers
- **SQL Injection Prevention**: Sequelize ORM protection
- **File Upload Security**: Type and size validation

## 📊 Database Schema

### Users Table
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password` (Hashed)
- `createdAt`, `updatedAt`

### Posts Table
- `id` (Primary Key)
- `title`
- `content`
- `imageUrl`
- `userId` (Foreign Key)
- `createdAt`, `updatedAt`

### Comments Table
- `id` (Primary Key)
- `content`
- `postId` (Foreign Key)
- `userId` (Foreign Key)
- `createdAt`, `updatedAt`

### Likes/Dislikes Tables
- `id` (Primary Key)
- `postId` (Foreign Key)
- `userId` (Foreign Key)
- `createdAt`, `updatedAt`

## 🚀 Production Deployment

### Environment Variables
```bash
NODE_ENV=production
PORT=3001
DB_HOST=your-production-db-host
DB_NAME=your-production-db-name
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
JWT_SECRET=your-super-secure-production-jwt-secret
CLIENT_URL=https://your-frontend-domain.com
```

### Deployment Platforms
- **Heroku**: Connect GitHub repository
- **AWS EC2**: Use PM2 for process management
- **DigitalOcean**: Deploy with Docker
- **Railway**: Simple Node.js deployment
- **Vercel**: Frontend deployment
- **Netlify**: Static site hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation for API changes

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**
- Verify MySQL service is running
- Check database credentials in `.env`
- Ensure database exists

**JWT Authentication Errors:**
- Set `JWT_SECRET` in environment variables
- Use strong, unique secret key

**File Upload Issues:**
- Check `uploads/` directory exists
- Verify file size limits
- Ensure proper file permissions

**CORS Errors:**
- Check `CLIENT_URL` in server `.env`
- Verify frontend and backend URLs match

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React and Node.js communities for excellent documentation
- Material-UI for the component library
- Sequelize team for the ORM
- All contributors and supporters

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/travel-blog-react-express-mysql/issues)
- **Documentation**: Check `/client/README.md` and `/server/README.md`
- **Wiki**: [Project Wiki](https://github.com/yourusername/travel-blog-react-express-mysql/wiki)

---

**⭐ Star this repository if you find it helpful!**

*Built with modern web technologies for developers and learners.* 
