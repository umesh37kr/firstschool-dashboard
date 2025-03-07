import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent } from "@/http/api";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types";
const formSchema = z.object({
  rollNumber: z.string(),
  firstName: z.string(),
  lastName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  dateOfBirth: z.string({
    required_error: "A date of birth is required.",
  }),
  gender: z.string(),
  classes: z.string(),
  section: z.string(),
  mobile: z.string(),
  address: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  avatar: z.instanceof(FileList).refine((file) => {
    return file.length == 1;
  }, "Profile image is required"),
});

const CreateStudent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rollNumber: undefined,
      firstName: "",
      lastName: "",
      mobile: undefined,
      dateOfBirth: "",
      gender: "",
      classes: "",
      section: "",
      address: "",
    },
  });

  const avatarRef = form.register("avatar");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      console.log("student created sucessfully");
      queryClient.invalidateQueries({ queryKey: ["studentList"] });
      console.log("student created sucessfully");
      toast({
        className: "bg-green-300",
        description: "student created sucessfully",
      });
      navigate("/dashboard/students");
    },
    onError: (Error: AxiosError<ErrorResponse>) => {
      console.log("error::", Error.response?.data.message);
      toast({
        variant: "destructive",
        description: `Error: ${Error.response?.data.message}`,
      });
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("rollNumber", values.rollNumber);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("gender", values.gender);
    formData.append("classes", values.classes);
    formData.append("section", values.section);
    formData.append("dateOfBirth", values.dateOfBirth);
    formData.append("mobile", values.mobile);
    formData.append("address", values.address);
    formData.append("avatar", values.avatar[0]);

    mutation.mutate(formData);
    console.log(values);
  }
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
              <BreadcrumbPage>New Student</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-10">
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input placeholder="roll number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FirstName</FormLabel>
                    <FormControl>
                      <Input placeholder="first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LastName</FormLabel>
                    <FormControl>
                      <Input placeholder="last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-16">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select Gender : </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">Boy</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">Girl</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="min-w-40">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-52 scrol">
                        <SelectItem value="1st">1st</SelectItem>
                        <SelectItem value="2nd">2nd</SelectItem>
                        <SelectItem value="3rd">3rd</SelectItem>
                        <SelectItem value="4th">4th</SelectItem>
                        <SelectItem value="5th">5th</SelectItem>
                        <SelectItem value="6th">6th</SelectItem>
                        <SelectItem value="7th">7th</SelectItem>
                        <SelectItem value="8th">8th</SelectItem>
                        <SelectItem value="9th">9th</SelectItem>
                        <SelectItem value="10th">10th</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="min-w-40">
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-52 scrol">
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-16">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <FormControl>
                      <Input placeholder="dd/mm/yyyy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Mobile nunber" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid w-1/2 gap-1.5">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="enter your address"
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-1/2 gap-1.5">
              <FormField
                control={form.control}
                name="avatar"
                render={() => (
                  <FormItem>
                    <FormLabel>Select Profile Image</FormLabel>
                    <FormControl>
                      <Input type="file" {...avatarRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">
              {mutation.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                ""
              )}
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateStudent;
