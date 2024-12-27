import { redirect } from "react-router-dom";

/**
 * Redirect User to a different page
 * 
 * @param {String} urlPath - The path to redirect to 
 * @returns {Response | null} - The Redirect Response or null
 */
export function redirectInstance(urlPath: string) {
    if (urlPath.length > 0) {       
        console.log("Redirecting to: ", urlPath);
        return redirect(urlPath);
    }

    return null;
}