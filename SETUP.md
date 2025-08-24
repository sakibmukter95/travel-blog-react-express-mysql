# Travel Blog - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd travel-blog-react-express-mysql

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE blogArticle;
```

2. Configure environment variables:
```bash
# In server directory
cp env.example .env
# Edit .env with your database credentials
```

### 3. Environment Configuration

#### Server (.env)
```bash
# Copy the example file
cp env.example .env

# Edit with your values:
NODE_ENV=development
PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=blogArticle
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=http://localhost:3000
```

#### Client (.env)
```bash
# Copy the example file
cp env.example .env

# Edit with your values:
REACT_APP_API_URL=http://localhost:3001
```

### 4. Start the Application

#### Development Mode
```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm start
```

#### Production Mode
```bash
# Build client
cd client
npm run build

# Start server
cd ../server
npm start
```

## 📁 Project Structure

```
travel-blog-react-express-mysql/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── auth/          # Authentication components
│   │   ├── components/    # Reusable components
│   │   ├── config/        # Configuration files
│   │   ├── pages/         # Page components
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Express backend
│   ├── config/           # Database configuration
│   ├── middlewares/      # Express middlewares
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   ├── uploads/          # File uploads
│   └── index.js          # Server entry point
└── README.md
```

## 🔧 Available Scripts

### Server
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

### Client
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🛡️ Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - API rate limiting
- **CORS** - Cross-origin resource sharing
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Request validation
- **Error Handling** - Comprehensive error handling

## 📊 API Endpoints

### Authentication
- `POST /api/users` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/authCheck` - Verify authentication

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/byId/:id` - Get post by ID
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments
- `GET /api/comments/:postId` - Get comments for post
- `POST /api/comments` - Add comment
- `DELETE /api/comments/:id` - Delete comment

### Reactions
- `POST /api/likes` - Like a post
- `POST /api/dislikes` - Dislike a post

## 🧪 Testing

```bash
# Run server tests
cd server
npm test

# Run client tests
cd client
npm test
```

## 🚀 Deployment

### Environment Variables
Make sure to set all required environment variables in production:

- `NODE_ENV=production`
- `JWT_SECRET` - Strong secret key
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `CLIENT_URL` - Your frontend URL

### Database
- Use a production MySQL database
- Set up proper backups
- Configure connection pooling

### File Uploads
- Consider using cloud storage (AWS S3, etc.)
- Set up proper file size limits
- Implement file type validation

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MySQL service is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **JWT Secret Error**
   - Set `JWT_SECRET` in environment variables
   - Use a strong, unique secret

3. **CORS Errors**
   - Check `CLIENT_URL` in server `.env`
   - Ensure frontend URL matches

4. **File Upload Issues**
   - Check `uploads/` directory exists
   - Verify file size limits
   - Check file permissions

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
