const job = require('../Models/job');

const createJob = async(req, res, next)=>{

try{
    const {
        title,
        companyName,
        location,
        salary,
        description,
        locationType,
        jobType,
        skills,
    } = req.body;

    if(!title ||
        !companyName||
        !location ||
        !salary ||
        !description ||
        !locationType ||
        !jobType ||
        !skills 
    ){
        return res.status(400).send("parameter is missing");
    }

    const skillsArray = skills.split(",").map((skill) => skill.trim());

    const newjob = new job({
        title,
        companyName,
        location,
        salary,
        description,
        locationType,
        jobType,
        skills:skillsArray,
        refUserId:req.userId,
        createdAt:new Date(),
        updatedAt: new Date();
    });
    await newjob.save();
    res.status(201).send("job created successfully");
}
catch(err){
    next(err);
}
};

module.exports = {createJob};