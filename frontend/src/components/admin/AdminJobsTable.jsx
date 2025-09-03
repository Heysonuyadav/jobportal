import { Table, TableCaption, TableRow, TableHeader, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const { searchCompanyByText } = useSelector(store => store.company);
  const { allAdminJobs } = useSelector(store => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs || []);
  const loading = useGetAllCompanies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!allAdminJobs) return;

    const filtered = allAdminJobs.filter((job) => {
      if (!searchCompanyByText) {
        return true;
      }

      return job?.company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase()) ||
        job?.title?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });

    setFilteredJobs(filtered);
  }, [allAdminJobs, searchCompanyByText]); // fixed dependencies

  return (
    <div className='mt-10 font-bold gap-10'>
      <Table>
        <TableCaption>A list of your recent posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                {loading ? "Loading..." : "No jobs found"}
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={job?.company?.logo} />
                    <AvatarFallback>{job?.company?.name?.[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>
                  {job?.createdAt ? job.createdAt.split("T")[0] : 'N/A'}
                </TableCell>
                <TableCell className='text-right cursor-pointer'>
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className='w-40 space-y-2'>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                        className='w-fit cursor-pointer flex items-center gap-2 p-1 hover:bg-gray-100 rounded'
                      >
                        <Edit2 className='w-4' />
                        <span>Edit Job</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className='flex items-center w-fit gap-2 cursor-pointer p-1 hover:bg-gray-100 rounded'
                      >
                        <Eye className='w-4' />
                        <span>View Applicants</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/companies/${job.company?._id}`)}
                        className='w-fit cursor-pointer flex items-center gap-2 p-1 hover:bg-gray-100 rounded'
                      >
                        <Edit2 className='w-4' />
                        <span>Edit Company</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;