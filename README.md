# ENovi_Nodejs

các bước cài đặt dự án trên window

1. tải và cài mysql workbench (bản community) --> mysql-workbench-community-8.0.42-winx64

2. tải và cài mysql installer (bản community) --> mysql-installer-community-8.0.42.0 (nên đặt mật khẩu là root [dễ nhớ])

3. kiểm tra server đã chạy (thường là cổng 3306)

4. cài nodejs

5. kiểm tra nodejs đã chạy ( dùng lệnh node -v và npm -v )

6. cài visual studio code

7. tải và cài git, sau đó -> tạo thư mục clone 2 dự án xuống
   back-end --> git clone https://github.com/KhanhDw/ENovi_Nodejs.git
   font-end --> git clone https://github.com/KhanhDw/ENovi.git

8. tạo cơ sỡ dữ liệu trên mysql workbench
   8.1. tìm file theo đường dẫn: ENovi_Nodejs\mySQL_Script\Finish.sql
   8.2. mở file lên bằng lệnh ctrl+shift+O chọn file
   8.3. tạo cơ sỡ dữ liệu theo thứ tự code bên trong
   8.4. thêm dữ liệu vào dựa theo thứ tự đã viết trong file bằng cách mở các file nằm cùng với file "finish.sql"

9. mở 2 cửa sổ visual studio code
   9.1. cửa sổ 1: truy cập vào dự án đã clone xuống bằng lệnh Ctrl + K , Ctrl + O ==> chọn thư mục backend
   9.1. cửa sổ 2: truy cập vào dự án đã clone xuống bằng lệnh Ctrl + K , Ctrl + O ==> chọn thư mục fontend

10. cài chứng chỉ xác nhận HTTPS (mới chạy được server của 2 dự án)
    10.1. Tải file mkcert cho window 64: "mkcert-v1.4.4-windows-amd64.exe" tại --> https://github.com/FiloSottile/mkcert/releases
    10.2. đổi tên file thành mkcert và đặt file mkcert.exe vào thư mục C:\mkcert (nếu không có thì tạo thư mục mkcert)
    10.3. Cài Local CA (chứng chỉ gốc tự ký)
    10.4. Mở CMD tại thư mục chứa file mkcert và chạy lệnh --> mkcert -install
    10.5. tạo chứng chỉ sử dụng bằng lệnh--> mkcert localhost . (không được thay đổi tên "localhost" thành tên file khác khác sẽ gây lỗi)
    10.6. copy 2 file vừa được tạo ra dán vào thư mục ENovi_Nodejs\cert của dự án (có thể xóa hoặc ghi đè file)

11. chạy dự án back-end trước bằng lệnh => npm run dev
    11.1. nếu có lỗi
    "npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system."
    --> thì chạy lệnh sau: --> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    Chạy lệnh này tại terminal của visual studio code, sau khi chạy lệnh fix lỗi thì run lại lệnh "npm run dev"


12. chạy dự án font-end bằng lệnh => npm run startssl

13. truy cập trang web https://localhost:4200 của địa chỉ font-end và tận hưởng