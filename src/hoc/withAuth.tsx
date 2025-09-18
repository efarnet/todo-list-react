import React, { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const { user, fetchUser } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        await fetchUser();
      };
      checkAuth();
    }, [fetchUser]);

    useEffect(() => {
      if (!user) {
        navigate("/login", { replace: true });
      }
    }, [user, navigate]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
