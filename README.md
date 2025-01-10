# Hệ Thống Quản Lý Sinh Viên

Dự án này là một Hệ Thống Quản Lý Sinh Viên được xây dựng với backend sử dụng Node.js, Express, và MongoDB, cùng với frontend sử dụng React và Vite.

## Mục Lục

- [Cài Đặt](#cài-đặt)
- [Backend](#backend)
  - [Biến Môi Trường](#biến-môi-trường)
  - [Scripts](#scripts)
  - [Dependencies](#dependencies)
- [Frontend](#frontend)
  - [Biến Môi Trường](#biến-môi-trường-1)
  - [Scripts](#scripts-1)
  - [Dependencies](#dependencies-1)
- [Cách Sử Dụng](#cách-sử-dụng)
- [Hướng Dẫn Đóng Góp](#hướng-dẫn-đóng-góp)
- [Giấy Phép](#giấy-phép)

## Cài Đặt

### Backend

1. Di chuyển vào thư mục `backend`:

    ```sh
    cd backend
    ```

2. Cài đặt các gói phụ thuộc:

    ```sh
    npm install
    ```

3. Tạo file `.env` trong thư mục `backend` và thêm các biến môi trường sau:

    ```env
    NODE_ENV=development
    PORT=8081
    MONGO_URI=mongodb://root:123456@localhost:27018/
    SECRET_KEY=secret
    ```

4. Khởi động server backend:

    ```sh
    npm run dev
    ```

### Frontend

1. Di chuyển vào thư mục `frontend/student_management`:

    ```sh
    cd frontend/student_management
    ```

2. Cài đặt các gói phụ thuộc:

    ```sh
    npm install
    ```

3. Tạo file `.env` trong thư mục `frontend/student_management` và thêm biến môi trường sau:

    ```env
    VITE_BACKEND_URL=http://localhost:8081
    ```

4. Khởi động server frontend:

    ```sh
    npm run dev
    ```

## Backend

### Biến Môi Trường

Backend yêu cầu các biến môi trường sau:

- `NODE_ENV`: Môi trường mà ứng dụng đang chạy (ví dụ: `development`, `production`).
- `PORT`: Cổng mà server sẽ sử dụng.
- `MONGO_URI`: URI kết nối với cơ sở dữ liệu MongoDB.
- `SECRET_KEY`: Khóa bí mật dùng cho xác thực JWT.

### Scripts

Backend cung cấp các script sau:

- `dev`: Khởi chạy server ở chế độ phát triển sử dụng `nodemon`.

### Dependencies

Backend sử dụng các thư viện sau:

- `bcrypt`: Hash mật khẩu.
- `cors`: Hỗ trợ Cross-Origin Resource Sharing.
- `dotenv`: Quản lý biến môi trường từ file `.env`.
- `express`: Xây dựng server.
- `jsonwebtoken`: Quản lý JSON Web Tokens.
- `mongoose`: Tương tác với MongoDB.

## Frontend

### Biến Môi Trường

Frontend yêu cầu biến môi trường sau:

- `VITE_BACKEND_URL`: URL của server backend.

### Scripts

Frontend cung cấp các script sau:

- `dev`: Khởi chạy server phát triển.
- `build`: Build ứng dụng cho môi trường production.
- `lint`: Kiểm tra mã nguồn với ESLint.
- `preview`: Xem trước phiên bản production.

### Dependencies

Frontend sử dụng các thư viện sau:

- `@ant-design/icons`: Icon của Ant Design.
- `@reduxjs/toolkit`: Quản lý trạng thái.
- `antd`: Các thành phần giao diện của Ant Design.
- `axios`: Thực hiện các yêu cầu HTTP.
- `react`: Xây dựng giao diện người dùng.
- `react-dom`: Kết xuất giao diện.
- `react-redux`: Kết nối React với Redux.
- `react-router-dom`: Xử lý điều hướng.
- `redux-persist`: Lưu trạng thái Redux.
- `sass`: Styling.

## Cách Sử Dụng

### Chạy Backend

1. Điều hướng đến thư mục `backend`:

    ```sh
    cd backend
    ```

2. Khởi chạy server:

    ```sh
    npm run dev
    ```

### Chạy Frontend

1. Điều hướng đến thư mục `frontend/student_management`:

    ```sh
    cd frontend/student_management
    ```

2. Khởi chạy server:

    ```sh
    npm run dev
    ```

## Hướng Dẫn Đóng Góp

1. Fork repository này.
2. Tạo một nhánh mới cho tính năng của bạn: `git checkout -b my-feature`.
3. Commit thay đổi của bạn: `git commit -m "Thêm tính năng mới"`.
4. Push nhánh của bạn: `git push origin my-feature`.
5. Tạo một Pull Request.

## Giấy Phép

Dự án này được phát hành dưới giấy phép [MIT](LICENSE).
