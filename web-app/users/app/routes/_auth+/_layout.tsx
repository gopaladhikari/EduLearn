import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <div>
      Layout
      <Outlet />
    </div>
  );
}
