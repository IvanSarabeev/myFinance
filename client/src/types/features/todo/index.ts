import { FeatureStatusTypes } from "../defaults";

/**
 * Base Todo Model - To be added 
 */
export type TodoModel = {
    id: string;
    title: string;
    userId: string;
    status: FeatureStatusTypes;
    completed: boolean;
    invitedUsers: string[],
    blockedBy: string[],
    createdAt: Date;
    updatedAt?: Date;
    dueDate?: Date;
}