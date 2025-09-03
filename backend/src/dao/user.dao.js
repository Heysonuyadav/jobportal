import userModel from "../models/user.model";

export async function createuser(req,res) {
    return await userModel.create('')
    
}