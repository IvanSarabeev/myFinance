import arcjet, { shield, detectBot, tokenBucket } from '@arcjet/node';

import {ARJECT_SHIELD, ARJECT_KEY, ARJECT_REFILL_RATE, ARJECT_INTERVAL, ARJECT_CAPACITY, NODE_ENV} from "../config/env.js";

const isDev = NODE_ENV === "dev";

/**
 * Arject Settings
 */
const aj = arcjet({
    key: ARJECT_KEY,
    environment: isDev ? "development" : "production",
    characteristics: [String(ARJECT_SHIELD)], // Track requests
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: isDev ? "DRY_RUN" : "LIVE" }),
        // Create a bot detection rule
        detectBot({
            mode: isDev ? "DRY_RUN" : "LIVE",
            botTypes: ["crawler", "scraper", "spider", "bot"],
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
            ]
        }),
        tokenBucket({
            mode: isDev ? "DRY_RUN" : "LIVE",
            refillRate: Number(ARJECT_REFILL_RATE),
            interval: Number(ARJECT_INTERVAL),
            capacity: Number(ARJECT_CAPACITY),
        }),
    ]
});

export default aj;