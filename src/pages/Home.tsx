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
import {
  MdOutlineDiversity1,
  MdOutlineDiversity3,
  MdOutlineMoney,
  MdWc,
} from "react-icons/md";
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
      <div className="flex flex-wrap justify-between gap-7">
        {/* student card */}
        <Card className="w-[200px] h-[100px] flex items-center justify-around bg-gray-50">
          <div className="w-20 h-20 rounded-full border-2 bg-green-100 flex justify-center items-center">
            <MdWc color="#41c353" size={"40px"} />
          </div>

          <div>
            <h1 className="text-gray-500 font-medium">Student</h1>
            <h1 className="text-gray-800 text-xl font-semibold">1200</h1>
          </div>
        </Card>

        {/* teacher card */}
        <Card className="w-[200px] h-[100px] flex items-center justify-around bg-gray-50">
          <div className="w-20 h-20 rounded-full border-2 bg-blue-200 flex justify-center items-center">
            <FaUserGroup color="#3e3ef0" size={"40px"} />
          </div>

          <div>
            <h1 className="text-gray-500 font-medium">Teacher</h1>
            <h1 className="text-gray-800 text-xl font-semibold">37</h1>
          </div>
        </Card>

        {/* parents card */}
        <Card className="w-[200px] h-[100px] flex items-center justify-around bg-gray-50">
          <div className="w-20 h-20 rounded-full border-2 bg-orange-100 flex justify-center items-center">
            <MdOutlineDiversity1 color="#ec9600" size={"40px"} />
          </div>

          <div>
            <h1 className="text-gray-500 font-medium">Parent</h1>
            <h1 className="text-gray-800 text-xl font-semibold">983</h1>
          </div>
        </Card>

        {/* earning card */}
        <Card className="w-[200px] h-[100px] flex items-center justify-around bg-gray-50">
          <div className="w-20 h-20 rounded-full border-2 bg-red-200 flex justify-center items-center">
            <MdOutlineMoney color="#ec2700" size={"40px"} />
          </div>

          <div>
            <h1 className="text-gray-500 font-medium">Earning</h1>
            <h1 className="text-gray-800 text-xl font-semibold">₹254000</h1>
          </div>
        </Card>
      </div>
    </>
  );
};

export default HomePage;
