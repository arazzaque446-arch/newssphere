import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Users, Mail, Shield, MoreVertical } from "lucide-react";

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
            <p className="mt-2 text-slate-500">
              Manage administrators, editors, and subscribers.
            </p>
          </div>
          <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
            + Add User
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-left font-semibold">User</th>
                  <th className="p-4 text-left font-semibold">Role</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Default Admin Row */}
                <tr className="transition hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Users size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Administrator</p>
                        <p className="flex items-center gap-1 text-sm text-slate-500">
                          <Mail size={12} /> admin@newssphere.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="flex w-fit items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                      <Shield size={12} /> Admin
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="rounded p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}