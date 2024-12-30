export interface RegisterUserResponse {
    status: boolean;
    showModal: boolean;
    message: string;
    token?: string;
    errorFields?: string[];
}

export type LoginUserResponse = RegisterUserResponse & {}

export interface ExternalProviderResponse {
    status: boolean;
    message: string;
    token?: string;
    data: object;
}