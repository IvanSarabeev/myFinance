import NodeCache from "node-cache";

const cacheLimiter = new NodeCache();

/**
 * This function checks if a user has exceeded the rate limit for a specific action.
 *
 * @param {String} key - Unique identifier for the rate limit (e.g., user ID, IP address)
 * @param {Number} maxAttempts - Maximum number of attempts allowed within the time window
 * @param {Number} windowMs - Time window in milliseconds for which the rate limit applies
 *
 * @returns {Object} - Returns an object indicating whether the rate limit has been exceeded
 * and the current number of attempts.
 */
export function isRateLimited(key, maxAttempts = 5, windowMs = 60000) {
    if (!key) {
        throw new Error("Key is required for rate limiting.");
    }

    const record = cacheLimiter.get(key);

    if (record) {
        if (record.attempts >= maxAttempts) {
            return { limited: true }; // Rate limit exceeded
        }

        cacheLimiter.set(key,  { attempts: record.attempts + 1 }, windowMs);
        return { limited: false }; // Not limited
    }

    cacheLimiter.set(key, { attempts: 1 }, windowMs);
    return { limited: false }; // Not limited
}