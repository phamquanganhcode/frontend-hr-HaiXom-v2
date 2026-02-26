// Để lấy dữ liệu chi tiết hồ sơ từ Backend Laravel

import axiosClient from "./axiosClient";

const userApi = {
  getProfile: () => {
    return axiosClient.get('/user/profile');
  },
  logout: () => {
    return axiosClient.post('/auth/logout');
  }
};

export default userApi;