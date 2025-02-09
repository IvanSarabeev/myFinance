import { HTTP_RESPONSE_STATUS } from './../defines.js';

/**
 * General Error Middleware when working with Mongoose Exceptions
 */
const errorMiddleware = (err, req, res, next) => {
    const MongoErrors = Object.freeze({
        MONGO_BAD_OBJECT_ID: "CastError",
        MONGO_DUPLICATE_KEY: 11000,
        MONGO_VALIDATION_ERROR: "ValidationError",
    });

    try {
        let error = {...err};

        error.message = err.message;

        console.error("Error Middleware:", err);

        switch (err.name) {
            case MongoErrors.MONGO_BAD_OBJECT_ID: {
                const message = "Resource not found";
                error = new Error(message);
                error.statusCode = HTTP_RESPONSE_STATUS.NOT_FOUND;
                

                break;
            }

            case MongoErrors.MONGO_DUPLICATE_KEY: {
                const message = "Duplicate field value entered";
                error = new Error(message);
                error.statusCode = HTTP_RESPONSE_STATUS.BAD_REQUEST;
        
                break;
            }

            case MongoErrors.MONGO_VALIDATION_ERROR: {
                const message = Object.values(err.errors).map((val) => val.message);
                error = new Error(message.join(", "));
                error.statusCode = HTTP_RESPONSE_STATUS.BAD_REQUEST;

                break;
            }

            default: {
                const message = "Unknown Error";
                error = new Error(message);
                error.statusCode = HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR;

                break;
            }
        }

        res.status(error.statusCode || HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: error.message || "Internal Server Error",
        });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;