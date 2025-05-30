"use client";
import { useRouter } from "next/navigation";
import Loader from "../component/loader/Loader";
import { useEffect, useState } from "react";
import useUserStore from "../zustand/useUserStore";
import { userAction } from "../actions";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const data = await userAction.fetchUser();
          if (data.success) {
            setUser(data.data);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }, []);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token && token.trim() !== "" && token !== "undefined") {
        setIsAuthenticated(true);
      } else {
        router.replace("/login");
      }
      setLoading(false);
    }, [router]);

    if (loading) return <Loader isLoading={true} />;
    if (!isAuthenticated) return null;

    return <Component {...props} />;
  };
}
