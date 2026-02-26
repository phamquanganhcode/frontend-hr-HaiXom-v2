import React, { useState, useEffect, useMemo } from 'react'; // Đã thêm useMemo
import { 
  ChevronLeft, ChevronRight, Clock, MapPin, 
  Calendar as CalendarIcon, Info, Loader2, CheckCircle2
} from 'lucide-react';
import attendanceApi from '../../api/attendanceApi';
import RegisterShiftModal from './RegisterShiftModal';
const EmployeeSchedule = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);
  // Dữ liệu giả lập chuẩn bảng phân công
  const MOCK_SCHEDULE = [
    { id: 1, date: '2026-02-23', shiftName: 'Ca Sáng', time: '08:00 - 14:00', location: 'Khu vực A - Tầng 1', note: 'Chuẩn bị menu mới' },
    { id: 2, date: '2026-02-24', shiftName: 'Ca Chiều', time: '14:00 - 22:00', location: 'Khu vực B - Tầng 2', note: '' },
    { id: 3, date: '2026-02-26', shiftName: 'Ca Gãy', time: '10:00 - 14:00 & 17:00 - 21:00', location: 'Khu vực A - Tầng 1', note: 'Hỗ trợ tiệc tối' },
    { id: 4, date: '2026-02-27', shiftName: 'Ca Đêm', time: '22:00 - 06:00', location: 'Kho tổng', note: '' },
  ];

  // Logic tính toán 7 ngày trong tuần
  const getDaysInWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    return [...Array(7)].map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const weekDays = getDaysInWeek(currentWeek);

  // LOGIC TÍNH TỔNG GIỜ LÀM DỰ KIẾN
  const totalWeeklyHours = useMemo(() => {
    let totalMinutes = 0;

    scheduleData.forEach(shift => {
      // Tách ca gãy bằng dấu & (nếu có)
      const segments = shift.time.split('&');
      segments.forEach(seg => {
        const times = seg.trim().split('-');
        if (times.length === 2) {
          const [start, end] = times.map(t => t.trim());
          const [startH, startM] = start.split(':').map(Number);
          const [endH, endM] = end.split(':').map(Number);
          
          let duration = (endH * 60 + endM) - (startH * 60 + startM);
          if (duration < 0) duration += 24 * 60; // Xử lý ca đêm xuyên ngày
          totalMinutes += duration;
        }
      });
    });

    return (totalMinutes / 60).toFixed(1);
  }, [scheduleData]);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const dateString = currentWeek.toISOString().split('T')[0];
        const response = await attendanceApi.getWeeklySchedule(dateString);
        
        if (response?.length > 0) {
          setScheduleData(response);
        } else {
          // Chỉ hiện Mock nếu tuần đang xem là tuần của tháng 02/2026 (để test)
          const isMockWeek = weekDays.some(day => day.toISOString().startsWith('2026-02'));
          setScheduleData(isMockWeek ? MOCK_SCHEDULE : []);
        }
      } catch {
        const isMockWeek = weekDays.some(day => day.toISOString().startsWith('2026-02'));
        setScheduleData(isMockWeek ? MOCK_SCHEDULE : []);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [currentWeek]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 pb-24 text-left">
      {/* Header Điều hướng */}
      <div className="flex items-center gap-3 ml-auto">
          {/* NÚT ĐĂNG KÝ CA LÀM VIỆC MỚI */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white border-2 border-indigo-600 text-indigo-600 px-5 py-2.5 rounded-2xl text-xs font-black hover:bg-indigo-600 hover:text-white transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <CalendarIcon size={16} />
            ĐĂNG KÝ CA TUẦN SAU
          </button>

          {/* ... Phần cụm nút điều hướng ChevronLeft/Right của bạn giữ nguyên ... */}
        </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
         
          <p className="text-slate-500 text-sm font-medium">Bảng phân công chi tiết tuần này của bạn</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button 
            onClick={() => {
              const d = new Date(currentWeek);
              d.setDate(d.getDate() - 7);
              setCurrentWeek(d);
            }}
            className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="px-4 py-1 text-sm font-black text-slate-700 uppercase tracking-tighter">
            {weekDays[0].getDate()}/{weekDays[0].getMonth()+1} - {weekDays[6].getDate()}/{weekDays[6].getMonth()+1}
          </div>
          <button 
            onClick={() => {
              const d = new Date(currentWeek);
              d.setDate(d.getDate() + 7);
              setCurrentWeek(d);
            }}
            className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Giao diện Bảng Lịch */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-500" />
          </div>
        )}

        <div className="divide-y divide-slate-50">
          {weekDays.map((day, idx) => {
            const dateStr = day.toISOString().split('T')[0];
            const shifts = scheduleData.filter(s => s.date === dateStr);
            const isToday = new Date().toDateString() === day.toDateString();

            return (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row min-h-[100px] transition-colors ${
                  isToday ? 'bg-indigo-50/30' : 'hover:bg-slate-50/50'
                }`}
              >
                <div className="w-full md:w-32 p-4 flex md:flex-col items-center justify-between md:justify-center border-b md:border-b-0 md:border-r border-slate-50 bg-slate-50/30">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isToday ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {day.toLocaleDateString('vi-VN', { weekday: 'short' })}
                  </span>
                  <span className={`text-2xl font-black ${isToday ? 'text-indigo-600' : 'text-slate-700'}`}>
                    {day.getDate()}
                  </span>
                  {isToday && (
                    <span className="md:mt-1 px-2 py-0.5 bg-indigo-600 text-[8px] font-black text-white rounded-full uppercase">Hôm nay</span>
                  )}
                </div>

                <div className="flex-1 p-4">
                  {shifts.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {shifts.map((shift, sIdx) => (
                        <div key={sIdx} className="bg-white border border-slate-100 p-4 rounded-[1.5rem] shadow-sm flex items-start gap-4 text-left">
                          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 text-indigo-600">
                            <Clock size={20} />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-slate-800 uppercase text-sm">{shift.shiftName}</h4>
                              <CheckCircle2 size={14} className="text-emerald-500" />
                            </div>
                            <p className="text-xs font-bold text-indigo-600">{shift.time}</p>
                            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                              <MapPin size={12} className="text-rose-400" />
                              {shift.location}
                            </div>
                             {shift.note && (

                              <div className="mt-2 flex items-center gap-1.5 text-[10px] bg-slate-50 text-slate-500 p-1.5 rounded-lg border border-slate-100">

                                <Info size={12} />

                                <span>Ghi chú: {shift.note}</span>

                              </div>

                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center">
                      <p className="text-xs font-bold text-slate-300 italic uppercase tracking-widest">Không có lịch làm việc</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Stats - ĐÃ CẬP NHẬT TỔNG GIỜ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-lg shadow-indigo-100 text-left">
           <CalendarIcon className="mb-3 opacity-50" size={24} />
           <p className="text-[10px] font-black uppercase opacity-70 tracking-tighter">Tổng giờ làm dự kiến</p>
           <p className="text-2xl font-black">{totalWeeklyHours} Giờ / Tuần</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-[2rem] text-white shadow-lg shadow-slate-100 md:col-span-2 flex items-center justify-between text-left">
           <div>
              <p className="text-[10px] font-black uppercase opacity-70">Lưu ý tuần này</p>
              <p className="text-sm font-medium text-slate-300 mt-1">
                {totalWeeklyHours > 0 
                   ? "Vui lòng có mặt đúng giờ để check-in vân tay." 
                   : "Hiện chưa có lịch phân công cho tuần được chọn."}
              </p>
           </div>
        </div>
      </div>
      {/* MODAL ĐĂNG KÝ */}
      <RegisterShiftModal 
  key={isModalOpen} // Khi isModalOpen thay đổi, React tự hủy Modal cũ và tạo mới hoàn toàn
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
/>
    </div>
  );
};

export default EmployeeSchedule;