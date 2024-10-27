import { useState } from "react";

const useToggle = (): [boolean, () => void] => {
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
    }

    return [show, handleToggle];
};

export default useToggle;