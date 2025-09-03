import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'

const AppliedJobsPortal = () => {
    const { AppliedJobsPortal } = useSelector(store => store.job);
    return (
        <div>
            <Table>
                <TableCaption>A List New Job Applied</TableCaption>
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
                    {
                        AppliedJobsPortal?.length <= 0 ? <span>You Haven't applied any job yet</span> : AppliedJobsPortal?.map((appliedJobs) => {
                            <TableRow key={appliedJobs._id}>
                                <TableCell>{appliedJobs.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{appliedJobs.job.title}</TableCell>
                                <TableCell>{appliedJobs.job.company.name}</TableCell>
                                <TableCell className='text-right'><Badge className={`${appliedJobs?.status ==="rejected" ? 'bg-red-400':appliedJobs.status === 'pending' ? 'bg-zinc-500' : 'bg-green-400'}`}>{appliedJobs.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobsPortal
