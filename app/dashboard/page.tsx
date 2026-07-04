import { getCurrentUser } from "@/lib/auth";
import { Plane, Compass, Calendar, ShieldCheck } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  // Mock travel stats for Skyvela dashboard
  const stats = [
    {
      title: "Planned Trips",
      value: "4",
      description: "Upcoming flights and destinations",
      icon: Plane,
      color: "bg-blue-500",
    },
    {
      title: "Explored Places",
      value: "12",
      description: "Completed travel bookings",
      icon: Compass,
      color: "bg-green-500",
    },
    {
      title: "Travel Days",
      value: "48",
      description: "Total days spent traveling",
      icon: Calendar,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-3xl font-bold text-[#1e2550]">Welcome back, {user?.name || "Traveler"}!</h1>
        <p className="text-gray-600 mt-1">Manage your flights, bookings, and profile details from here.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5">
              <div className={`${stat.color} text-white p-3.5 rounded-xl shadow-md`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Account Info Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl">
        <div className="border-b border-gray-100 px-6 py-4 bg-gray-50 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#1e2550]" />
          <h2 className="font-bold text-lg text-[#1e2550]">Account Security & Profile</h2>
        </div>
        <div className="p-6 space-y-4 text-sm">
          <div className="grid grid-cols-3 py-2 border-b border-gray-50">
            <span className="font-semibold text-gray-500">User ID</span>
            <span className="col-span-2 text-gray-950 font-mono select-all bg-gray-50 px-2 py-0.5 rounded border border-gray-200/50 w-fit">{user?.id || "N/A"}</span>
          </div>
          <div className="grid grid-cols-3 py-2 border-b border-gray-50">
            <span className="font-semibold text-gray-500">Name</span>
            <span className="col-span-2 text-gray-950">{user?.name || "N/A"}</span>
          </div>
          <div className="grid grid-cols-3 py-2 border-b border-gray-50">
            <span className="font-semibold text-gray-500">Email Address</span>
            <span className="col-span-2 text-gray-950">{user?.email || "N/A"}</span>
          </div>
          <div className="grid grid-cols-3 py-2">
            <span className="font-semibold text-gray-500">Session Status</span>
            <span className="col-span-2"><span className="bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded text-xs">Active & Verified (JWT)</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
