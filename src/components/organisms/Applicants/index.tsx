import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JOB_APPLICANTS_COLUMNS } from "@/constants";
import ButtonActionTable from "../ButtonActionTable";
import { Applicant, User } from "@prisma/client";

interface ApplicantsProps {
  applicants: (Applicant & { user: User | null })[];
}

const Applicants: FC<ApplicantsProps> = ({ applicants }) => {
  return (
    <div className="w-full">
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              {JOB_APPLICANTS_COLUMNS.map((item: string, i: number) => (
                <TableHead key={item + i}>{item}</TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((item, i) => (
              <TableRow key={item.id + i}>
                <TableCell>{item.user?.name ?? "-"}</TableCell>
                <TableCell>
                  <ButtonActionTable url="" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="sm:hidden flex flex-col gap-4">
        {applicants.map((item, i) => (
          <div
            key={item.id + i}
            className="border p-4 rounded-lg shadow-sm flex flex-col gap-2 bg-white"
          >
            <div className="text-sm text-gray-500">Name</div>
            <div className="text-base font-medium">
              {item.user?.name ?? "-"}
            </div>
            <div className="mt-2">
              <ButtonActionTable url="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applicants;
