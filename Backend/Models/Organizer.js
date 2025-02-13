const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const TalkSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    }
});

const AnnouncementSchema=new Schema({
    announcement:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    }
});

const InterviewSlotSchema = new Schema({
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    interviewer_name:{
        type:String,
        required:true,
    },
    interviewee_name:{
        type:String,
        required:true,
    }
});
const TalkModel=mongoose.model('PreRecruitmentTalk',TalkSchema);
const AnnouncementModel=mongoose.model('Announcement',AnnouncementSchema);
const InterviewSlotModel=mongoose.model('InterviewSlot',InterviewSlotSchema);
module.exports={TalkModel,AnnouncementModel,InterviewSlotModel};