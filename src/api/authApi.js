import axiosClient from "./axiosClient";

const authApi = {
  // Đăng nhập dựa trên username và password (tương ứng bảng Account)
  login: (credentials) => {
    const url = '/auth/login';
    return axiosClient.post(url, credentials);
  },

  // Lấy thông tin cá nhân và vai trò (join bảng Employee và Account)
  getMe: () => {
    const url = '/auth/me';
    return axiosClient.get(url);
  },

  // Đăng xuất để xóa session trên Backend
  logout: () => {
    const url = '/auth/logout';
    return axiosClient.post(url);
  }
};

export default authApi;