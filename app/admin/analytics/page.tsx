import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Analytics Overview</h1>
          <p className="mt-2 text-slate-500">
            Track your website traffic, reader engagement, and content performance.
          </p>
        </div>

        {/* Placeholder Stat Cards */}
        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Unique Visitors</p>
                <p className="text-2xl font-bold text-slate-900">--</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Pageviews</p>
                <p className="text-2xl font-bold text-slate-900">--</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Avg. Time on Page</p>
                <p className="text-2xl font-bold text-slate-900">--</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <BarChart3 size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Bounce Rate</p>
                <p className="text-2xl font-bold text-slate-900">--</p>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Message */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-10 text-center">
          <BarChart3 className="mx-auto mb-4 h-12 w-12 text-blue-600" />
          <h2 className="mb-2 text-xl font-bold text-slate-900">Analytics Data Pending</h2>
          <p className="mx-auto max-w-xl text-slate-600">
            To view live traffic data, you need to connect an analytics provider like Google Analytics, Vercel Analytics, or pull raw view counts from Supabase.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}