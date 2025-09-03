import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SingUp from './components/SingUp';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profileui from './components/Profileui';
import JobDescription from './components/JobDescription';
import { Toaster } from 'react-hot-toast';
import Companies from './components/admin/Companies'; 
import CompaniesCreate from './components/admin/CompaniesCreate'
import CompaniesSetup from './components/admin/CompaniesSetup'
import Job from './components/Job';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/Applicants';
import ProtectedRoute from './components/admin/protectedRoute';




const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>

  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'/signUp',
    element:<SingUp />
  },
  {path:'/jobs',
  element:<Jobs />
},
{
  path:'/browse',
  element:<Browse />
},
{
  path:'/profile',
  element:<profi />
},
{
  path:'/profileui',
  element:<Profileui />
},
{
  path:'description/:id',
  element:<JobDescription />
},
{
  path:"/admin/companies",
  element:<ProtectedRoute><Companies/></ProtectedRoute>
  
},
{
  path:"admin/companies/create",
  element:<CompaniesCreate />
},
{
  path:"admin/companies/:id",
element:<CompaniesSetup />
},
{
  path:"/components/Job",
element:<Job />
},
{
  path:"/admin/Jobs",
  element:<AdminJobs />
},
{
path:"/admin/jobs/create",
element:<PostJob />
},
{
  path:"/admin/jobs/:id/applicants",
  element:<Applicants />
}
])

const App = () => {
  return (
    <div>
    <RouterProvider  router={appRouter}/>
  <Toaster position="top-right" reverseOrder={false} />


    </div>
  )
}

export default App
