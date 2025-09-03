import express from "express";
import isAuthenticated from "../middlewares/user.middleware.js";
import {getcompany, getcompanyById, registerCompany, updateCompany} from "../controllers/company.controller.js";
import singleUpload from "../middlewares/multer.middleware.js";

const router = express.Router();
router.post('/companyregister',isAuthenticated,registerCompany)
router.get('/getcompany',isAuthenticated,getcompany)
router.get('/get/:id',isAuthenticated,getcompanyById)
router.put('/update/:id',isAuthenticated,singleUpload,updateCompany)

export default router; 