import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/user.route.js';
import companyRoute from "./routes/company.route.js"
import jobroute from "./routes/job.route.js"
import applicantRoute from './routes/application.route.js'
const app = express();
import cors from 'cors';

import dotenv from "dotenv";
dotenv.config();

app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/user',router)
app.use('/company',companyRoute) 
app.use('/jobRoutes',jobroute)
app.use('/applicant',applicantRoute)

export default app;
