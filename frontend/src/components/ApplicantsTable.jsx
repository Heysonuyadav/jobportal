import { Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/Table.jsx"
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { APPLICATION_JOB_END_POINT } from "../uttils/constant";
import { Button } from "@/components/ui/button";

const statusOptions = [
    { value: "Pending", label: "Pending", color: "text-yellow-600" },
    { value: "Accepted", label: "Accept", color: "text-green-600" },
    { value: "Rejected", label: "Reject", color: "text-red-600" }
];

const ApplicantsTable = () => {
    
    const { applicants } = useSelector(state => state.applicants || {});
    
    const statusHandler = async (status, id) => {
       try {
            const res = await axios.post(
                `${APPLICATION_JOB_END_POINT}/status/${id}/update`,{ status },{ withCredentials: true });
            
            if (res.data.success) {
                toast.success(`Status updated to ${status}`);
               
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return "Invalid Date";
        }
    };

    
    if (!applicants || !applicants.applications || applicants.applications.length === 0) {
        return (
            <div className="p-6">
                <Table>
                    <TableCaption>A list of applicants</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-4">
                                No applicants found
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

    return (
        <div className="p-6">
            <Table>
                <TableCaption>A list of applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.applications.map((application) => (
                        <TableRow key={application._id}>
                            <TableCell className="font-medium">
                                {application.applicant?.fullname || "N/A"}
                            </TableCell>
                            <TableCell>{application.applicant?.email || "N/A"}</TableCell>
                            <TableCell>{application.applicant?.phone || "N/A"}</TableCell>
                            <TableCell>
                                {application.applicant?.profile?.resume ? (
                                    <a 
                                        href={application.applicant.profile.resume} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Resume
                                    </a>
                                ) : (
                                    <span className="text-gray-500">N/A</span>
                                )}
                            </TableCell>
                            <TableCell>{formatDate(application.createdAt)}</TableCell>
                            <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    application.status === "Accepted" 
                                        ? "bg-green-100 text-green-800" 
                                        : application.status === "Rejected"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                }`}>
                                    {application.status || "Pending"}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-2">
                                        <div className="flex flex-col space-y-1">
                                            {statusOptions.map((status) => (
                                                <Button
                                                    key={status.value}
                                                    variant="ghost"
                                                    className={`justify-start h-8 ${status.color} ${application.status === status.value? "bg-gray-100" : "" }`} onClick={() => statusHandler(status.value, application._id)}>
                                                    {status.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;