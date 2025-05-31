import NodeCache from "node-cache";
import {REDIS_KEY} from "../config/env.js";
import {logMessage} from "../utils/helpers.js";

const CACHE_PREFIX = 'Cache Error: ';
const cacheTTL = 300; // 5 minutes
const cacheOptions = Object.freeze({
    ttl: cacheTTL,
    forceRefresh: false,
    compareLength: true,
});

const cache = new NodeCache({ stdTTL: cacheTTL });

/**
 * Retrieves a cached value based on the provided key. If the value is not cached or if a refresh is forced,
 * it fetches fresh data using via the callback and updates the cache.
 *
 * @param {string} key - The unique cache key used to retrieve the cached value.
 * @param {Function} callback - The function to fetch fresh data if the cache is unavailable or invalid.
 * @param {Object} [options=cacheOptions] - Additional options to customize cache behavior. Options may include:
 *   - 'ttl (Time To Live)': The number of seconds to cache the value. Defaults to 300 seconds (5 minutes).
 *   - `forceRefresh` (boolean): Whether to bypass the cache and force fetching fresh data.
 *   - `compareLength` (boolean): Whether to compare the length of the cached and fresh data when validating cache integrity.
 * @return {Promise<any>} The cached value, or fresh data if the cache is invalid or refreshed.
 */
export async function getCache(key, callback, options = cacheOptions) {
    if (!key || !callback) throw new Error("Invalid key or callback");

    if (typeof callback !== "function") throw new Error("Callback must be a function");

    const cacheKey = `${REDIS_KEY}_${key}`;

    if (options.forceRefresh) {
        const freshData = await callback();
        cache.set(cacheKey, freshData);

        return freshData;
    }

    try {
        const cachedValue = await cache.get(cacheKey);

        if (cachedValue) {
            if (!options.compareLength || (
                Array.isArray(cachedValue) &&
                Array.isArray(await callback()) &&
                cachedValue.length === await callback().length
            )) {
                return cachedValue;
            }
        }

        const freshData = await callback();

        if (freshData !== null && freshData !== undefined) {
            if (
                !cachedValue ||
                !Array.isArray(freshData) ||
                !Array.isArray(cachedValue) ||
                freshData.length >= cachedValue.length
            ) {
                cache.set(cacheKey, freshData);
            }

            return freshData;
        }
    } catch (error) {
        logMessage(error, `Error getting cache: ${error.message}`, 'error', CACHE_PREFIX);

        return callback();
    }
}

/**
 * Clear cache based on a key, if the key is missing, return undefined
 *
 * @param {string} key
 * @returns {undefined|number}
 */
export function clearCache(key) {
    if (!key) {
        logMessage(`Invalid key - ${key}`, 'Unable to clear cache', 'error', CACHE_PREFIX);
        return undefined;
    }

    const cacheKey = `${REDIS_KEY}_${key}`;

    if (cache.has(cacheKey) === false) return undefined;

    return cache.del(cacheKey);
}

