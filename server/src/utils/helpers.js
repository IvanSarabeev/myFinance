import chalk from "chalk";
import {LOG_MESSAGE_TYPES} from "../defines.js";

const {Error, Warning, Debug, Info} = LOG_MESSAGE_TYPES;

/**
 * A function for logging a message to the console with an optional prefix.
 *
 * @param {any} value - The message to log
 * @param {string} message - The message to log
 * @param {string} [level='error'] - Log level ('error', 'warn', 'debug', 'info')
 * @param {string} [prefix='Node Log: '] - The optional prefix to be displayed before the log message.
 */
export const logMessage = (value, message = '', level = Error, prefix = 'Node Log / ') => {
    const timestamp = new Date().toISOString();
    const logPrefix = `[${timestamp}] ${prefix}`;
    const logMessage = logPrefix + message;
    const log = console.log;

    const formattedValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;

    switch (level.toLowerCase()) {
        case Error:
            log(chalk.red(`${logMessage}:`), chalk.red(formattedValue));
            break;
        case Warning:
            log(chalk.yellow(`${logMessage}:`), chalk.yellow(formattedValue));
            break;
        case Debug:
            log(chalk.bgMagenta(`${logMessage}:`), chalk.bgMagenta(formattedValue));
            break;
        case Info:
            log(chalk.blue(`${logMessage}:`), chalk.blue(formattedValue));
            break;
        default:
            log(chalk.green(`${logMessage}:`), chalk.green(formattedValue));
    }
}