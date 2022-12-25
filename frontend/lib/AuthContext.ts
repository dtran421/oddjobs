import { Session } from "@supabase/supabase-js";
import { createContext } from "react";

export const AuthContext = createContext<{ session: Session | null }>({
    session: null
});
