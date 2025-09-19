import React, { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const { fetchUser } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        const user = await fetchUser();

        if (!user) navigate("/login", { replace: true });
      };
      checkAuth();
    }, [fetchUser, navigate]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
