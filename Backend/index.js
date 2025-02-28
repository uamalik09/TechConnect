const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const AdminRouter = require('./Routes/AdminRouter');
const AnnouncementRouter = require('./Routes/AnnouncementRouter');
const TalkRouter = require('./Routes/TalkRouter');
const QuestionsRouter = require('./routes/QuestionsRouter');
const AdminRoutes = require('./Routes/AdminRoutes');

app.use(cors({
    origin: "http://localhost:5173", // Allow only frontend
    credentials: true, // Allow cookies/authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  }));
  

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;


app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());

app.use('/auth', AuthRouter);
//app.use('/organizer', OrganizerRouter);
app.use('/admin', AdminRouter);
app.use('/api', AnnouncementRouter);
app.use('/api', TalkRouter);
app.use('/questions', QuestionsRouter); 
app.use('/superadmin', AdminRoutes);

app.listen(PORT, () => {
    console.log("Server is listening");
});

