import express from 'express';
import isAuthenticated from '../middlewares/user.middleware.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';

const router = express.Router()

router.post('/postjob',isAuthenticated,postJob)
router.get('/getjobs',isAuthenticated,getAllJobs)
router.get('/getadminjobs',isAuthenticated,getAdminJobs)
router.get('/getjobById/:id',isAuthenticated,getJobById)

export default router;