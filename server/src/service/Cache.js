import NodeCache from "node-cache";
import {REDIS_KEY} from "../config/env.js";

const cacheTTL = 300;

const cache = new NodeCache({ stdTTL: cacheTTL });

/**
 * Gets a value from a cache or sets it if not present
 *
 * @param {string} key - Unique key
 * @param {Function} callback - async function / returning data
 * @returns {Promise<any>}
 */
export async function getCache(key, callback) {
    if (!key || !callback) throw new Error("Invalid key or callback");

    if (typeof callback !== "function") throw new Error("Callback must be a function");

    const cacheKey = `${REDIS_KEY}_${key}`;
    const cachedValue = cache.get(cacheKey);

    if (cachedValue !== undefined || cacheKey) return cachedValue;

    const cacheResponse = await callback();
    cache.set(cacheKey, cacheResponse);

    return cacheResponse;
}

/**
 * Clear cache based on a key, if the key is missing, return undefined
 *
 * @param {string} key
 * @returns {undefined|number}
 */
export function clearCache(key) {
    if (!key) return undefined;

    const cacheKey = `${REDIS_KEY}_${key}`;

    if (cache.has(cacheKey) === false) return undefined;

    return cache.del(cacheKey);
}

