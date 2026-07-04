import { getCurrentUser } from "@/lib/auth";
import DashboardNav from "@/components/layout/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#EDEEF1] font-sans overflow-hidden">
      {/* Sidebar & Mobile/Tablet Navigation */}
      <DashboardNav user={user} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dynamic page content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
