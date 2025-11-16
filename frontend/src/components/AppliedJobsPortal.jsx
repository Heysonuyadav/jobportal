import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table"
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'

const AppliedJobsPortal = () => {
    const { AppliedJobsPortal } = useSelector(store => store.job);

    return (
        <div className="p-4 overflow-x-auto">
            <Table className="min-w-[800px] text-sm">
                <TableCaption>A List of Newly Applied Jobs</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Selected</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {(!AppliedJobsPortal || AppliedJobsPortal.length === 0) ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                                You haven't applied to any job yet
                            </TableCell>
                        </TableRow>
                    ) : (
                        AppliedJobsPortal.map((appliedJobs) => (
                            <TableRow key={appliedJobs._id}>
                                <TableCell>
                                    {appliedJobs.createdAt.split("T")[0]}
                                </TableCell>

                                <TableCell className="break-words max-w-[180px]">
                                    {appliedJobs.job.title}
                                </TableCell>

                                <TableCell className="break-words max-w-[200px]">
                                    {appliedJobs.job.company.name}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        className={`${
                                            appliedJobs.status === "rejected"
                                                ? "bg-red-400"
                                                : appliedJobs.status === "pending"
                                                ? "bg-zinc-500"
                                                : "bg-green-400"
                                        } text-white`}
                                    >
                                        {appliedJobs.status.toUpperCase()}
                                    </Badge>
                                </TableCell>

                                <TableCell>-</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobsPortal;
