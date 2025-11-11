"use client";

import { useAuth } from "@/context/AuthContext";

const Welcome = () => {
  const { user } = useAuth();
  return <>{user && <p>Bem vindo(a), {user.name}!</p>}</>;
};

export default Welcome;
