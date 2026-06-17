"use client";

import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <>{children}</>;
};

export default AuthLayout;
