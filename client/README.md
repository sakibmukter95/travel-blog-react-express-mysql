# 🌍 Nordic Wanderlust - Full-Stack Travel Blog

A modern, responsive **CRUD (Create, Read, Update, Delete)** travel blog built with React, Node.js, Express, and MySQL. Share your adventures, explore stunning destinations, and connect with fellow travelers in this beautifully designed platform inspired by Norway's natural wonders.

![Travel Blog Preview](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Node.js Version](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![MySQL Database](https://img.shields.io/badge/MySQL-8.0+-orange?logo=mysql)
![Express Framework](https://img.shields.io/badge/Express-4.19.2-black?logo=express)

## ✨ Features

### CRUD Operations
- **📝 Blog Posts**: **Create, Read, Update, Delete** travel stories with rich content
- **💬 Interactive Comments**: **Create, Read, Update, Delete** comments with real-time engagement
- **👤 User Management**: **Create, Read, Update, Delete** user accounts and profiles
- **👍 Like/Dislike System**: **Create** and **Delete** reactions to posts
- **📸 Image Upload**: **Create** and **Delete** travel photos with secure file handling

### User Experience
- **🌅 Hero Carousel**: Stunning full-screen image slider showcasing travel destinations
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🔍 Similar Posts**: Discover related content with intelligent recommendations
- **🎨 Modern UI**: Glass morphism design with smooth animations
- **👤 User Authentication**: Secure login/registration with JWT tokens

## 🛠️ Tech Stack

### CRUD Implementation
This application demonstrates complete **CRUD (Create, Read, Update, Delete)** operations using modern web technologies:

- **Create**: New posts, comments, users, and reactions
- **Read**: Display posts, comments, user profiles, and similar content
- **Update**: Edit posts, comments, and user information
- **Delete**: Remove posts, comments, reactions, and user accounts

### Frontend
- **React 18.3.1** - Modern UI library
- **React Router DOM** - Client-side routing
- **Material-UI** - Component library
- **Axios** - HTTP client
- **Formik & Yup** - Form handling and validation
- **CSS3** - Custom styling with modern design patterns

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Relational database
- **Sequelize** - ORM for database operations
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nordic-wanderlust.git
   cd nordic-wanderlust
   ```

2. **Set up the database**
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

3. **Configure environment variables**

   **Server (.env file in `/server` directory):**
   ```bash
   NODE_ENV=development
   PORT=3001
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=blogArticle
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   JWT_SECRET=your_super_secure_jwt_secret_key
   JWT_EXPIRES_IN=24h
   MAX_FILE_SIZE=5242880
   CORS_ORIGIN=http://localhost:3000
   ```

   **Client (.env file in `/client` directory):**
   ```bash
   REACT_APP_API_URL=http://localhost:3001
   ```

4. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

5. **Start the application**
   ```bash
   # Terminal 1: Start the backend server
   cd server
   npm start
   
   # Terminal 2: Start the frontend development server
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
nordic-wanderlust/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── auth/          # Authentication context
│   │   ├── components/    # Reusable components
│   │   ├── config/        # API configuration
│   │   ├── pages/         # Page components
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── middlewares/      # Express middlewares
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   ├── uploads/          # File uploads
│   └── index.js          # Server entry point
└── README.md
```

## 🔧 Configuration

### Database Setup

The application uses MySQL with Sequelize ORM. The database configuration is in `server/config/config.js` and supports multiple environments:

- **Development**: Local MySQL instance
- **Production**: Production database with SSL
- **Test**: Test database for automated testing

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3001` |
| `DB_HOST` | Database host | `localhost` |
| `DB_NAME` | Database name | `blogArticle` |
| `JWT_SECRET` | JWT signing secret | Required |
| `CORS_ORIGIN` | Allowed origins | `http://localhost:3000` |

## 🎨 Customization

### Styling

The application uses custom CSS with modern design patterns:
- **Glass morphism effects**
- **Responsive grid layouts**
- **Smooth animations**
- **Modern typography**

### Adding New Features

1. **Backend**: Add new routes in `server/routes/`
2. **Frontend**: Create new components in `client/src/components/`
3. **Database**: Define new models in `server/models/`

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **Input Validation**: Comprehensive input sanitization
- **CORS Protection**: Cross-origin resource sharing
- **File Upload Security**: Type and size validation
- **SQL Injection Prevention**: Sequelize ORM protection

## 🧪 Testing

```bash
# Run frontend tests
cd client
npm test

# Run backend tests (when implemented)
cd server
npm test
```

## 📦 Deployment

### Frontend (React)
```bash
cd client
npm run build
# Deploy the 'build' folder to your hosting service
```

### Backend (Node.js)
```bash
cd server
npm install --production
# Deploy to your server (Heroku, AWS, DigitalOcean, etc.)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: [Anywhere We Roam](https://anywhereweroam.com/)
- **Icons**: Material-UI Icons
- **Images**: Unsplash and local assets
- **Fonts**: Google Fonts (Inter, Playfair Display)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/nordic-wanderlust/issues) page
2. Create a new issue with detailed information
3. Contact: your.email@example.com

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Full-stack travel blog functionality
- Modern responsive design
- User authentication system
- Image upload capabilities

---

**Made with ❤️ for travelers and adventure seekers**

*Explore the world, share your stories, and inspire others to wander.*
