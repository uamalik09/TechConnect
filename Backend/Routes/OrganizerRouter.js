const { addTalk, getTalks, deleteTalk, addAnnouncement, getAnnouncements, deleteAnnouncement, addInterviewSlot, getInterviewSlots, deleteInterviewSlot }=require('../Controllers/OrganizerController');
const { addTalkValidation, deleteTalkValidation, addAnnouncementValidation, deleteAnnouncementValidation, addInterviewSlotValidation, deleteInterviewSlotValidation}=require('../Middlewares/OrganizerValidation');

const router = require('express').Router();

router.post('/api/talks', addTalkValidation, addTalk);
router.get('/api/talks', getTalks);
router.delete('/api/talks/:id', deleteTalkValidation, deleteTalk);
router.post('/api/announcements', addAnnouncementValidation, addAnnouncement);
router.get('/api/announcements', getAnnouncements);
router.delete('/api/announcements/:id', deleteAnnouncementValidation, deleteAnnouncement);
router.post('/api/interview-slots', addInterviewSlotValidation, addInterviewSlot);
router.get('/api/interview-slots', getInterviewSlots);
router.delete('/api/interview-slots/:id', deleteInterviewSlotValidation, deleteInterviewSlot);

module.exports = router;