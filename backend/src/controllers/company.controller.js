import companyModel from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/coudinary.js";

export async function registerCompany(req, res) {
  try {
    console.log("REQ BODY:", req.body);

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    const company = await companyModel.findOne({ name });
    if (company) {
      return res.status(400).json({
        message: "This company is already registered",
        success: false,
      });
    }

    const newCompany = await companyModel.create({
      name,
      userid: req.user._id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      success: true,
      company: newCompany,
    });

  } catch (err) {
    console.error("Error in registerCompany:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}




export async function getcompany(req, res) {
    try {

        const userId = req.id //loged in your id
        const companies = await companyModel.find({ userId });
        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "companies not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (err) {
        console.log("Error fetching companies",err);
        return res.status(500).json({
            message:"Internal server error",
            success: false
        })
    }

}
export async function getcompanyById(req, res) {
    try {
        const companyId = req.params.id;
        const company = await companyModel.findById(companyId)
        if (company) {
            return res.status(404).json({
                message: "company not found",
                success: true
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (err) {
        console.log(err);
    }

}


export async function updateCompany(req, res) {
    try {
        console.log("Incoming Update Request");
        console.log("Params ID:", req.params.id);
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        const { name, description, location, website } = req.body;
        const userId = req.user?.userId;

        let logo = null;
        if (req.file) {

            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updatedData = { name, description, location, website, userId };
        if (logo) updatedData.logo = logo;

        const company = await companyModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }

        return res.status(200).json({ success: true, message: "Company updated", company });
    } catch (error) {
        console.error("Update Error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error", error: error.message });
    }
}
