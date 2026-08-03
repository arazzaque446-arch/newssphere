import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import AdminSidebar from "@/components/dashboard/AdminSidebar";
import AdminHeader from "@/components/dashboard/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />

        <div className="flex flex-1 flex-col">
          <AdminHeader
            user={{
              email: user.email ?? "",
            }}
          />

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}