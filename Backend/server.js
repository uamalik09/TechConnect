import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';

import cors from 'cors';


const app = express();
const port = process.env.PORT || 5100;
app.use(cors());


app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',  
  user: 'root',      
  password: 'Hani09@2006',
  database: 'iet'  
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});


app.post('/api/organizer', (req, res) => {
  const { title, videoUrl, date } = req.body;
  console.log("Received data:", req.body);
  const query = 'INSERT INTO PreRecruitmentTalks (title, videoUrl, date) VALUES (?, ?, ?)';
  db.query(query, [title, videoUrl, date], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add talk' });
    }
    res.status(200).json({ message: 'Talk added successfully' });
  });
});

app.get('/api/talks', (req, res) => {
  const query = 'SELECT * FROM PreRecruitmentTalks ORDER BY date ASC';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch talks' });
    }
    res.status(200).json(results);
  });
});

app.delete('/api/organizer/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM PreRecruitmentTalks WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete talk' });
    }
    res.status(200).json({ message: 'Talk deleted successfully' });
  });
});


app.post("/add-announcement", (req, res) => {
  const { announcement } = req.body;

  const query = "INSERT INTO announcements (announcement) VALUES (?)";
  db.query(query, [announcement], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send({ message: "Error adding announcement" });
      } else {
          res.status(200).send({ message: "Announcement added successfully" });
      }
  });
});

app.get("/view-announcements", (req, res) => {
  const query = "SELECT * FROM announcements";
  db.query(query, (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send({ message: "Error fetching announcements" });
      } else {
          res.status(200).send(result);
      }
  });
});
app.delete("/add-announcement/:id", (req, res) => {
  const id = req.params.id;
  console.log("Received delete request for ID:", id); 

  if (!id) {
    return res.status(400).json({ error: "ID is required to delete an announcement" });
  }

  const query = "DELETE FROM announcements WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to delete announcement" });
    }
    res.status(200).json({ message: "Announcement deleted successfully" });
  });
});

app.post("/add-interview-slot", (req, res) => {
  const { date, time, organizer } = req.body;
  const query = "INSERT INTO InterviewSlots (date, time, organizer) VALUES (?, ?, ?)";
  db.query(query, [date, time, organizer], (err, result) => {
      if (err) {
          return res.status(500).json({ error: "Failed to add interview slot" });
      }
      res.status(200).json({ message: "Interview slot added successfully" });
  });
});

app.get("/get-interview-slots", (req, res) => {
  const query = "SELECT * FROM InterviewSlots";
  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).json({ error: "Failed to fetch interview slots" });
      }
      res.status(200).json(results);
  });
});

app.delete("/add-interview-slot/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM InterviewSlots WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete slot" });
    }
    res.status(200).json({ message: "Interview slot deleted successfully" });
  });
});

app.post("/add-question", (req, res) => {
  const { question, option1, option2, option3, option4, correctOption } = req.body;
  
  // Log the request body to ensure all fields are being sent correctly
  console.log("Request Body:", req.body);

  const query = "INSERT INTO questions (question, option1, option2, option3, option4, correctOption) VALUES (?, ?, ?, ?, ?, ?)";
  
  db.query(query, [question, option1, option2, option3, option4, correctOption], (err, result) => {
      if (err) {
          // Log the error for better visibility
          console.error("Error inserting question:", err);
          return res.status(500).send({ message: "Error inserting question", error: err });
      }
      res.status(200).send("Question added successfully!");
  });
});


// Get all questions
app.get("/get-question", (req, res) => {
  const query = "SELECT * FROM questions";
  db.query(query, (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
  });
});

app.delete("/add-question/:id", (req, res) => {
  const id = req.params.id;

  // Log the ID to ensure it's being received correctly
  console.log(`Deleting question with ID: ${id}`);

  if (!id) {
    return res.status(400).json({ error: "ID is required to delete a question" });
  }

  const query = "DELETE FROM questions WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to delete question" });
    }

    // Check if any row was affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  });
});
 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
