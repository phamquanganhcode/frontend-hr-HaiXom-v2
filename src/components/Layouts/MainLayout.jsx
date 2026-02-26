import { LucideLayoutDashboard, LucideUserCircle, LucideLogOut } from 'lucide-react';

const MainLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-background-light flex flex-col md:flex-row">
      {/* Sidebar cho Desktop - Màu đỏ Hải Xồm */}
      <aside className="hidden md:flex w-64 bg-primary flex-col text-white">
        <div className="p-6 text-2xl font-bold border-b border-primary-dark">HẢI XỒM HR</div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 p-3 bg-primary-dark rounded-lg">
            <LucideLayoutDashboard size={20} /> Dashboard
          </a>
          {/* Thêm các mục khác dựa trên bảng DB: Payroll, Attendance... */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Xin chào, Admin</span>
            <LucideUserCircle className="text-primary" />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 overflow-auto">
          {children}
        </div>
      </main>

      {/* Bottom Nav cho Mobile */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t flex justify-around p-3 shadow-lg">
        <LucideLayoutDashboard className="text-primary" />
        <LucideUserCircle className="text-gray-400" />
        <LucideLogOut className="text-gray-400" />
      </nav>
    </div>
  );
};

export default MainLayout;