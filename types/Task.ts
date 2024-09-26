export type TaskStatus = "completed" | "in_progress" | "cancelled";

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: Date;
}