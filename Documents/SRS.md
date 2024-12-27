# **Software Requirements Specification (SRS)**

## **1. Introduction**
### 1.1 Purpose
Tài liệu này mô tả yêu cầu chi tiết của hệ thống "Quản Lý Sinh Viên," bao gồm các chức năng chính, phi chức năng, giao diện người dùng, và các ràng buộc khác. Hệ thống nhằm hỗ trợ quản lý sinh viên, điểm số, khóa học, và nhóm học tập tại các cơ sở giáo dục đại học.

### 1.2 Scope
Hệ thống "Quản Lý Sinh Viên" là một ứng dụng web, tập trung vào:
- Quản lý thông tin cá nhân, điểm số và khóa học của sinh viên.
- Hỗ trợ phân công giảng viên, thiết lập lịch học.
- Bảo mật dữ liệu và cung cấp khả năng tích hợp với các nền tảng khác như hệ thống học tập trực tuyến và thanh toán học phí.

Người dùng chính bao gồm: sinh viên, quản lý khoa, và quản trị viên hệ thống.

### 1.3 Definitions, Acronyms, and Abbreviations
- **LMS**: Learning Management System (Hệ thống quản lý học tập).
- **2FA**: Two-Factor Authentication (Xác thực hai yếu tố).
- **API**: Application Programming Interface (Giao diện lập trình ứng dụng).

### 1.4 References
- Tài liệu tham khảo về bảo mật: "Implementing AES Encryption."
- Node.js Documentation.
- MongoDB Official Guide.

### 1.5 Overview
Hệ thống sẽ bao gồm giao diện thân thiện, chức năng quản lý toàn diện, và khả năng bảo mật cao, được triển khai trên nền tảng web.

---

## **2. Overall Description**
### 2.1 Product Perspective
Hệ thống này là một sản phẩm độc lập, tích hợp API với các nền tảng khác như hệ thống thanh toán, LMS, và dịch vụ thông báo.

### 2.2 Product Features
- Quản lý thông tin sinh viên.
- Quản lý điểm số và khóa học.
- Tạo và quản lý nhóm học tập.
- Bảo mật thông tin qua mã hóa và phân quyền truy cập.

### 2.3 User Classes and Characteristics
- **Sinh viên**: Tra cứu thông tin cá nhân, lịch học, điểm số.
- **Quản lý khoa**: Quản lý thông tin sinh viên, khóa học, và điểm số.
- **Quản trị viên hệ thống**: Quản lý toàn bộ dữ liệu và quyền truy cập.

### 2.4 Operating Environment
- **Nền tảng**: Web-based, hỗ trợ trên mọi trình duyệt hiện đại.
- **Công nghệ**: Node.js, MongoDB, HTML, CSS, JavaScript.

### 2.5 Design and Implementation Constraints
- Hệ thống phải sử dụng giao thức SSL/TLS cho bảo mật.
- Cơ sở dữ liệu MongoDB sẽ được triển khai với cấu trúc tập trung.

### 2.6 Assumptions and Dependencies
- Yêu cầu người dùng có kết nối internet ổn định.
- Các API tích hợp (LMS, thanh toán) phải hoạt động ổn định.

---

## **3. Specific Requirements**
### 3.1 Functional Requirements
- **FR1**: Thêm, sửa, xóa thông tin sinh viên.
- **FR2**: Nhập, tra cứu, và cập nhật điểm số.
- **FR3**: Tạo và cập nhật thông tin khóa học.
- **FR4**: Phân quyền truy cập cho sinh viên, quản lý khoa, và quản trị viên.
- **FR5**: Mã hóa dữ liệu nhạy cảm.

### 3.2 Non-Functional Requirements
- **NFR1**: Đáp ứng 95% yêu cầu trong thời gian xử lý dưới 2 giây.
- **NFR2**: Hệ thống phải hỗ trợ tối đa 10.000 người dùng đồng thời.
- **NFR3**: Giao diện thân thiện, hỗ trợ đa ngôn ngữ.

### 3.3 External Interface Requirements
- **User Interface**: Sử dụng giao diện responsive phù hợp với thiết bị di động.
- **Hardware Interface**: Hỗ trợ máy chủ với cấu hình tối thiểu: CPU 4 lõi, RAM 8GB.

### 3.4 System Features
- **Quản lý khóa học**: Cho phép thêm, sửa, xóa thông tin khóa học và phân công giảng viên.
- **Nhóm học tập**: Tạo nhóm học tập với chức năng chat nội bộ.

---

## **4. Appendices**
- **Phụ lục A**: Bảng phân quyền chi tiết giữa các vai trò người dùng.
- **Phụ lục B**: Quy trình sao lưu và phục hồi dữ liệu.
- **Phụ lục C**: Sơ đồ luồng dữ liệu của hệ thống.
