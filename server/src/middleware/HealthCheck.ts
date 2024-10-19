import express, { NextFunction, Request, Response } from 'express';
import { format, toZonedTime } from "date-fns-tz";
import { EUROPE_ZONE } from "utils/defaults";

const router = express();
const date = Date.now();
const timeZone = 'GMT';
const currentZoneDate = toZonedTime(date, EUROPE_ZONE);

const formattedZoneDate = format(currentZoneDate, `EEEE, dd MM yyyy HH:mm:ss ${timeZone}`, {
    timeZone: timeZone
});

router.use('/health', (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

router.get('/status', (req: Request, res: Response) => {
    const healthStatus = {
        uptime: process.uptime(),
        message: 'OK',
        date: formattedZoneDate
    };

    res.status(200).send(healthStatus);
});

export default router;