export declare function createTask(ownerId: string, payload: any): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    status: import(".prisma/client").$Enums.TaskStatus;
    ownerId: string;
}>;
export declare function listTasks(userId: string, role: "USER" | "ADMIN"): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    status: import(".prisma/client").$Enums.TaskStatus;
    ownerId: string;
}[]>;
export declare function getTaskById(taskId: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    status: import(".prisma/client").$Enums.TaskStatus;
    ownerId: string;
} | null>;
export declare function updateTask(taskId: string, payload: any): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    status: import(".prisma/client").$Enums.TaskStatus;
    ownerId: string;
}>;
export declare function deleteTask(taskId: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    status: import(".prisma/client").$Enums.TaskStatus;
    ownerId: string;
}>;
//# sourceMappingURL=tasks.service.d.ts.map