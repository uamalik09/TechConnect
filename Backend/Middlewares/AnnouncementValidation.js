const Joi = require("joi");

const announcementValidation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required(),
        message: Joi.string().min(10).max(500).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: "Bad request", 
            errors: error.details.map(err => err.message) 
        });
    }
    next();
};

module.exports = { announcementValidation };
