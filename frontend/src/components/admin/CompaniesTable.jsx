import {
  Table,
  TableCaption,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/Table';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const loading = useGetAllCompanies();
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="mt-6 font-bold gap-10">

      {/* Responsive Scroll */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableCaption>A list of your recent registered companies</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px]">Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCompanies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-sm">
                  {loading ? "Loading..." : "No companies found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredCompanies.map((company) => (
                <TableRow
                  key={company._id}
                  className="hover:bg-muted/40 transition"
                >
                  <TableCell>
                    <Avatar className="h-10 w-10 md:h-12 md:w-12">
                      <AvatarImage src={company.logo} />
                      <AvatarFallback>{company.name[0]}</AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell className="text-sm md:text-base">
                    <span className="break-words">{company.name}</span>
                  </TableCell>

                  <TableCell className="text-sm">
                    {company.createdAt ? company.createdAt.split("T")[0] : 'N/A'}
                  </TableCell>

                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="w-5 md:w-6" />
                      </PopoverTrigger>

                      <PopoverContent className="w-36">
                        <div
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
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
}

export default CompaniesTable;
