import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  DollarSign,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Phone,
  Mail,
} from "lucide-react";

const EmployeeProfile = () => {
  const { data } = useOutletContext();
  const navigate = useNavigate();

 const handleLogout = () => {
  // 1. Xóa Token và dữ liệu đã lưu (tùy vào cách bạn lưu trữ)
  localStorage.removeItem('token'); 
  localStorage.removeItem('user_data');
  sessionStorage.clear(); // Xóa sạch session nếu có

  // 2. Điều hướng về trang login và XÓA lịch sử trang cũ
  // replace: true sẽ ghi đè trang Profile bằng trang Login trong lịch sử trình duyệt
  navigate('/login', { replace: true });
};

  return (
    <div className="max-w-5xl mx-auto md:pt-8 md:px-6 space-y-6 pb-24 md:pb-12">
      {/* Banner & Avatar Section */}
      {/* Banner & Avatar Section */}
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-sm overflow-hidden border border-slate-100 mx-4 md:mx-0 mt-5">
        {/* Banner với Gradient và họa tiết chìm */}
        <div className="h-40 md:h-52 bg-gradient-to-br from-[#6366F1] via-[#818CF8] to-[#C084FC] relative overflow-hidden ">
          {/* Họa tiết trang trí chìm */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-900/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

          {/* Layout Thông tin nằm đè lên ranh giới Banner và Body */}
          <div className="absolute mt-10 w-full px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5">
              {/* Text Info - Căn giữa trên mobile, căn trái trên desktop */}
              <div className="text-center md:text-left pb-4 md:pb-6 flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                    {data?.employee?.name || "Nguyễn Văn Trường"}
                  </h2>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <div>
                    {data?.employee?.status === "active" ? (
                      /* Trạng thái: Đang làm việc */
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-lg border border-emerald-100 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        Đang làm việc
                      </span>
                    ) : (
                      /* Trạng thái: Đã nghỉ việc / Tạm nghỉ */
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 text-[10px] font-black uppercase rounded-lg border border-rose-100 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                        Nghỉ việc
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      Mã số:
                    </span>
                    <span className="text-[11px] font-black text-indigo-600 uppercase">
                      {data?.employee?.code || "NV8892"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      Vai trò:
                    </span>
                    <span className="text-[11px] font-black text-slate-700 uppercase">
                      Nhân viên
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Khoảng đệm phía dưới để đẩy nội dung tiếp theo xuống */}
        <div className="h-10 md:h-4 bg-white"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
        {/* Cột trái: Thông tin công việc */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] p-4 md:p-6 shadow-sm border border-slate-50">
            <h3 className="text-xs font-black text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={16} className="text-indigo-500" /> Thông tin
              nhân sự
            </h3>

            <div className="space-y-1">
              <InfoRow
                icon={<MapPin size={18} className="text-purple-500" />}
                label="Cơ sở làm việc"
                value={data?.employee?.position || "Đại học Thủy Lợi"}
                bgColor="bg-purple-50"
              />
              <div className="h-[1px] bg-slate-50 my-1 ml-14"></div>
              <InfoRow
                icon={<Calendar size={18} className="text-emerald-500" />}
                label="Ngày bắt đầu"
                value={data?.employee?.joinDate || "15/05/2024"}
                bgColor="bg-emerald-50"
              />
              <div className="h-[1px] bg-slate-50 my-1 ml-14"></div>
              <InfoRow
                icon={<DollarSign size={18} className="text-amber-500" />}
                label="Lương cơ bản / Giờ"
                value={`${data?.stats?.estimatedSalary || "35.000"}đ`}
                bgColor="bg-amber-50"
              />
            </div>
          </div>

          {/* Lịch sử thuyên chuyển */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50 min-h-[150px]">
            <h3 className="text-xs font-black text-slate-800 mb-6 uppercase tracking-wider">
              Lịch sử công tác
            </h3>
            <div className="flex flex-col items-center justify-center py-4 text-center border-2 border-dashed border-slate-50 rounded-2xl">
              <p className="text-slate-300 text-xs font-medium italic">
                Chưa có dữ liệu thuyên chuyển cơ sở
              </p>
            </div>
          </div>
        </div>

        {/* Cột phải: Thông tin liên hệ & Action */}
        {/* Cột phải: Thông tin liên hệ & Action */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50">
            <h3 className="text-xs font-black text-slate-800 mb-4 uppercase tracking-wider italic">
              Liên hệ hệ thống
            </h3>
            <div className="space-y-4">
              {/* Hiển thị Số điện thoại thực tế */}
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                  <Phone size={14} />
                </div>
                <span className="text-sm font-bold text-slate-600">
                  {data?.employee?.phone || "0987 765 268"}
                </span>
              </div>

              {/* Hiển thị Email thực tế */}
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                  <Mail size={14} />
                </div>
                <span className="text-sm font-bold text-slate-600 truncate">
                  {data?.employee?.email || "example@haixom.com"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-white text-red-500 border border-red-50 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-red-50 active:scale-95 transition-all"
          >
            <LogOut size={18} /> Đăng xuất tài khoản
          </button>
        </div>
      </div>
    </div>
  );
};

// Sub-component cho từng dòng thông tin
const InfoRow = ({ icon, label, value, bgColor }) => (
  <div className="flex items-center gap-4 p-3 hover:bg-slate-50/50 rounded-2xl transition-colors group">
    <div
      className={`w-10 h-10 ${bgColor} rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}
    >
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-800 truncate">{value}</p>
    </div>
    <ChevronRight size={14} className="text-slate-300" />
  </div>
);

export default EmployeeProfile;
