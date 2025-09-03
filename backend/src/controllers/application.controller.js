import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export async function AplyJob(req, res) {
    try {

        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "job id is required",
                success: false
            });

        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "you have already aplied for this job",
                success: false
            })
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        }
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applicant.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "job created successfully",
            success: true,
        })

    } catch (err) {
        console.log(err)
    }

}

export async function getAppliedJobs(req, res) {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',  
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'companyId',
                    model: "Company",
                    options: { sort: { createdAt: -1 } }
                }
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No Applications Found",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true,
            message: "Applications fetched successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export async function getApplicant(req, res) {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'application',
            options: { sort:{ createdAt: -1 }  },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: 'job not found',
                success: false
            })

        }
        return res.status(200).json({
            job,
            success: true,
            message:"not applied"
        })
    } catch (err) {
        console.log(err)
    }

}
export async function updateStatus(req, res) {
    try {
        console.log("Body received =>", req.body);

        const { status } = req.body;
        const applicanttionId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false
            })
        }

        const Application = await Application.findOne({ _id: applicanttionId });
        if (!Application) {
            return res.status(404).json({
                message: "Appliaction not found",
                success: false
            })

        }
        Application.status = status.toLowerCase();
        await Application.save();

        return res.status(400).json({
            message: 'status update successfully',
            success: true
        })

    } catch (err) {
        console.log(err)
    }
}