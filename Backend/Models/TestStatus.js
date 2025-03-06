const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestStatusSchema = new Schema({
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    access: {
        type: Boolean,
        required: true,
        default: false
    }
});

const TestStatus = mongoose.model('TestStatus', TestStatusSchema);
module.exports = TestStatus;
