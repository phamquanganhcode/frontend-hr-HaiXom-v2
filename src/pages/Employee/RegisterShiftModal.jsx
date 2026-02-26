import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const RegisterShiftModal = ({ 
  isOpen, 
  onClose, 
  weekRange = "02/03/2026 - 08/03/2026",
  realShiftTypes = [], // Dữ liệu ca làm thực tế từ API (nếu có)
  realDays = [],       // Danh sách ngày thực tế từ API (nếu có)
  onSubmit             // Hàm xử lý khi gửi form
}) => {
  
  // 1. Cấu hình MOCKUP DATA để quan sát giao diện khi chưa có API
  const MOCK_SHIFT_TYPES = [
    { id: 'Sáng', time: '6:00-10:00', color: 'bg-yellow-400' },
    { id: 'Trưa', time: '10:00-14:00', color: 'bg-orange-400' },
    { id: 'Chiều', time: '14:00-18:00', color: 'bg-blue-400' },
    { id: 'Tối', time: '18:00-22:00', color: 'bg-purple-400' },
    { id: 'Gãy', time: '10:15-14:00 & 17:00-21:00', color: 'bg-pink-400' },
  ];

  const MOCK_DAYS = [
    { label: 'Thứ 2', date: '02/03' }, { label: 'Thứ 3', date: '03/03' },
    { label: 'Thứ 4', date: '04/03' }, { label: 'Thứ 5', date: '05/03' },
    { label: 'Thứ 6', date: '06/03' }, { label: 'Thứ 7', date: '07/03' },
    { label: 'Chủ nhật', date: '08/03' },
  ];

  // 2. ƯU TIÊN DATA THỰC TẾ (Nếu props trống thì dùng Mockup)
  const displayShiftTypes = realShiftTypes.length > 0 ? realShiftTypes : MOCK_SHIFT_TYPES;
  const displayDays = realDays.length > 0 ? realDays : MOCK_DAYS;

  // State lưu trữ ca chọn: { "02/03": ["Sáng", "Tối"], "03/03": ["Gãy"] }
  const [selectedShifts, setSelectedShifts] = useState({});


  const toggleShift = (date, shiftId) => {
    setSelectedShifts(prev => {
      const dayShifts = prev[date] || [];
      const isExist = dayShifts.includes(shiftId);
      
      const newDayShifts = isExist
        ? dayShifts.filter(id => id !== shiftId)
        : [...dayShifts, shiftId];
        
      return { ...prev, [date]: newDayShifts };
    });
  };

  const handleSendRegistration = () => {
    // Nếu có hàm onSubmit từ props thì gọi nó, không thì dùng logic mặc định
    if (onSubmit) {
      onSubmit(selectedShifts);
    } else {
      console.log("Dữ liệu đăng ký (Mockup):", selectedShifts);
      alert("Đã gửi đăng ký thành công (Dữ liệu giả lập)");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/50 backdrop-blur-sm transition-all duration-300">
      {/* Container chính của Modal */}
      <div className="h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* HEADER SECTION */}
        <div className="p-6 border-b sticky top-0 bg-white z-10 shadow-sm">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Đăng ký ca tuần sau</h2>
              <p className="text-sm text-slate-500 font-semibold mt-1">{weekRange}</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all"
            >
              <X size={22} />
            </button>
          </div>

          
        </div>

        {/* BODY SECTION: DANH SÁCH NGÀY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#fafafa]">
          {displayDays.map((day) => (
            <div key={day.date} className="space-y-4">
              <div className="flex justify-between items-end border-b border-slate-200 pb-2">
                <div className="text-left">
                  <h3 className="font-black text-slate-800 text-lg leading-none">{day.label}</h3>
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-tighter">{day.date}</span>
                </div>
                <div className="text-right">
                   <span className="px-2 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-black text-indigo-600 shadow-sm">
                    {(selectedShifts[day.date] || []).length} CA CHỌN
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2.5">
                {displayShiftTypes.map((shift) => {
                  const isSelected = selectedShifts[day.date]?.includes(shift.id);
                  return (
                    <button
                      key={shift.id}
                      onClick={() => toggleShift(day.date, shift.id)}
                      className={`relative py-3.5 px-3 rounded-2xl text-xs font-black transition-all border-2 text-center overflow-hidden
                        ${isSelected 
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                          : 'border-white bg-white text-slate-500 hover:border-slate-100 shadow-sm hover:shadow-md'
                        } ${shift.id === 'Gãy' ? 'col-span-2' : ''}`}
                    >
                      {/* Hiệu ứng checkmark nhỏ khi chọn */}
                      {isSelected && <Check size={12} className="absolute top-1 right-1 opacity-50" />}
                      Ca {shift.id}
                      <span className={`block text-[9px] mt-0.5 opacity-70 font-medium ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {shift.time}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER SECTION: NÚT GỬI */}
        <div className="p-6 border-t bg-white sticky bottom-0 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <button 
            disabled={Object.values(selectedShifts).every(arr => arr.length === 0)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:shadow-none text-white font-black py-4 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-100 active:scale-[0.97]"
            onClick={handleSendRegistration}
          >
            <Check size={20} strokeWidth={3} />
            GỬI ĐĂNG KÝ NGAY
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-3 font-bold uppercase tracking-tight">
            Trưởng chi nhánh sẽ xem xét và phản hồi sớm nhất
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterShiftModal;