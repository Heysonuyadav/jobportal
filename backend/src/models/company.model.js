import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        trim:true 
    },
    description: {
        type: String,
       
    },

    location: {
        type: String,
       
        
    },
    industry: {
        type: String,
       
        default:null
    },
    website: {
        type: String,
       
    },
    logo: {
        type: String,
       
        default:true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usermodel',
        required: true,
    },


},{ timestamps: true });

const companyModel = mongoose.model('Company', companySchema);

export default companyModel;