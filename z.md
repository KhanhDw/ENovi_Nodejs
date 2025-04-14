đăng nhập bằng google
api youtube

người dùng đăng nhập bằng google
thực hiện tải file lên hệ thống
chờ cho file đã tải lên hệ thống hoàn tất
file sẽ được tải lên youtube thông qua api
khi file tải lên youtube sẽ lấy {id, title, descripetion, tag} của video

/users/ge

/auth/
/auth/go
/auth/google
/auth/google/callback
/auth/logout

/search/search

-   các chức năng giành cho người dùng
-   các chức năng giành cho giảng viên
-   các chức năng giành cho admin

thêm user (user register)
thêm khóa học - thêm section - thêm lession
thêm bình luận
thêm đánh giá
thêm khóa học vào giỏ hàng
thêm lịch sử thanh toán
thêm lĩnh vực
thêm chi tiết khóa học
thêm thông báo, khi có người dùng mua khóa học sẽ thông báo ai mua, và mua khóa học nào
thêm học viên , khi mua thành công khóa học thì được thêm vào đây
thêm lịch sử thanh toán
thêm danh sách ngân hàng
thêm nội dung ghi chú
thêm ghi chú
thêm lưu phương thức thanh toán
thêm lịch sử thanh toán

đăng ký người dùng bằng google - ok
đăng ký người dùng bằng ENovi



để dùng ngrok thì :   pkill ngrok


-- cách public website 
cài đặt: npm install -g localtunnel 
public website với port đang dùng: lt --port 3000 --subdomain  <đặt tên web>
mở terminal cmd lấy password vào web: curl https://loca.lt/mytunnelpassword



// nếu bị lỗi server Error: listen EADDRINUSE: address already in use :::3000

mở cmd lấy số cuối cùng của dãy các số
--> netstat -aon | findstr :3000
taskkill /PID <nhập_số_tại_đây> /F
