import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import GradientBackground from "./GradientBackground";
import LogoutButton from "./LogoutButton";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen">
      <GradientBackground />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mb-6 flex items-center justify-between">
            <Header />

            <LogoutButton />
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}