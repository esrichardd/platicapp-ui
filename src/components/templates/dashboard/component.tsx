"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth/logout";

export function DashboardTemplate() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <div>Dashboard</div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
