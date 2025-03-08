import { CommentModel } from "@/types/features/comment";
import { TodoModel } from "@/types/features/todo";
import { TransactionModel } from "@/types/features/transaction";
import { Role, UserBase } from "@/types/user";

type Permissions = {
    transactions: {
        dataType: TransactionModel
        action: "view" | "create" | "update" | "delete"
    },
    todos: {
        dataType: TodoModel
        action: "view" | "create" | "update" | "delete"
    },
    comments: {
        dataType: CommentModel
        action: "view" | "create" | "update" | "delete"
    }
}

type PermissionCheck<Key extends keyof Permissions> = 
    | boolean
    | ((user: UserBase, data: Permissions[Key]["dataType"]) => boolean)

type RolesWithPermissions = {
    [R in Role]: Partial<{
        [Key in keyof Permissions]: Partial<{
            [Action in Permissions[Key]["action"]]: PermissionCheck<Key>
        }>
    }>
}

/**
 * Permission Role using the ABAC approach
 */
const ROLES = {
    admin: {
        transactions: {
            view: true,
            create: true,
            update: true,
        },
        todos: {
            view: true,
            create: true,
            update: true,
            delete: true,
        },
        comments: {
            view: true,
            create: true,
            update: true,
            delete: true,
        }
    },
    moderator: {
        todos: {
            view: true,
            create: true,
            update: true,
            delete: (user, todo) => user.id === todo.userId
        },
        comments: {
            view: true,
            create: true,
            update: true,
            delete: (user, comment) => user.id === comment.authorId
        }
    },
    user: {
        transactions: {
            view: true,
            create: true,
            update: (user, transaction) => 
                (user.id === transaction.userId || transaction.status !== "completed"),
            delete: (user, transaction) => transaction.userId === user.id
        },
        todos: {
            view: true,
            create: true,
            update: (user, todo) => 
                (user.id === todo.userId),
            delete: (user, todo) => 
                (user.id === todo.userId || todo.invitedUsers.includes(user.id)) && todo.completed,
        },
        comments: {
            view: (user, comment) => user.id === comment.authorId,
            create: true,
            update: (user, comment) => user.id === comment.authorId,
        },
    },
} as const satisfies RolesWithPermissions

/**
 * Check does the User have a permission based on his/her current role
 * 
 * @param {UserBase} user 
 * @param {Resource} resource 
 * @param {Permissions[Resource]["action"]} action 
 * @param {Permissions[Resource]["dataType"]} data 
 * @returns {Boolean | undefined}
 */
export function hasPermission<Resource extends keyof Permissions>(
    user: UserBase,
    resource: Resource,
    action: Permissions[Resource]["action"],
    data?: Permissions[Resource]["dataType"]
): boolean | undefined {
    return user.role?.some((role) => {
        const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action]

        if (permission == null) {
            return false;
        }

        if (typeof permission === "boolean") {
            return permission;
        }

        return data != null && permission(user, data);
    })
};
