import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { format, toZonedTime } from "date-fns-tz";
import { EUROPE_ZONE } from './../utils/defaults.js';
import { allowedIpLists } from './../helpers/utils.js';

dotenv.config();

const router = express.Router();
const healthCheckLimit = rateLimit({
    windowMs: 10 * 60 * 1000, // 10min
    max: 5,
    message: "Too many requests made, please try again later",
});
const localTimezone = 'GMT';

router.get('/status', healthCheckLimit, (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET');

    const clientIp = req.ip;
    const allowedIps = process.env.IP_ALLOWED_ADDRESSES?.split(',') ?? [];

    try {
        if (clientIp) {
            const result = allowedIpLists(allowedIps, clientIp);
            
            if (result.statusCode === 403) {
                return res.status(result.statusCode).send(result.message);
            }
        }
        
        const now = Date.now();
        const currentTimezone = toZonedTime(now, EUROPE_ZONE);
        
        const formattedTimezone = format(currentTimezone, `EEEE, dd MM yyyy HH:mm:ss ${localTimezone}`, {
            timeZone: localTimezone,
        });
        
        const healthStatus = {
            uptime: process.uptime(),
            message: "OK",
            date: formattedTimezone,
        };
        
        res.status(200).send(healthStatus);
    } catch(error) {
        return res.status(500).send("Internal Server Error");
    }
});

export default router;