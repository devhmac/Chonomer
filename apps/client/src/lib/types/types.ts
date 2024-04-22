export type Task = {
  id: string;
  task: string;
  descripton: string;
  status: "COMPLETE" | "INPROGRESS" | "BACKLOG" | "BLOCKED";
  isActive: boolean;
  subTasks: Task[];
  timeToComplete: number;
  order: number;
  createdAt: Date;
  isComplete: boolean;
  completedAt: Date | null;
  timersComplete: number;
};