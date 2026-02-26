import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  CheckCircle, 
  History, 
  UserCircle 
} from 'lucide-react';

const EmployeeBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Danh sách các mục menu dưới đáy màn hình
  const navItems = [
    { 
      icon: <LayoutDashboard size={20}/>, 
      label: "Trang chủ", 
      path: "/employee/dashboard" 
    },
    { 
      icon: <Calendar size={20}/>, 
      label: "Lịch làm", 
      path: "/employee/schedule" 
    },
    { 
      icon: <CheckCircle size={20}/>, 
      label: "Lương", 
      path: "/employee/salary" 
    },
    { 
      icon: <History size={20}/>, 
      label: "Đổi ca", 
      path: "/employee/exchange" 
    },
    { 
      icon: <UserCircle size={20}/>, 
      label: "Hồ sơ", 
      path: "/employee/profile" 
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center py-2 px-1 z-50 pb-safe shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => {
        // Kiểm tra xem mục này có đang được chọn hay không
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 flex-1 transition-all active:scale-90"
          >
            <div className={`
              flex flex-col items-center justify-center px-4 py-1 rounded-xl transition-all duration-300
              ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'}
            `}>
              {item.icon}
              <span className={`
                text-[10px] font-bold mt-0.5 tracking-tight
                ${isActive ? 'text-indigo-600' : 'text-slate-400'}
              `}>
                {item.label}
              </span>
            </div>
            
            {/* Thanh chỉ báo nhỏ xíu dưới mục đang active */}
            {isActive && (
              <div className="w-1 h-1 bg-indigo-600 rounded-full mt-0.5 animate-pulse"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default EmployeeBottomNav;