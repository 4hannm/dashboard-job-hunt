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
            <TableCell>{item.user?.name ?? '-'}</TableCell>
            <TableCell>
              <ButtonActionTable url="" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Applicants;
