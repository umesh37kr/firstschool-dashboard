import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { FaUserGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/dashboard/home">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="">
        <Card className="w-[200px] h-[100px] flex items-center justify-around bg-gray-50">
          <div className="w-20 h-20 rounded-full border-2 bg-green-200 flex justify-center items-center">
            <FaUserGroup color="#41c353" size={"30px"} />
          </div>

          <div>
            <h1 className="text-gray-500 font-medium">Student</h1>
            <h1 className="text-gray-800 text-xl font-semibold">1200</h1>
          </div>
        </Card>
      </div>
    </>
  );
};

export default HomePage;
