import { COOKIE_SITE } from "../defines.js";
import { NODE_ENV } from "./env.js";

const isProdEnv = NODE_ENV === "prod";
const sessionMaxAge = isProdEnv ? (6000 * 60) : (30 * 24 * 60 * 60 * 1000);

const {STRICT, LAX} = COOKIE_SITE;

export const cookieOption = {
    maxAge: sessionMaxAge,
    httpOnly: true,
    sameSite: isProdEnv ? STRICT : LAX,
    secure: isProdEnv,
}