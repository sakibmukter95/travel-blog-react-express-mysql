# Nordic Wanderlust - Travel Blog Platform

A full-stack travel blog where adventurers can share their stories, discover new destinations, and connect with fellow travelers. Built with React, Node.js, Express, and MySQL.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange?logo=mysql)
![Express](https://img.shields.io/badge/Express-4.19.2-black?logo=express)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## What's This About?

I built this travel blog platform because I wanted to create a space where travelers could share their adventures in a beautiful, user-friendly way. The design draws inspiration from Norway's stunning landscapes - think fjords, auroras, and those incredible mountain views.

The platform handles everything you'd expect from a modern blog: user accounts, creating and editing posts, commenting, liking posts, and uploading travel photos. It's fully responsive, so it works great on phones, tablets, and desktops.

## Features

### For Travelers
- **Write and share travel stories** with rich text editing
- **Upload travel photos** with secure file handling
- **Comment on posts** and engage with other travelers
- **Like and dislike posts** to show what you enjoy
- **Discover similar posts** with intelligent recommendations
- **Responsive design** that works on any device

### For Developers
- **Full CRUD operations** across all entities
- **JWT authentication** with secure password hashing
- **RESTful API** with proper error handling
- **Database relationships** with Sequelize ORM
- **File upload system** with validation
- **Modern React patterns** with hooks and context

## Tech Stack

**Frontend:**
- React 18 with hooks and functional components
- React Router for navigation
- Material-UI for components
- Axios for API calls
- Formik & Yup for forms and validation

**Backend:**
- Node.js with Express
- MySQL database with Sequelize ORM
- JWT for authentication
- Multer for file uploads
- Bcrypt for password security

## Getting Started

### Prerequisites
You'll need Node.js (v18+) and MySQL (v8.0+) installed on your machine.

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/nordic-wanderlust.git
   cd nordic-wanderlust
   ```

2. **Set up the database**
   ```bash
   # Start MySQL (adjust for your OS)
   sudo service mysql start
   
   # Create the database
   mysql -u root -p
   CREATE DATABASE blogArticle;
   EXIT;
   ```

3. **Configure environment variables**

   Create `.env` in the `server` folder:
   ```bash
   NODE_ENV=development
   PORT=3001
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=blogArticle
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   JWT_SECRET=your_super_secure_jwt_secret_key
   ```

   Create `.env` in the `client` folder:
   ```bash
   REACT_APP_API_URL=http://localhost:3001
   ```

4. **Install dependencies**
   ```bash
   # Server dependencies
   cd server
   npm install
   
   # Client dependencies
   cd ../client
   npm install
   ```

5. **Start the app**
   ```bash
   # Terminal 1 - Start the backend
   cd server
   npm run dev
   
   # Terminal 2 - Start the frontend
   cd client
   npm start
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Project Structure

```
nordic-wanderlust/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── auth/          # Authentication logic
│   │   ├── components/    # Reusable components
│   │   ├── config/        # API configuration
│   │   ├── pages/         # Page components
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Express backend
│   ├── config/           # Database config
│   ├── middlewares/      # Express middlewares
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   ├── uploads/          # File storage
│   └── index.js          # Server entry point
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/users` - Register
- `POST /api/users/login` - Login
- `GET /api/users/authCheck` - Verify auth

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `GET /api/posts/byId/:id` - Get specific post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments
- `GET /api/comments/:postId` - Get comments for post
- `POST /api/comments` - Add comment
- `DELETE /api/comments/:id` - Delete comment

### Reactions
- `POST /api/likes` - Like a post
- `POST /api/dislikes` - Dislike a post

## Development

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

### Code Style
The project uses ESLint for code formatting. Run `npm run lint` in either directory to check your code.

## Deployment

### Using Docker (Recommended)
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy the backend**
   ```bash
   cd server
   npm install --production
   npm start
   ```

3. **Set production environment variables**
   ```bash
   NODE_ENV=production
   JWT_SECRET=your-production-secret
   DB_HOST=your-production-db
   # ... other production settings
   ```

## Security Features

- **JWT authentication** with secure token handling
- **Password hashing** with bcrypt
- **Input validation** and sanitization
- **CORS protection** for cross-origin requests
- **Rate limiting** to prevent abuse
- **Security headers** with Helmet.js
- **SQL injection prevention** via Sequelize ORM

## Contributing

I'd love your help improving this project! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test everything works
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Troubleshooting

### Common Issues

**Database connection fails:**
- Make sure MySQL is running
- Check your database credentials in `.env`
- Verify the database exists

**JWT errors:**
- Ensure `JWT_SECRET` is set in your environment variables
- Use a strong, unique secret key

**File upload issues:**
- Check the `uploads/` directory exists
- Verify file size limits in your configuration
- Ensure proper file permissions

**CORS errors:**
- Check `CLIENT_URL` in your server `.env`
- Make sure frontend and backend URLs match

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from various travel blogs and Norway's natural beauty
- Icons from Material-UI
- Images from Unsplash and personal collections
- The React and Node.js communities for excellent documentation

## Support

If you run into issues or have questions:
1. Check the documentation in `/client/README.md` and `/server/README.md`
2. Search existing GitHub issues
3. Create a new issue with details about your problem

---

**Happy coding and happy travels! 🌍✈️**

*Built for travelers, by a traveler.* 