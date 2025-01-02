import dotenv from "dotenv";
import { COOKIE_SITE } from "../defines.js";

dotenv.config();

const isProdEnv = process.env.NODE_ENV === "prod";
const sessionMaxAge = isProdEnv ? (6000 * 60) : (30 * 24 * 60 * 60 * 1000);

export const cookieOption = {
    maxAge: sessionMaxAge,
    httpOnly: true,
    sameSite: isProdEnv ? COOKIE_SITE.NONE :COOKIE_SITE.LAX,
    secure: isProdEnv,
}