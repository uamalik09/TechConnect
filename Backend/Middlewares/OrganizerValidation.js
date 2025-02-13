const Joi=require('joi');
const addTalkValidation=(req,res,next)=>{
    const schema=Joi.object({
        title:Joi.string().min(3).max(200).required,
        videoUrl:Joi.string().uri().required(),
        date:Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error});
    }
    next();
};

const deleteTalkValidation=(req,res,next)=>{
    const schema=Joi.object({
        id:Joi.string().required(),
    });
    const { error } = schema.validate(req.params);
    if(error){
        return res.status(400).json({message:"Bad request",error});
    }
    next();
};

const addAnnouncementValidation = (req, res, next) => {
    const schema = Joi.object({
        announcement: Joi.string().min(3).max(500).required(),
        date:Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

const deleteAnnouncementValidation = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

const addInterviewSlotValidation = (req, res, next) => {
    const schema = Joi.object({
        date: Joi.string().required(),
        time: Joi.string().required(),
        interviewer_name: Joi.string().min(3).max(100).required(),
        interviewee_name: Joi.string().min(3).max(100).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

const deleteInterviewSlotValidation = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

module.exports={
    addAnnouncementValidation,
    deleteAnnouncementValidation,
    addTalkValidation,
    deleteTalkValidation,
    addInterviewSlotValidation,
    deleteInterviewSlotValidation
};