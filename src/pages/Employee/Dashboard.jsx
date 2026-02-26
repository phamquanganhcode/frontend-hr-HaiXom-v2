import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Clock, DollarSign, AlertTriangle, CheckCircle, 
  PlusCircle, FileText 
} from 'lucide-react';

const EmployeeDashboard = () => {
  // Lấy data từ context của EmployeeLayout
  const { data } = useOutletContext();

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto">
      
      {/* Section 1: Today's Shift Card */}
      <div className="bg-gradient-to-br from-[#6366F1] to-[#4F46E5] rounded-[2.5rem] p-6 md:p-10 text-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-indigo-100 text-xs font-semibold opacity-80 mb-2 uppercase tracking-widest">
            Ca làm việc hôm nay
          </p>
          <h3 className="text-3xl font-black mb-8 uppercase tracking-tighter">
            {data?.todayShift?.name || "Không có ca"}
          </h3>
          <div className="grid grid-cols-2 gap-4 md:max-w-md">
            <TimeDisplay label="Giờ vào" time={data?.todayShift?.checkIn} />
            <TimeDisplay label="Giờ ra" time={data?.todayShift?.checkOut} />
          </div>
        </div>
        {/* Phông nền trang trí */}
        <div className="absolute top-1/2 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Section 2: Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionCard 
          icon={<PlusCircle className="text-indigo-600" />} 
          title="Đăng ký ca" 
          desc="Tuần sau" 
          color="bg-indigo-50" 
        />
        <ActionCard 
          icon={<FileText className="text-emerald-600" />} 
          title="Phiếu lương" 
          desc="Xem chi tiết" 
          color="bg-emerald-50" 
        />
      </div>

      {/* Section 3: Stats Grid - Cập nhật theo yêu cầu của bạn */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<CheckCircle size={20} className="text-green-600"/>} 
          label="Công tháng này" 
          value={data?.stats?.totalWorkDays || 0} 
          iconBgColor="bg-green-100" 
        />
        <StatCard 
          icon={<Clock size={20} className="text-blue-600"/>} 
          label="Giờ làm" 
          value={`${data?.stats?.totalHours || 0}h`} 
          iconBgColor="bg-blue-100" 
        />
        <StatCard 
          icon={<DollarSign size={20} className="text-yellow-600"/>} 
          label="Lương tạm tính" 
          value={`${data?.stats?.estimatedSalary || 0}đ`} 
          iconBgColor="bg-yellow-100" 
        />
        <StatCard 
          icon={<AlertTriangle size={20} className="text-red-600"/>} 
          label="Đi muộn" 
          value={data?.stats?.lateDays || 0} 
          iconBgColor="bg-red-100" 
        />
      </div>

      {/* Section 4: Announcements */}
      <div className="bg-white p-6 mb-20 md:mb-0 rounded-3xl border border-slate-100 shadow-sm">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
          Thông báo mới
        </h4>
        <p className="text-slate-600 text-sm leading-relaxed italic">
          "{data?.announcement || "Hiện chưa có thông báo mới nào từ quản lý."}"
        </p>
      </div>
    </div>
  );
};

// --- Sub-components ---

const TimeDisplay = ({ label, time }) => (
  <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20">
    <p className="text-[10px] text-indigo-100 uppercase font-black mb-1 opacity-70 tracking-widest">{label}</p>
    <p className="text-2xl font-mono font-black">{time || "--:--"}</p>
  </div>
);

const ActionCard = ({ icon, title, desc, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-md transition-all">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-800">{title}</h4>
        <p className="text-[10px] text-slate-400 font-medium">{desc}</p>
      </div>
    </div>
    <PlusCircle size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
  </div>
);

// StatCard được chỉnh sửa logic: Dòng 1 (Icon + Label), Dòng 2 (Value)
const StatCard = ({ icon, label, value, iconBgColor }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-50 flex flex-col gap-4">
      {/* Dòng 1: Icon và Nhãn nằm cùng hàng */}
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          {icon}
        </div>
        <span className="text-gray-500 font-medium text-xs truncate">{label}</span>
      </div>

      {/* Dòng 2: Giá trị số nằm bên dưới */}
      <div className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
        {value}
      </div>
    </div>
  );
};

export default EmployeeDashboard;