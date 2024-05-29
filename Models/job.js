const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jobSchema = new Schema({
    title: {
        type : String,
        required: true
    },
    companyName: {
        type : String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    locationType:{
        type: String,
        required: true
    },
    jobType:{
        type: String,
        required: true
    },
    skills:{
        type: String,
        required: true
    },
    refUserId:{
        type: String,
        ref: "User"
    },
    createdAt:{
        type: String,
        Default:Date.now
    },
    updatedAt:{
        type: String,
        Default:Date.now

    }
})

module.exports = mongoose.model("job",jobSchema);