import arcjet, { shield, detectBot, tokenBucket } from '@arcjet/node';

import {ARJECT_SHIELD, ARJECT_KEY, ARJECT_REFILL_RATE, ARJECT_INTERVAL, ARJECT_CAPACITY} from "../config/env.js";

/**
 * Arject Settings
 */
const aj = arcjet({
    key: ARJECT_KEY,
    characteristics: [String(ARJECT_SHIELD)], // Track requests
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Create a bot detection rule
        detectBot({
            mode: "LIVE",
            botTypes: ["crawler", "scraper", "spider", "bot"],
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
            ]
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: Number(ARJECT_REFILL_RATE),
            interval: Number(ARJECT_INTERVAL),
            capacity: Number(ARJECT_CAPACITY),
        }),
    ]
});

export default aj;