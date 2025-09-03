import Job from '../models/job.model.js'
export async function postJob(req, res) {
    try {
        const { title, description, companyId, application, experience, requirements, salary, location, jobtype, position } = req.body;
        const userId = req._id;

        if (!title || !description || !companyId || !application || !requirements || !salary || !location || !jobtype || !position || !experience) {
            return res.status(400).json({
                message: "something is missing",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            companyId,
            createdby: userId,
            application,
            experience,
            requirements: requirements.split(',').map(r => r.trim()),
            salary: Number(salary),
            location,
            jobtype,
            position
        });

        console.log("job created:", job); // DEBUG

        const populatedJob = await Job.findById(job._id).populate("companyId");

        return res.status(201).json({
            message: "job created successfully",
            job: populatedJob,
            success: true
        });

    } catch (err) {
        console.error("Post Job Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

export async function getAllJobs(req, res) {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate("companyId");

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Jobs fetched successfully",
            jobs,
            success: true
        });

    } catch (err) {
        console.error("getAllJobs Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}


export async function getAdminJobs(req, res) {
    try {
        
        const adminId = req.user._id;
        console.log("Admin ID:", adminId);

        const jobs = await Job.find({ createdby: adminId }).populate("companyId").populate({
            path:'company'
        })
        if (!jobs) {
            return res.status(404).json({
                message: "jobs not found",
                success: true
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (err) {
        console.error("getAdminJobs Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }

}

export async function getJobById(req, res) {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (err) {
        console.log(err)
    }

}
