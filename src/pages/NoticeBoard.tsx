import { deleteNotice, noticeList } from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Skeleton } from "@/components/ui/skeleton";
import { NoticeList } from "@/types";
import * as React from "react";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@react-hook/media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types";
import CreateNotice from "@/components/pages/notice/CreateNotice";

const NoticeBoard = () => {
  const [open, setOpen] = React.useState(false);
  const [openNotice, setOpenNotice] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toast } = useToast();
  const [openRow, setOpenRow] = React.useState<string | null>(null);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noticeList"] });
      toast({
        className: "bg-green-300",
        description: "Notice deleted sucessfully",
      });
    },
    onError: (Error: AxiosError<ErrorResponse>) => {
      console.log("error::", Error.response?.data.message);
      toast({
        variant: "destructive",
        description: `Error: ${Error.response?.data.message}`,
      });
    },
  });
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["noticeList"],
    queryFn: noticeList,
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
  const notices = data?.data.data;
  const deleteHandler = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink>
              <Link to="/dashboard/home">Dashboard</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Notice Board</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpenNotice(true);
          }}
        >
          {" "}
          <UserPlus />
          Create Notice
        </Button>
      </div>

      {/* drawer for creating new notice */}
      {isDesktop && (
        <Dialog open={openNotice} onOpenChange={setOpenNotice}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Notice</DialogTitle>
              <DialogDescription>
                create new notice here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <CreateNotice />
          </DialogContent>
        </Dialog>
      )}
      {!isDesktop && (
        <Drawer open={openNotice} onOpenChange={setOpenNotice}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Create New Notice</DrawerTitle>
              <DrawerDescription>
                create new notice here. Click save when you're done.
              </DrawerDescription>
            </DrawerHeader>
            <CreateNotice />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      {/* drawer form for editing notice */}
      {isDesktop && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <CreateNotice />
          </DialogContent>
        </Dialog>
      )}
      {!isDesktop && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you're done.
              </DrawerDescription>
            </DrawerHeader>
            <CreateNotice />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
      <Table>
        <TableCaption>A list of recent messages.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Notice</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notices.map((notice: NoticeList) => (
            <TableRow key={notice._id}>
              <TableCell>{notice.notice}</TableCell>
              <TableCell>{notice.createdAt}</TableCell>
              <TableCell>
                <DropdownMenu
                  open={openRow === notice._id}
                  onOpenChange={(isOpen) =>
                    setOpenRow(isOpen ? notice._id : null)
                  }
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => {
                          setOpen(true); // Open the Drawer
                          setOpenRow(null); // Close the DropdownMenu
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => deleteHandler(notice._id)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default NoticeBoard;
