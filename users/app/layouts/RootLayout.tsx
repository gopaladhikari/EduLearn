import { Footer } from "@/components/partials/Footer";
import { Header } from "@/components/partials/Header";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
