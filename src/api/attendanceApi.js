import axiosClient from "./axiosClient";

const attendanceApi = {
  /**
   * Lấy dữ liệu tổng quan cho Dashboard
   * Bao gồm: Ca làm hôm nay, thống kê nhanh tháng hiện tại, thông báo
   */
  getTodaySummary: () => {
    return axiosClient.get('/attendance/today-summary');
  },

  /**
   * Lấy lịch sử chấm công và chi tiết lương theo tháng/năm
   * Cần truyền userId (nếu API yêu cầu) hoặc chỉ cần month/year
   */
  getSalaryHistory: (employeeId, month, year) => {
    return axiosClient.get(`/attendance/salary-history`, {
      params: { employeeId, month, year }
    });
  },

  /**
   * Lấy lịch làm việc theo tuần
   * @param {string} startDate - Định dạng YYYY-MM-DD
   */
  getWeeklySchedule: (startDate) => {
    return axiosClient.get('/attendance/schedule', {
      params: { start_date: startDate }
    });
  },

  /**
   * Lấy danh sách các ca làm việc trống có sẵn để đăng ký
   */
  getAvailableShifts: () => {
    return axiosClient.get('/shifts/available');
  },

  /**
   * Đăng ký một hoặc nhiều ca làm việc cùng lúc
   * @param {Array} shifts - Danh sách các ca làm chọn từ UI
   */
  registerMultipleShifts: (shifts) => {
    return axiosClient.post('/attendance/register-shifts', { shifts });
  },

  /**
   * Gửi đăng ký ca làm việc mới (đơn lẻ)
   * @param {Object} data - { shift_id, date_list: [] }
   */
  registerShift: (data) => {
    return axiosClient.post('/shifts/register', data);
  },

  /**
   * Thực hiện Check-in / Check-out
   * @param {Object} data - { type: 'in' | 'out', location: { lat, lng } }
   */
  logAttendance: (data) => {
    return axiosClient.post('/attendance/log', data);
  },

  /**
   * Lấy chi tiết của một phiếu lương cụ thể
   */
  getPayrollDetail: (payrollId) => {
    return axiosClient.get(`/attendance/payroll/${payrollId}`);
  }
};

export default attendanceApi;