import mongoose from 'mongoose';

const techinalSkillsSchema = new mongoose.Schema({
    question:{
        type:String,
        required: true
    },
    intention:{
        type:String,
        required: true
    },
    answer:{
        type:String,
        required: true
    }
}, { _id: false });

const behavioralSkillsSchema = new mongoose.Schema({
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required: true
    },
    severity:{
        type:String,
        enum: ['low', 'medium', 'high'],
        required: true
    }
},{ _id: false });

const preparationTipsSchema = new mongoose.Schema({
    day:{
        type:Number,
        required: true
    },
    focus:{
        type:String,
        required: true
    },
    tasks:{
        type:String,
        required: true
    }
},{ _id: false })

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required: true
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min: 0,
        max: 100
    },
    technicalQuestion:[techinalSkillsSchema],
    behavioralQuestion:[behavioralSkillsSchema],
    skillGaps:[skillGapSchema],
    preparationTips:[preparationTipsSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

export const InterviewReport = mongoose.model('InterviewReport', interviewReportSchema);