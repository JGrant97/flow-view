"use client";

import User from "@/types/user";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<User | undefined>(undefined);

export default function UserContextProvider({defaultUser, children,
}: {
    defaultUser?: User,
    children: React.ReactNode
}) {
    const [user, setUser] = useState<User | undefined>(defaultUser);

    useEffect(() => {
        setUser(defaultUser);
    }, [defaultUser])

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}