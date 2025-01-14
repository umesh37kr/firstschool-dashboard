import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlineDiversity1, MdOutlineMoney, MdWc } from "react-icons/md";
import { Link } from "react-router-dom";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { browser: "male", visitors: 175, fill: "var(--color-chrome)" },
  { browser: "female", visitors: 107, fill: "var(--color-firefox)" },
];
const chartConfig = {
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;
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
      {/* pie chart for gender */}
      <Card className="flex flex-col w-1/2">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-xl">Students</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={68}
                outerRadius={110}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex justify-around">
          <div>
            <h2 className="text-gray-500 font-medium">Female Student</h2>
            <p className="font-medium">10230</p>
          </div>
          <div>
            <h2 className="text-gray-500 font-medium">Male Student</h2>
            <p className="font-medium">1230</p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default HomePage;
