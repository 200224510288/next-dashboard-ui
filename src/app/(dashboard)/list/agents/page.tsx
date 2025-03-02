import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Agent, Agent_Contact_Number, Prisma, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ITEM_PER_PAGE } from "@/lib/settings";
import FormModal from "@/components/FormModal";

type AgentList = Agent & { User: User; Agent_Contact_Number: Agent_Contact_Number[] };

const AgentListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.AgentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.FirstName = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  // use for split items into pages
  const [data, count] = await prisma.$transaction([
    prisma.agent.findMany({
      where: query,
      include: {
        User: true, // Including the User model in the query
        Agent_Contact_Number: true, // Include contact numbers

      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.agent.count(),
  ]);

  const columns = [
    { header: "Agent Name", accessor: "agent" },
    { header: "Email", accessor: "User.Email", className: "hidden md:table-cell" },
    { header: "User Name", accessor: "User.UserName", className: "hidden md:table-cell" },
    { header: "Password", accessor: "User.Password", className: "hidden md:table-cell" },
    { header: "Contact Numbers", accessor: "contactNumbers", className: "hidden md:table-cell" },
    { header: "Office Address", accessor: "OfficeAddress", className: "hidden md:table-cell" },
    { header: "Home Address", accessor: "HomeAddress", className: "hidden md:table-cell" },
    { header: "City", accessor: "City", className: "hidden md:table-cell" },
    ...(role === "office_staff"
      ? [
          {
            header: "Actions",
            accessor: "actions",
          },
        ]
      : []),
  ];

  const renderRow = (item: AgentList) => (
    <tr key={item.AgentID} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight">
      <td className="flex items-center gap-5 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.FirstName || "N/A"} {item.LastName || "N/A"}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.User.Email || "N/A"}</td>
      <td className="hidden md:table-cell">{item.User.UserName || "N/A"}</td>
      <td className="hidden md:table-cell">{item.User.Password || "N/A"}</td>
      <td className="hidden md:table-cell">
        {item.Agent_Contact_Number && item.Agent_Contact_Number.length > 0 
          ? item.Agent_Contact_Number.map((cn) => cn.ContactNumber).join(", ") 
          : "N/A"}
      </td>
      <td className="hidden md:table-cell">{item.OfficeAddress || "N/A"}</td>
      <td className="hidden md:table-cell">{item.HomeAddress || "N/A"}</td>
      <td className="hidden md:table-cell">{item.City || "N/A"}</td>
      <td>
        <div className="flex items-center gap-2">
          {/* Pass the correct data (specific agent) */}
          <FormModal table="agent" type="update" id={item.AgentID} data={item} />
  
          {/* Delete Modal */}
          <FormModal table="agent" type="delete" id={item.AgentID} />
        </div>
      </td>
    </tr>
  );
  

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Agents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center bg-Yellow rounded-full">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-Yellow rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>

        
              <FormModal table="agent" type="create" />
       
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* Pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AgentListPage;
