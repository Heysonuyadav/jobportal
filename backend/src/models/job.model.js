
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    requirements: {
        type: [String],
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobtype: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userId',
        
    },
    // application: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Application',
    // },
    experience:{
        type:String,
        required:true
    }

},{ timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;