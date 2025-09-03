import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from "../config/config.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/coudinary.js";




export async function register(req, res) {
    try {
        const { fullname, email, phone, password, role } = req.body;

        if (!fullname || !email || !phone || !password || !role) {
            return res.status(400).json({
                message: "something is missing here",
                success: false,
            });
        }

        // file upload (optional)
        let profilePhotoUrl = null;
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: "my_folder"
            });
            console.log("Uploaded =>", cloudResponse.secure_url);
            profilePhotoUrl = cloudResponse.secure_url;
        }

        // email check
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'user already exist with this email.',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            fullname,
            email,
            phone,
            password: hashedPassword,
            role,
            profile: {
                profilephoto: profilePhotoUrl, // null if not uploaded
            }
        });

        return res.status(201).json({
            message: "Account Register successfully",
            success: true
        });
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return res.status(500).json({ success: false, message: "Upload failed" });
    }
}


export async function login(req, res) {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "incorrect email or password",
                success: false,
            })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const ispassWordmatch = await bcrypt.compare(password, user.password);
        if (!ispassWordmatch) {
            return res.status(400).json({
                message: "incorrect email or password",
                success: false,
            })
        }
        if (role !== user.role) {
            return res.status(400).json({
                message: 'Account is not exist with current role',
                success: false,
            })
        }
        const tokenData = {
            userId: user._id,

        }
        const token = jwt.sign(tokenData, config.JWT_SECRET, { expiresIn: '1d' });


        const userInfo = {
            _id: user._id,
            fullname: user.fullname,
            phone: user.phone,
            email: user.email,
            role: user.role,
            profile: user.profile


        }

        return res.status(200).cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        }).json({
            message: `welcome back ${userInfo.fullname}`,
            user,
            success: true,
        })
    }
    catch (err) {
        console.log(err)
    }
}

export async function logOut(req, res) {
    try {
        return res.status(200).cookie('token', "", { maxAge: 0 }).json({
            message: 'logedOut successfully',
            success: true
        })
    }
    catch (err) {
        console.log(err)
    }
}

export async function updateProfile(req, res) {
    try {
console.log("Cloudinary Config =>", cloudinary.config());

        const { fullname, email, phone, bio, skills } = req.body
        const file = req.file

        //cloudinary components

        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }



        let skillsArray;
        if (skills) {

            skillsArray = skills.split(",");
        }
        const userId = req.user?._id
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized. User ID not found.",
                success: false,
            });
        }
        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false
            })
        }
        if (!user.profile) user.profile = {};

        if (fullname) user.fullname = fullname
        if (phone) user.phone = phone
        if (email) user.email = email
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // resume comes later here 
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url // save cloudinary uri
            user.profile.resumeoriginalname = file.originalname // save the original file name 
        }

        await user.save();
        const updateUser = {
            _id: user._id,
            fullname: user.fullname,
            phone: user.phone,
            email: user.email,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: "profile updated successfully",
            user: updateUser,
            success: true,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "internal server error",
            success: false,
        })
    }

}
