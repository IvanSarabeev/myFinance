import express from 'express';
import { format, toZonedTime } from "date-fns-tz";
import { EUROPE_ZONE } from './../utils/defaults.js';

const router = express.Router();
const date = Date.now();
const timeZone = 'GMT';
const currentZoneDate = toZonedTime(date, EUROPE_ZONE);

const formattedZoneDate = format(currentZoneDate, `EEEE, dd MM yyyy HH:mm:ss ${timeZone}`, {
    timeZone: timeZone
});

router.use('/health', (req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

router.get('/status', (req, res) => {
    const healthStatus = {
        uptime: process.uptime(),
        message: 'OK',
        date: formattedZoneDate
    };

    res.status(200).send(healthStatus);
});

export default router;