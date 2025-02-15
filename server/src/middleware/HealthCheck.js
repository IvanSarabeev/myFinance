/* eslint-disable no-undef */
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { format, toZonedTime } from "date-fns-tz";
import { EUROPE_ZONE, HTTP_RESPONSE_STATUS } from './../defines.js';
import { allowedIpLists } from './../helpers/utils.js';
import { REMOVE_LEADING_TRAILING_QUOTES } from '../utils/regex.js';
import { IP_ALLOWED_ADDRESSES, STATIC_OUTBOUND_IP_ADDRESSES } from '../config/env.js';

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
    const staticOutboundIp = STATIC_OUTBOUND_IP_ADDRESSES?.split(",").
        map((ip) => ip.trim().replace(REMOVE_LEADING_TRAILING_QUOTES, ""))
    ;
    const allowedIpAddresses = IP_ALLOWED_ADDRESSES?.split(",").
        map((ip) => ip.trim().replace(REMOVE_LEADING_TRAILING_QUOTES, ""))
    ;

    try {
        const allowedIpData = staticOutboundIp.concat(allowedIpAddresses);

        if (clientIp) {
            const result = allowedIpLists(allowedIpData, clientIp);
            
            if (result.statusCode === HTTP_RESPONSE_STATUS.FORBIDDEN) {
                return res.status(result.statusCode).send({
                    status: false,
                    message: result.message,
                });
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
        
        res.status(HTTP_RESPONSE_STATUS.OK).send(healthStatus);
    } catch(error) {
        console.error(`Fatal Error: ${error}`);

        return res.status(HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
});

export default router;