import { useContext } from "react";
import { StoreContextProvider } from "@/contextStore";

export default function useStore() {
    return useContext(StoreContextProvider);
}