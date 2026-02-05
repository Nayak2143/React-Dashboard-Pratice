import { api } from "@/Instance/Instance";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<any | undefined>(undefined);

export const Authprovider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getUserData();
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const getUserData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/auth/me");
      console.log("user res", response);
      if (response?.data?.success) {
        const user = response.data.user;

        // ✅ Extract permission keys
        const permissions =
          user?.role?.permissions?.map((p: any) => p.key) || [];

        setUser({
          ...user,
          permissions,
        });
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "An unexpected error occurred";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const userLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setError(null);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        await getUserData();
      }
      return response;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      console.log(errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });

      // clear frontend state
      setUser(null);

      // optional: redirect to login
      // navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      getUserData,
      userLogin,
      logout,
    }),
    [user, loading, error, getUserData, userLogin, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
