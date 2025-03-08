import { UserFingerPrint } from "..";

/**
 * Base Provider for 3th Party Authentication
 */
interface BaseApiDataProvider {
    name: string | null;
    email: string | null;
    photo: string | null;
    fingerPrint: UserFingerPrint;
};

export type GoogleAuthentication = Required<BaseApiDataProvider>;
export type GitHubAuthentication = Required<BaseApiDataProvider>;