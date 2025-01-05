import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { studentList } from "@/http/api";
import { Students } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CircleUserRound, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Student = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["studentList"],
    queryFn: studentList,
    staleTime: 10000, // in Milli-seconds
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (isError) return <div>Error: {error.message}</div>;
  console.log(data);
  const students = data?.data.students;
  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/dashboard/home">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Student</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Link to={"/dashboard/new-student"}>
          <Button variant={"outline"}>
            {" "}
            <UserPlus />
            Add Student
          </Button>
        </Link>
      </div>
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
              <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
              <TableCell>{student.classes}</TableCell>
              <TableCell>{student.section}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.dateOfBirth}</TableCell>
              <TableCell>{student.createdAt}</TableCell>
              <TableCell>{student.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Student;
