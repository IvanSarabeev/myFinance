import { useNavigate } from "react-router-dom";

type RedirectHook = (urlPath: string | null) => void;

/**
 * A custom hook - to handle user page redirections
 * 
 * @returns {Function} - Function to navigate to a different page
 */
const useRedirect = (): RedirectHook => {
    const redirectRoute = useNavigate();
    
    return (urlPath: string | null = null) => {
        if (urlPath && urlPath.length > 0) {
            redirectRoute(urlPath);
        } else {
            redirectRoute(-1);
        }
    };
}

export default useRedirect;