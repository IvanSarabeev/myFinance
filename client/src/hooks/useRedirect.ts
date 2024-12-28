import { useNavigate } from "react-router-dom";

/**
 * Redirect User to a different page
 * 
 * @param {String} urlPath - The path to redirect to 
 * @returns {Response | null} - The Redirect Response or null
 */
const useRedirect = (urlPath: string) => {
    const redirectRoute = useNavigate();
    
    if (urlPath.length > 0) {
        return () => redirectRoute(urlPath);
    }

    return null;
}

export default useRedirect;