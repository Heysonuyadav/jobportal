import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/user.route.js';
import companyRoute from "./routes/company.route.js"
import jobroute from "./routes/job.route.js"
import applicantRoute from './routes/application.route.js';

const app = express();
import cors from 'cors';

import dotenv from "dotenv";
dotenv.config();

app.use(cors({origin:process.env.FRONTEND_URL,
  credentials:true}));
app.use(cookieParser())


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/user',router)
app.use('/company',companyRoute) 
app.use('/jobRoutes',jobroute)
app.use('/applicant',applicantRoute)

export default app;
