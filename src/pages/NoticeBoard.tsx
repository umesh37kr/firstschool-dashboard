import { noticeList } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
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
import { Link } from "react-router-dom";
import { NoticeList } from "@/types";

const NoticeBoard = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["noticeList"],
    queryFn: noticeList,
    staleTime: 10000, // in Milli-seconds
  });
  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;
  const notices = data?.data.data;
  console.log("notices:", notices);

  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home"></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Notice Board</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Table>
        <TableCaption>A list of recent messages.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Notice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notices.map((notice: NoticeList) => (
            <TableRow key={notice._id}>
              <TableCell>{notice.notice}</TableCell>
              <TableCell>{notice.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default NoticeBoard;
