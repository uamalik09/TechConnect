const TalkModel=require("../Models/Organizer");
const AnnouncementModel = require("../Models/Organizer");
const InterviewSlotModel = require("../Models/Organizer");

const addTalk=async(req,res)=>{
    try{
        const {title,videoUrl,date} =req.body;
        const newTalk=new TalkModel({title,videoUrl,date});
        await newTalk.save();
        res.status(201).json({message:"Talk added successfully"});
    }catch(error){
        console.error("Error adding talk:",error);
        res.status(500).json({error:"Failed to add talk"});
    }
};

const getTalks=async(req,res)=>{
    try{
        const talks=await TalkModel.find();
        res.status(200).json(talks);
    }catch (error) {
        console.error("Error fetching talks:", error);
        res.status(500).json({ error: "Failed to fetch talks" });
    }
};

const deleteTalk = async (req, res) => {
    try {
        const { id } = req.params;
        await TalkModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Talk deleted successfully" });
    } catch (error) {
        console.error("Error deleting talk:", error);
        res.status(500).json({ error: "Failed to delete talk" });
    }
};

const addAnnouncement = async (req, res) => {
    try {
        const { announcement , date } = req.body;
        const newAnnouncement = new AnnouncementModel({ announcement , date });
        await newAnnouncement.save();
        res.status(201).json({ message: "Announcement added successfully" });
    } catch (error) {
        console.error("Error adding announcement:", error);
        res.status(500).json({ error: "Failed to add announcement" });
    }
};

const getAnnouncements = async (req, res) => {
    try {
        const announcements = await AnnouncementModel.find();
        res.status(200).json(announcements);
    } catch (error) {
        console.error("Error fetching announcements:", error);
        res.status(500).json({ error: "Failed to fetch announcements" });
    }
};

const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        await AnnouncementModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
        console.error("Error deleting announcement:", error);
        res.status(500).json({ error: "Failed to delete announcement" });
    }
};

const addInterviewSlot = async (req, res) => {
    try {
        const { date, time, interviewer_name,interviewee_name } = req.body;
        const newSlot = new InterviewSlotModel({ date, time, interviewer_name,interviewee_name });
        await newSlot.save();
        res.status(201).json({ message: "Interview slot added successfully" });
    } catch (error) {
        console.error("Error adding interview slot:", error);
        res.status(500).json({ error: "Failed to add interview slot" });
    }
};

const getInterviewSlots = async (req, res) => {
    try {
        const slots = await InterviewSlotModel.find();
        res.status(200).json(slots);
    } catch (error) {
        console.error("Error fetching interview slots:", error);
        res.status(500).json({ error: "Failed to fetch interview slots" });
    }
};

const deleteInterviewSlot = async (req, res) => {
    try {
        const { id } = req.params;
        await InterviewSlotModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Interview slot deleted successfully" });
    } catch (error) {
        console.error("Error deleting interview slot:", error);
        res.status(500).json({ error: "Failed to delete interview slot" });
    }
};

module.exports={
    addTalk,
    getTalks,
    deleteTalk,
    addAnnouncement,
    getAnnouncements,
    deleteAnnouncement,
    addInterviewSlot,
    getInterviewSlots,
    deleteInterviewSlot
};