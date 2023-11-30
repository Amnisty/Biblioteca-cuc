import { createContext } from "react";

export interface User {
  name: string;
  email: string;
  role: number;
  id: string;
}

export interface AuthContextType {
  user: User;
  setUser: (newUser: User) => void;
}
const initialObject:AuthContextType = {
    user:{} as User,
    setUser:() => null
} 

export const AuthContext = createContext<AuthContextType>(initialObject);

