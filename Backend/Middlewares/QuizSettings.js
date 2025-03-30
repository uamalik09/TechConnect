const Joi = require("joi");


const quizSettingsSchema = Joi.object({
    quizTimeLimitSeconds: Joi.number().integer().min(60).max(7200).required(), 
    quizStartTime: Joi.date().iso().required(),
    quizEndTime: Joi.date().iso().min(Joi.ref('quizStartTime')).required(),
});


const validateQuizSettings = (req, res, next) => {
    const { error } = quizSettingsSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            error: "Validation failed",
            details: error.details.map((detail) => detail.message),
        });
    }
    next();
};

module.exports = validateQuizSettings;