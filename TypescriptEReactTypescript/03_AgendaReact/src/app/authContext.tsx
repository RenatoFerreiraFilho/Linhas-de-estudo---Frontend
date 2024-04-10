import React from "react";
import { IUser } from "./backend";

export interface IAuthContext {
    user: IUser;
    signOut: () => void;
}
//preciso setar um valor padrao, com notação similar à do useState:
export const authContext = React.createContext<IAuthContext>({
    user: {
        name: "",
        email: "",
    },
    signOut: () => {},
});
