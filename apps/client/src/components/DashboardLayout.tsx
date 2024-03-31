import React from "react";
import { TodoTable } from "./table/TodoTable";
import { Timer } from "./Timer";
import Chat from "./chat/Chat";
import { Payment, columns } from "@/components/table/columns";
import { data } from "@/components/table/sample_data";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen flex-row flex-wrap-reverse items-center justify-between">
      <div className="min-w-[300px]">
        <TodoTable columns={columns} data={data} />
      </div>
      <Timer />
      <Chat />
    </div>
  );
};

export default DashboardLayout;
