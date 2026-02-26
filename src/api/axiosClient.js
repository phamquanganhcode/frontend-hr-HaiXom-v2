import axios from 'axios';

const axiosClient = axios.create({
  // Sử dụng biến VITE_API_URL bạn đã cấu hình trong .env
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR GỬI ĐI: Tự động đính kèm Token vào Header
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Lấy token từ kho lưu trữ trình duyệt
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// INTERCEPTOR NHẬN VỀ: Xử lý dữ liệu thô và bắt lỗi hệ thống
axiosClient.interceptors.response.use(
  (response) => {
    // Nếu có dữ liệu trả về, chỉ lấy phần data để Frontend dùng cho gọn
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    // Xử lý lỗi 401 (Hết hạn đăng nhập hoặc không có quyền)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); // Xóa token cũ
      window.location.href = '/login';  // Đẩy người dùng về trang đăng nhập
    }
    return Promise.reject(error);
  }
);

export default axiosClient;