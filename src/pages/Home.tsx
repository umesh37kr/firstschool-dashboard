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
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
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
import { TrendingUp } from "lucide-react";
const chartData = [
  { browser: "male", visitors: 175, fill: "var(--color-female)" },
  { browser: "female", visitors: 207, fill: "var(--color-male)" },
];
const chartConfig = {
  female: {
    label: "Female",
    color: "#ffaa01",
  },
  male: {
    label: "Male",
    color: "#417dfc",
  },
} satisfies ChartConfig;

const barChartData = [
  { month: "January", collection: 39600 },
  { month: "February", collection: 30500 },
  { month: "March", collection: 50000 },
  { month: "April", collection: 85000 },
  { month: "May", collection: 45000 },
  { month: "June", collection: 78000 },
  { month: "July", collection: 57000 },
  { month: "August", collection: 53000 },
  { month: "September", collection: 25000 },
  { month: "October", collection: 90000 },
  { month: "November", collection: 68000 },
  { month: "December", collection: 75000 },
];

const barChartConfig = {
  collection: {
    label: "Collection",
    color: "hsl(var(--chart-1))",
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
      <div className="flex gap-4">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle className="text-lg">Students</CardTitle>
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
              <h2 className="text-gray-500 text-sm font-medium">
                Female Student
              </h2>
              <div className="h-2 w-14 mt-2 mb-2 rounded-md bg-blue-500"></div>
              <p className="font-medium">10230</p>
            </div>
            <div>
              <h2 className="text-gray-500 text-sm font-medium">
                Male Student
              </h2>
              <div className="h-2 w-14 mt-2 mb-2 rounded-md bg-yellow-500"></div>
              <p className="font-medium">1230</p>
            </div>
          </CardFooter>
        </Card>
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle className="text-lg">Notice Board</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="">
              <h1 className="font-medium bg-teal-400 w-36 rounded-full p-1 text-white text-center">
                16 june 2024
              </h1>
              <br />
              <p className="font-normal">
                this is to inform that exam is reschduled 1 week later
              </p>
              <hr className="mb-3 mt-3" />
            </div>
            <div className="">
              <h1 className="font-medium bg-yellow-400 w-36 rounded-full p-1 text-white text-center">
                16 june 2024
              </h1>
              <br />
              <p className="font-normal">
                this is to inform that exam is reschduled 1 week later
              </p>
              <hr className="mb-3 mt-3" />
            </div>
            <div className="">
              <h1 className="font-medium bg-rose-500 w-36 rounded-full p-1 text-white text-center">
                16 june 2024
              </h1>
              <br />
              <p className="font-normal">
                this is to inform that exam is reschduled 1 week later
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        {/* bar chart */}
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart - Label</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barChartConfig}>
              <BarChart
                accessibilityLayer
                data={barChartData}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="collection"
                  fill="var(--color-collection)"
                  radius={8}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Fees collection up by 5.2% this month{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default HomePage;
