type Status = "completed" | "active" | "expired" | "declined"

export type Transaction = {
    id: string;
    body: string;
    userId: string;
    status: Status;
    blockedBy: string[],
    createdAt: Date;
    updatedAt?: Date;
    dueDate?: Date;
}

export type Todo = {
    id: string;
    title: string;
    userId: string;
    status: Status;
    completed: boolean;
    invitedUsers: string[],
    blockedBy: string[],
    createdAt: Date;
    updatedAt?: Date;
    dueDate?: Date;
}

export type Comment = {
    id: string;
    body: string;
    authorId: string;
    createdAt: string;
    updatedAt?: Date;
}