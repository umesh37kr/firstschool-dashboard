import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { studentList } from "@/http/api";
import { Students } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CircleUserRound } from "lucide-react";

const Student = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["studentList"],
    queryFn: studentList,
    staleTime: 10000, // in Milli-seconds
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;
  console.log(data);
  const students = data?.data.students;
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Avatar</TableHead>
          <TableHead>Roll No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Section</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Date Of Birth</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student: Students) => (
          <TableRow key={student._id}>
            <TableCell>
              {student.avatar ? (
                <img
                  src={student.avatar}
                  alt={student.firstName}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <CircleUserRound />
              )}
            </TableCell>
            <TableCell>{student.rollNumber}</TableCell>
            <TableCell>{student.firstName}</TableCell>
            <TableCell>{student.classes}</TableCell>
            <TableCell>{student.section}</TableCell>
            <TableCell>{student.gender}</TableCell>
            <TableCell>{student.dateOfBirth}</TableCell>
            <TableCell>{student.createdAt}</TableCell>
            <TableCell>{student.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Student;
