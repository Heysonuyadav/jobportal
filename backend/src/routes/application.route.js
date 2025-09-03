import express from "express";
import isAuthenticated from "../middlewares/user.middleware.js";
import { AplyJob, getApplicant, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";


const router = express.Router();
 router.post("/apply/:id",isAuthenticated,AplyJob)
 router.get('/getjobs',isAuthenticated,getAppliedJobs)
 router.get('/:id/applicant',isAuthenticated,getApplicant)
 router.post('/status/:id/update',isAuthenticated,updateStatus)


export default router;