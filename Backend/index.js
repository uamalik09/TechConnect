const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const AdminRouter = require('./Routes/AdminRouter');
const AnnouncementRouter = require('./Routes/AnnouncementRouter');
const TalkRouter = require('./Routes/TalkRouter');
const QuestionsRouter = require('./Routes/QuestionsRouter');
const ResultRouter = require('./Routes/ResultRouter');
const AdminRoutes = require('./Routes/AdminRoutes');
const StudentRoutes = require('./Routes/StudentRouter');
const TestStatusRoutes = require('./Routes/TestStatusRoutes');
const QuizStatusRoutes = require('./Routes/QuizStatus');
const DoubtRoutes = require('./Routes/DoubtRouter');
const CodingRoutes = require('./Routes/CodingRoutes');
const PreferenceRoutes=require('./Routes/PreferenceRoutes');

app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5174'], // Allow only frontend
    credentials: true, // Allow cookies/authentication headers
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Allowed HTTP methods
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
app.use("/api/auth", AuthRouter);
app.use('/admin', AdminRouter);
app.use('/api', AnnouncementRouter);
app.use('/api', TalkRouter);
app.use('/questions', QuestionsRouter); 
app.use('/results', ResultRouter); 
app.use('/test-status',TestStatusRoutes);
app.use('/superadmin', AdminRoutes);
app.use('/students', StudentRoutes);
app.use('/status', QuizStatusRoutes)    ;
app.use('/api/doubts', DoubtRoutes);
app.use('/coding', CodingRoutes);
app.use('/api/preferences',PreferenceRoutes);

app.use(express.static("./Frontend/build"));
app.get("*", (req, res) => {
    res.sendFile(Path2D.resolve(__dirname, "Frontend", "build", "index.html"))
});

app.listen(PORT, () => {
    console.log("Server is listening");
});

