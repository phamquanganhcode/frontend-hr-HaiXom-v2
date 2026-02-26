/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Màu sắc đặc trưng dựa trên thương hiệu Hải Xồm
        primary: {
          DEFAULT: '#D32F2F', // Màu đỏ chủ đạo (mạnh mẽ, kích thích vị giác)
          dark: '#9A0007',
          light: '#FF6659',
        },
        secondary: {
          DEFAULT: '#FFD700', // Màu vàng (nhấn mạnh các nút quan trọng/ưu đãi)
          dark: '#C7A500',
        },
        background: {
          dark: '#121212',  // Dùng cho bảng hiển thị tại quầy (tránh chói mắt)
          light: '#F5F5F5', // Dùng cho app nhân viên và trang quản trị
        }
      },
      screens: {
        // Tối ưu các điểm dừng hiển thị (Responsive)
        'xs': '480px',   // Điện thoại nhỏ
        'sm': '640px',   // Điện thoại lớn
        'md': '768px',   // Máy tính bảng
        'lg': '1024px',  // Máy tính xách tay
        'xl': '1280px',  // Màn hình máy tính bàn lớn
      },
    },
  },
  plugins: [],
}