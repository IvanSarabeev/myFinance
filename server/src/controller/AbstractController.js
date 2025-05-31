/**
 * AbstractController serves as a base class for handling common controller logic,
 * such as parsing, validation, and utility methods related to request handling.
 * This class is not meant to be instantiated directly but can be extended by other controllers.
 */
class AbstractController {
    /**
     * Extracts pagination options from request query parameters.
     *
     * @param {number} page - Page number
     * @param {number} limit - Limit per page
     * @returns {{ page: number, limit: number, skip: number }}
     * @throws {Error} If page or limit is invalid
     * */
    createPaginationFromRequest(page, limit) {
        const pageIndex = parseInt(page, 10) || 1;
        const limitIndex = parseInt(limit, 10) || 10;

        if (pageIndex <= 0 || limitIndex <= 0) {
            throw new Error("Invalid page or limit. Must be greater than 0.");
        }

        const offset = (pageIndex - 1) * limitIndex;

        return { pageIndex, limitIndex, offset };
    }
}

export default AbstractController;