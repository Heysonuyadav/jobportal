import {
  Table,
  TableCaption,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/Table';
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
      if (!searchCompanyByText) return true;

      return (
        job?.company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase()) ||
        job?.title?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      );
    });

    setFilteredJobs(filtered);
  }, [allAdminJobs, searchCompanyByText]);

  return (
    <div className="mt-6 font-semibold overflow-x-auto rounded-lg border bg-white shadow-sm">

      {/* Responsive Wrapper */}
      <div className="min-w-[700px] md:min-w-full">

        <Table>
          <TableCaption className="text-sm md:text-base">
            A list of your recently posted jobs
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="text-xs md:text-sm">Logo</TableHead>
              <TableHead className="text-xs md:text-sm">Company</TableHead>
              <TableHead className="text-xs md:text-sm">Job Title</TableHead>
              <TableHead className="text-xs md:text-sm">Date</TableHead>
              <TableHead className="text-right text-xs md:text-sm">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  {loading ? "Loading..." : "No jobs found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job) => (
                <TableRow key={job._id} className="hover:bg-gray-50">

                  {/* Company Logo */}
                  <TableCell>
                    <Avatar className="h-10 w-10 md:h-12 md:w-12">
                      <AvatarImage src={job?.company?.logo} />
                      <AvatarFallback>
                        {job?.company?.name?.[0] || "C"}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  {/* Company Name */}
                  <TableCell className="text-xs md:text-sm">
                    {job?.company?.name}
                  </TableCell>

                  {/* Job Title */}
                  <TableCell className="text-xs md:text-sm">
                    {job?.title}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-xs md:text-sm">
                    {job?.createdAt ? job.createdAt.split("T")[0] : 'N/A'}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer" />
                      </PopoverTrigger>

                      <PopoverContent className="w-40 space-y-2 p-2 text-sm">

                        {/* Edit Job */}
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                          className="flex items-center gap-2 p-2 cursor-pointer rounded hover:bg-gray-100"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit Job</span>
                        </div>

                        {/* View Applicants */}
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          className="flex items-center gap-2 p-2 cursor-pointer rounded hover:bg-gray-100"
                        >
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>

                        {/* Edit Company */}
                        <div
                          onClick={() => navigate(`/admin/companies/${job.company?._id}`)}
                          className="flex items-center gap-2 p-2 cursor-pointer rounded hover:bg-gray-100"
                        >
                          <Edit2 className="w-4" />
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
    </div>
  );
};

export default AdminJobsTable;
