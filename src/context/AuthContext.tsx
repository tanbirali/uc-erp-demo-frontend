import { createContext, useContext, useState } from "react";
import { login as loginApi, register as registerApi } from "../api/auth";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender?: string;
  avatar?: string;
}

export interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (formData: FormData) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  companyId?: string;
  storeCompanyId?: (id: string) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    // Implement login logic here
    try {
      setIsLoading(true);
      const response = await loginApi(email, password);
      setUser(response.result.user);
      setToken(response.result.token);
      localStorage.setItem("erp_token", response.result.token);
      localStorage.setItem("erp_user", response.result.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const response = await registerApi(formData);
      setUser(response.result.user);
      setToken(response.result.token);
      localStorage.setItem("erp_token", response.result.token);
      localStorage.setItem("erp_user", response.result.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("erp_token");
    localStorage.removeItem("erp_user");
    setUser(null);
    setToken(null);
  };

  const storeCompanyId = (id: string) => {
    setCompanyId(id);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        token,
        login,
        logout,
        setUser,
        setToken,
        register,
        companyId,
        storeCompanyId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
