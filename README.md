# TechConnect

## Project Overview
TechConnect is a dynamic and user-friendly platform designed to streamline tech club recruitment processes. This centralized system eliminates the hassle of manual management, providing an efficient recruitment experience for both students and organizers.

Managing club recruitment activities such as registrations, pre-recruitment talks, online assessments, and announcements manually can be time-consuming and inefficient. TechConnect solves this by creating a centralized platform where:

- Students can register, track their progress, and communicate with organizers
- Admins can schedule interviews, set online assessments with timers, and respond to student queries

## Key Features

### For Students
- User registration and profile management
- Real-time progress tracking through the recruitment process
- Online assessment portal with built-in timers
- Communication with organizers via chat feature
- Notification system for updates and announcements

### For Admins
- Comprehensive dashboard to manage the entire recruitment process
- Interview scheduling and management
- Online assessment creation and administration
- Student qualification tracking
- Announcement broadcasting system
- Chat functionality to respond to student queries

## Technology Stack

TechConnect is built using the MERN stack:

| Component | Technology | Purpose |
|-----------|------------|---------|
| Database | MongoDB | Storing user information, assessment data, and interview details |
| Backend | Express.js | Handling API requests |
| Frontend | React | Building a responsive user interface |
| Runtime | Node.js | Server environment |
| Styling | TailwindCSS | Frontend component styling |

## Screenshots

<details>
  <summary>Click to view screenshots</summary>
  
  ### Home Page
  ![Home Page](path/to/homepage-screenshot.png)
  
  ### Admin Dashboard
  ![Admin Dashboard](path/to/admin-dashboard-screenshot.png)
  
  ### Student Portal
  ![Student Portal](path/to/student-portal-screenshot.png)
</details>

## Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn
- MongoDB (v4.0.0 or higher)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/techconnect.git
   cd techconnect
   ```

2. **Backend Setup**
   ```bash
   # Navigate to the backend directory
   cd backend

   # Install dependencies
   npm install

   # Create .env file (replace with your configuration)
   echo "MONGODB_URI=mongodb://localhost:27017/techconnect
   PORT=5000
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development" > .env

   # Start the server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   # Open a new terminal and navigate to frontend
   cd frontend

   # Install dependencies
   npm install

   # Create .env file
   echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

   # Start the development server
   npm start
   ```

4. **Access the application** at `http://localhost:3000`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Recruitment Endpoints
- `GET /api/recruitment/status` - Get recruitment status
- `POST /api/recruitment/apply` - Submit application

### Assessment Endpoints
- `GET /api/assessments` - Get available assessments
- `GET /api/assessments/:id` - Get specific assessment
- `POST /api/assessments/:id/submit` - Submit assessment answers

### Admin Endpoints
- `GET /api/admin/dashboard` - Get admin dashboard data
- `POST /api/admin/announcements` - Create a new announcement
- `GET /api/admin/applications` - Get all applications

## Project Structure
```
techconnect/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   └── App.js       # Main component
│   └── package.json     # Frontend dependencies
└── README.md            # Project documentation
```

## Contributors
- Aryan (Mentor)
- Umer (Mentor)
- Peteti Hanvitha (Mentee)
- Padmavati M Kudal (Mentee)
- Nelluri Thanmaya Sri (Mentee)

## License
This project is licensed under the MIT License - see the LICENSE file for details.
