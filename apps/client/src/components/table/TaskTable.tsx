"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/lib/types/types";
import CancelTask from "./cells/CancelTask";
import CompleteTask from "./cells/CompleteTask";
import TaskCell from "./cells/TaskCell";
import StatusSelect from "./cells/StatusSelect";
import Options from "./cells/Options";
import NewTask from "./NewTask";
import TableSkeleton from "./skeleton/TableSkeleton";
import TimeSpent from "./cells/TimeSpent";
import { cn } from "@/lib/utils/utils";
import { Dispatch, SetStateAction, useState } from "react";
import TaskRow from "./TaskRow";

export default function TaskTable({
  data,
  tableLoading,
  setTaskActive,
  activeTaskId,
}: {
  data: Task[];
  tableLoading: boolean;
  setTaskActive: (taskId: Task["id"]) => void;
  activeTaskId: string | undefined;
}) {
  const rows = data
    .filter((data) => !data.isComplete)
    .map((task, index) => {
      return (
        //     <TableRow
        //       key={`${task.id}${index}`}
        //       className={cn(
        //         "relative",
        //         task.isComplete
        //           ? "bg-background-muted text-str text-zinc-500 line-through	"
        //           : "",
        //       )}
        //       onClick={() => setTaskActive(task.id)}
        //     >
        //       <TableCell className="hidden sm:table-cell">
        //         <div className="">
        //           {task.id === "-1" ? (
        //             <CancelTask task={task} />
        //           ) : (
        //             <CompleteTask task={task} />
        //           )}
        //         </div>
        //       </TableCell>
        //       <TableCell className="min-w-[315px] @[560px]:bg-red-400  md:max-w-[315px]">
        //         <TaskCell task={task} />
        //       </TableCell>
        //       {/* <TableCell>
        //   <Badge variant="outline">Draft</Badge>
        // </TableCell> */}
        //       <TableCell className="hidden md:table-cell">
        //         <StatusSelect task={task} />
        //       </TableCell>
        //       <TableCell className="hidden text-center md:table-cell">
        //         <TimeSpent
        //           timeToComplete={task.timeToComplete}
        //           timersComplete={task.timersComplete}
        //           taskId={task.id}
        //         />
        //       </TableCell>

        //       <TableCell>
        //         <Options task={task} />
        //         {activeTaskId === task.id ? (
        //           <span className=" absolute inset-y-0 right-0 z-10 my-auto h-full w-1 bg-[#7dd3fc] "></span>
        //         ) : null}
        //       </TableCell>
        //     </TableRow>
        <TaskRow
          key={`${task.id}${index}`}
          task={task}
          isActive={task.id === activeTaskId}
          setTaskActive={setTaskActive}
        />
      );
    });

  const completed = data
    .filter((data) => data.isComplete)
    .map((task, index) => {
      return (
        //     <TableRow
        //       key={`${task.id}${index}`}
        //       className={cn(
        //         "relative",
        //         task.isComplete
        //           ? "bg-background-muted text-str text-zinc-500 line-through	"
        //           : "",
        //       )}
        //       onClick={() => setTaskActive(task.id)}
        //     >
        //       <TableCell className="hidden sm:table-cell">
        //         <div className="">
        //           {task.id === "-1" ? (
        //             <CancelTask task={task} />
        //           ) : (
        //             <CompleteTask task={task} />
        //           )}
        //         </div>
        //       </TableCell>
        //       <TableCell className="min-w-[315px] @[560px]:bg-red-400  md:max-w-[315px]">
        //         <TaskCell task={task} />
        //       </TableCell>
        //       {/* <TableCell>
        //   <Badge variant="outline">Draft</Badge>
        // </TableCell> */}
        //       <TableCell className="hidden md:table-cell">
        //         <StatusSelect task={task} />
        //       </TableCell>
        //       <TableCell className="hidden text-center md:table-cell">
        //         <TimeSpent
        //           timeToComplete={task.timeToComplete}
        //           timersComplete={task.timersComplete}
        //           taskId={task.id}
        //         />
        //       </TableCell>

        //       <TableCell>
        //         <Options task={task} />
        //         {activeTaskId === task.id ? (
        //           <span className=" absolute inset-y-0 right-0 z-10 my-auto h-full w-1 bg-[#7dd3fc] "></span>
        //         ) : null}
        //       </TableCell>
        //     </TableRow>
        <TaskRow
          key={`${task.id}${index}`}
          task={task}
          isActive={task.id === activeTaskId}
          setTaskActive={setTaskActive}
        />
      );
    });

  return (
    // <div className="@container">
    <>
      <Table className="rounded-md border bg-popover backdrop-blur-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[50px] sm:table-cell">
              <span className="sr-only">Complete Task</span>
            </TableHead>
            <TableHead>Task</TableHead>
            {/* <TableHead>tag</TableHead> */}
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Time</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableLoading ? <TableSkeleton /> : rows}
          <TableRow>
            <TableCell className="px-1 " colSpan={5}>
              <NewTask />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {completed.length > 0 && (
        <>
          <h3 className="mb-2 ml-2 mt-4">Complete</h3>
          <Table className="rounded-md border bg-popover backdrop-blur-sm">
            <TableBody>
              {tableLoading ? <TableSkeleton /> : completed}
            </TableBody>
          </Table>
        </>
      )}
    </>
    // </div>
  );
}
