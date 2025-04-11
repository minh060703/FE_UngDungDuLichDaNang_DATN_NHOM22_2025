<template>
    <div class="mt-5">
        <div class="row">
            <div class="col-lg-12" v-bind:class="{ 'col-lg-12': !isSelected, 'col-lg-8': isSelected }">
                <div class="header">
                    <h1>Danh sách tài khoản</h1>
                    <div class="search-wrapper">
                        <label for="search" class="text-teal-500 mr-2" style="font-size: 25px;">Search:</label>
                        <input class="search" type="text" id="search" v-model="searchTerm" placeholder="Tìm kiếm tên...">
                    </div>
                </div>
                <!-- Bảng thông tin tài khoản -->
                <div class="card-table card">
                    <table class="table table-bordered" >
                        <thead  style="background-color: #C9C9C9;border-radius: 10px;">
                            <tr>
                                <th>STT</th>
                                <th>Tên người dùng</th>
                                <th>Tên đăng nhập</th>
                                <th>Trạng thái</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(value, index) in paginatedData" :key="index" @click="chon_tai_khoan(index)">
                                <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
                                <td>{{ value.ten_nguoi_dung }}</td>
                                <td>{{ value.ten_dang_nhap }}</td>
                                <td>{{ value.trang_thai }}</td>
                                <td>{{ value.email }}</td>
                                <td class="button justify-content-between" style="width: 30%;">
                                    <button class="btn-khoa"
                                        style="background-color: #F9CA24; border-radius: 10px; width: 100px; color: white; border: 0px; height: 30px;width: 30%;   margin: 5px;">Khoá</button>
                                    <button class="btn-xoa"
                                        style="background-color: #E32929; border-radius: 10px; width: 100px; color: white; border: 0px; height: 30px;width: 30%;    margin: 5px;">Xoá</button>
                                    <button class="btn-chitiet"
                                        style="background-color: #58D0C1; border-radius: 10px; width: 100px; color: white; border: 0px; height: 30px;width: 30%;    margin: 5px;">Xem
                                        chi tiết</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Nút chuyển trang của bảng -->
                <div class="dt--bottom-section d-sm-flex justify-content-sm-between text-center mt-3">
                    <div class="dt--pages-count mb-sm-0 mb-3">
                        <div class="dataTables_info" role="status" aria-live="polite">
                            Trang {{ currentPage }} / {{ totalPages }}
                        </div>
                    </div>
                    <div class="dt--pagination">
                        <div class="dataTables_paginate paging_full_numbers">
                            <ul class="pagination">

                                <!-- Nút về đầu -->
                                <li class="paginate_button page-item" :class="{ disabled: currentPage === 1 }">
                                    <a href="#" class="page-link" @click.prevent="currentPage = 1">
                                        <i class="fa-solid fa-angles-left"></i>
                                    </a>
                                </li>

                                <!-- Nút trước -->
                                <li class="paginate_button page-item" :class="{ disabled: currentPage === 1 }">
                                    <a href="#" class="page-link" @click.prevent="currentPage--">
                                        <i class="fa-solid fa-angle-left"></i>
                                    </a>
                                </li>

                                <!-- Các trang -->
                                <li class="paginate_button page-item" v-for="page in totalPages" :key="page"
                                    :class="{ active: page === currentPage }">
                                    <a href="#" class="page-link" @click.prevent="currentPage = page">{{
                                        page }}</a>
                                </li>

                                <!-- Nút sau -->
                                <li class="paginate_button page-item" :class="{ disabled: currentPage === totalPages }">
                                    <a href="#" class="page-link" @click.prevent="currentPage++">
                                        <i class="fa-solid fa-angle-right"></i>
                                    </a>
                                </li>

                                <!-- Nút cuối -->
                                <li class="paginate_button page-item" :class="{ disabled: currentPage === totalPages }">
                                    <a href="#" class="page-link" @click.prevent="currentPage = totalPages">
                                        <i class="fa-solid fa-angles-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Thông tin chi tiết người dùng -->
            <div v-if="isSelected" class="col-lg-4">
                <div class="user-info">
                    <div class="text-end">
                        <button type="button" class="btn-close" @click="Nuttat"></button><!-- Nút tắt -->
                    </div>
                    <div class="user-icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="info-item">
                        <label>Tên người dùng</label>
                        <div class="info-value">{{ Luu_tam.ten_nguoi_dung }}</div>
                    </div>
                    <div class="info-item">
                        <label>Tên đăng nhập</label>
                        <div class="info-value">{{ Luu_tam.ten_dang_nhap }}</div>
                    </div>
                    <div class="info-item">
                        <label>Mật khẩu</label>
                        <div class="info-value">{{ Luu_tam.mat_khau }}</div>
                    </div>
                    <div class="info-item">
                        <label>Email</label>
                        <div class="info-value">{{ Luu_tam.email }}</div>
                    </div>
                    <div class="info-item">
                        <label>Ngày sinh</label>
                        <div class="info-value">{{ Luu_tam.ngay_sinh }}</div>
                    </div>
                    <div class="info-item">
                        <label>Giới tính</label>
                        <div class="info-value">{{ Luu_tam.gioi_tinh }}</div>
                    </div>
                    <div class="info-item">
                        <label>Số điện thoại</label>
                        <div class="info-value">{{ Luu_tam.so_dien_thoai }}</div>
                    </div>
                    <div class="info-item">
                        <label>Trạng thái</label>
                        <div class="info-value">{{ Luu_tam.trang_thai }}</div>
                    </div>
                    <div class="info-item">
                        <label>Địa chỉ</label>
                        <div class="info-value">{{ Luu_tam.dia_chi }}</div>
                    </div>
                    <div class="info-item">
                        <label>Điểm tích lũy</label>
                        <div class="info-value">{{ Luu_tam.diem_tich_luy }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


export default {

    data() {
        return {
            Luu_tam: {}, // Lưu thông tin tài khoản đã chọn
            tai_khoan: {
                ten_nguoi_dung: "",
                ten_dang_nhap: "",
                mat_khau: "",
                email: "",
                ngay_sinh: "",
                dia_chi: "",
                so_dien_thoai: "",
                trang_thai: "",
                diem_tich_luy: "",
                gioi_tinh: ""
            },
            searchTerm: '', // Dữ liệu tìm kiếm 
            currentPage: 1, // Trang bắt đầu với page 1
            itemsPerPage: 8, // Giới hạn 8 dòng thông tin trên table
            lists_tai_khoan: [
                { ten_nguoi_dung: "Nguyễn Văn A", ten_dang_nhap: "nguyenvana", mat_khau: "12345678", email: "vana@example.com", ngay_sinh: "1995-03-15", dia_chi: "123 Lê Lợi, Hải Châu, Đà Nẵng", so_dien_thoai: "0912345678", trang_thai: "Đang hoạt động", diem_tich_luy: "1500", gioi_tinh: "nam" },
                { ten_nguoi_dung: "Trần Thị B", ten_dang_nhap: "tranthib", mat_khau: "matkhauB123", email: "thib@example.com", ngay_sinh: "1998-07-22", dia_chi: "456 Trần Phú, Thanh Khê, Đà Nẵng", so_dien_thoai: "0987654321", trang_thai: "Tạm khoá", diem_tich_luy: "820", gioi_tinh: "nữ" },
                { ten_nguoi_dung: "Lê Minh C", ten_dang_nhap: "leminhc", mat_khau: "abc12345", email: "minhc@example.com", ngay_sinh: "1990-12-05", dia_chi: "789 Nguyễn Văn Linh, Cẩm Lệ, Đà Nẵng", so_dien_thoai: "0909123456", trang_thai: "Đang hoạt động", diem_tich_luy: "2200", gioi_tinh: "nam" },
                { ten_nguoi_dung: "Phạm Thị D", ten_dang_nhap: "phamthid", mat_khau: "pass1234", email: "thid@example.com", ngay_sinh: "1996-11-10", dia_chi: "21 Hoàng Diệu, Sơn Trà, Đà Nẵng", so_dien_thoai: "0934567890", trang_thai: "Đang hoạt động", diem_tich_luy: "1340", gioi_tinh: "nữ" },
                { ten_nguoi_dung: "Hoàng Văn E", ten_dang_nhap: "hoangvane", mat_khau: "ehoang321", email: "vane@example.com", ngay_sinh: "1993-06-25", dia_chi: "101 Hùng Vương, Liên Chiểu, Đà Nẵng", so_dien_thoai: "0978123456", trang_thai: "Tạm khoá", diem_tich_luy: "450", gioi_tinh: "nam" },
                { ten_nguoi_dung: "Đỗ Thị F", ten_dang_nhap: "dothif", mat_khau: "dothi@123", email: "thif@example.com", ngay_sinh: "1999-08-18", dia_chi: "12 Lý Thường Kiệt, Đà Nẵng", so_dien_thoai: "0911223344", trang_thai: "Đang hoạt động", diem_tich_luy: "960", gioi_tinh: "nữ" },
                { ten_nguoi_dung: "Võ Văn G", ten_dang_nhap: "vovang", mat_khau: "vang1234", email: "vang@example.com", ngay_sinh: "1988-04-14", dia_chi: "333 Điện Biên Phủ, Đà Nẵng", so_dien_thoai: "0966554433", trang_thai: "Đang hoạt động", diem_tich_luy: "3100", gioi_tinh: "nam" },
                { ten_nguoi_dung: "Ngô Thị H", ten_dang_nhap: "ngothih", mat_khau: "passwordH", email: "thih@example.com", ngay_sinh: "1991-02-20", dia_chi: "56 Nguyễn Tri Phương, Đà Nẵng", so_dien_thoai: "0933557799", trang_thai: "Tạm khoá", diem_tich_luy: "760", gioi_tinh: "nữ" },
                { ten_nguoi_dung: "Phan Văn I", ten_dang_nhap: "phanvani", mat_khau: "i1234567", email: "vani@example.com", ngay_sinh: "1992-09-30", dia_chi: "89 Nguyễn Hữu Thọ, Đà Nẵng", so_dien_thoai: "0988112233", trang_thai: "Đang hoạt động", diem_tich_luy: "1890", gioi_tinh: "nam" },
                { ten_nguoi_dung: "Bùi Thị J", ten_dang_nhap: "buithij", mat_khau: "jpass789", email: "thij@example.com", ngay_sinh: "2000-01-12", dia_chi: "321 Phan Châu Trinh, Đà Nẵng", so_dien_thoai: "0907766554", trang_thai: "Đang hoạt động", diem_tich_luy: "540", gioi_tinh: "nữ" },
                { ten_nguoi_dung: "Mai Văn K", ten_dang_nhap: "maivank", mat_khau: "k123pass", email: "vank@example.com", ngay_sinh: "1985-05-09", dia_chi: "5 Hoàng Hoa Thám, Đà Nẵng", so_dien_thoai: "0944112255", trang_thai: "Tạm khoá", diem_tich_luy: "300", gioi_tinh: "nam" },
                { ten_nguoi_dung: "Lương Thị L", ten_dang_nhap: "luongthil", mat_khau: "luong123", email: "thil@example.com", ngay_sinh: "1997-07-07", dia_chi: "9 Phạm Văn Đồng, Đà Nẵng", so_dien_thoai: "0922334455", trang_thai: "Đang hoạt động", diem_tich_luy: "1220", gioi_tinh: "nữ" },
                { ten_nguoi_dung: "Tô Văn M", ten_dang_nhap: "tovanm", mat_khau: "123m456", email: "vanm@example.com", ngay_sinh: "1994-10-11", dia_chi: "22 Nguyễn Văn Thoại, Đà Nẵng", so_dien_thoai: "0966778899", trang_thai: "Đang hoạt động", diem_tich_luy: "1100", gioi_tinh: "nam" },
                { ten_nguoi_dung: "Đinh Thị N", ten_dang_nhap: "dinhthin", mat_khau: "n987pass", email: "thin@example.com", ngay_sinh: "1993-03-03", dia_chi: "4 Nguyễn Chí Thanh, Đà Nẵng", so_dien_thoai: "0933445566", trang_thai: "Tạm khoá", diem_tich_luy: "780", gioi_tinh: "nữ" },
                { ten_nguoi_dung: "Vũ Văn O", ten_dang_nhap: "vuvano", mat_khau: "passo123", email: "vano@example.com", ngay_sinh: "1989-08-19", dia_chi: "45 Nguyễn Du, Đà Nẵng", so_dien_thoai: "0911778899", trang_thai: "Đang hoạt động", diem_tich_luy: "2430", gioi_tinh: "nam" },
                { ten_nguoi_dung: "Nguyễn Thị P", ten_dang_nhap: "nguyenthp", mat_khau: "p321nguyen", email: "thip@example.com", ngay_sinh: "1996-06-26", dia_chi: "77 Hàm Nghi, Đà Nẵng", so_dien_thoai: "0909988776", trang_thai: "Tạm khoá", diem_tich_luy: "670", gioi_tinh: "nữ" },
                { ten_nguoi_dung: "Cao Văn Q", ten_dang_nhap: "caovanq", mat_khau: "qpass456", email: "vanq@example.com", ngay_sinh: "1991-01-01", dia_chi: "65 Tôn Đức Thắng, Đà Nẵng", so_dien_thoai: "0977889900", trang_thai: "Đang hoạt động", diem_tich_luy: "1010", gioi_tinh: "nam" },
                { ten_nguoi_dung: "Hà Thị R", ten_dang_nhap: "hathir", mat_khau: "r456789", email: "thir@example.com", ngay_sinh: "1995-12-13", dia_chi: "11 Bạch Đằng, Đà Nẵng", so_dien_thoai: "0933441122", trang_thai: "Tạm khoá", diem_tich_luy: "420", gioi_tinh: "nữ" },
                { ten_nguoi_dung: "Phùng Văn S", ten_dang_nhap: "phungvans", mat_khau: "sphung123", email: "vans@example.com", ngay_sinh: "1987-11-17", dia_chi: "31 Nguyễn Tất Thành, Đà Nẵng", so_dien_thoai: "0944887766", trang_thai: "Đang hoạt động", diem_tich_luy: "1720", gioi_tinh: "nam" },
                { ten_nguoi_dung: "Đặng Thị T", ten_dang_nhap: "dangthit", mat_khau: "tthidang", email: "thit@example.com", ngay_sinh: "1992-04-06", dia_chi: "14 Quang Trung, Đà Nẵng", so_dien_thoai: "0988334455", trang_thai: "Tạm khoá", diem_tich_luy: "900", gioi_tinh: "nữ" }
            ],
            luu_tai_khoan: null,
            isSelected: false, // Trạng thái để xác định xem có chọn tài khoản nào hay không

        }
    },
    computed: {
        lists_tai_khoan() {
            return this.lists_tai_khoan.filter(product => {
                const searchTerm = this.searchTerm.toLowerCase();


                // Tìm kiếm theo tên và tên đăng nhập
                // Hàm normalizeString để loại bỏ dấu
                const normalizeString = (str) => {
                    // Chuyển chuỗi thành dạng NFD (Normalization Form D), phân tách dấu và ký tự
                    // Sau đó loại bỏ tất cả các ký tự dấu phụ (diacritics) bằng cách sử dụng biểu thức chính quy
                    // Ví dụ: "á" sẽ thành "a", "đ" sẽ thành "d", "Đ" thành "D"
                    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                };
                // Kiểm tra nếu tên đăng nhập hoặc tên người dùng chứa từ khóa tìm kiếm (không phân biệt dấu và chữ hoa/thường)
                return (
                    normalizeString(product.ten_nguoi_dung).includes(normalizeString(searchTerm)) || // Kiểm tra tên người dùng
                    normalizeString(product.ten_dang_nhap).includes(normalizeString(searchTerm)) // Kiểm tra tên đăng nhập
                );
            });
        },


        totalPages() {
            return Math.ceil(this.lists_tai_khoan.length / this.itemsPerPage);
        },
        // paginatedData để điều chỉnh thông tin sao cho khi chuyển page thì thông tin theo mới
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.lists_tai_khoan.slice(start, end);
        }
    },
    methods: {
        chon_tai_khoan(index) {
            this.Luu_tam = this.paginatedData[index]; // Lưu thông tin tài khoản đã chọn vào paginatedData
            this.isSelected = true; // Đặt trạng thái đã chọn để hiển thị bảng thông tin bên cạnh
            //this.luu_tai_khoan = index;  // Lưu index của tai khoản để xóa hoặc sửa
        },
        Nuttat() {
            // Khi nhấn nút, sẽ tắt/hủy chọn thông tin chi tiết
            this.isSelected = false; // Trạng thái để xác định xem có chọn tài khoản nào hay không
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        }
    },
}
</script>
<style>
.row {
    display: flex;
    flex-wrap: wrap;
}

.col-lg-8 {
    flex: 0 0 66.67%;
    /* Cột chiếm 66% chiều rộng */
    padding-right: 15px;
}

/* Header section style */
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    /* Khoảng cách dưới */
}

.header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #14b8a6;
    /* Màu chữ cho tiêu đề */
}

/* Search input style */
.search-wrapper {
    display: flex;
    align-items: center;
}

.search-wrapper label {
    color: #14b8a6;
    /* Màu chữ cho label */
    margin-right: 8px;
    font-size: 25px;
}

.search-wrapper input {
    border: 2px solid aquamarine;
    border-radius: 10px;
    height: 45px;
}

/* Table style */
table {
    width: 100%;
    border: 1px solid #000;
}

table:hover {
    cursor: pointer;
}

table th,
table td {
    text-align: center;
    padding: 8px;
    /* Khoảng cách trong các ô */
}

/* Pagination style */
.pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.pagination button {
    border: 1px solid #14b8a6;
    /* Màu viền của nút */
    padding: 1px 1px 1px 5px;
    background-color: transparent;
    color: #14b8a6;
    /* Màu chữ cho nút */
    border-radius: 6px;
    cursor: pointer;
}

/* Right column user info */
.col-lg-4 {
    flex: 0 0 33.33%;
    /* Cột chiếm 33% chiều rộng */
}

.user-info {
    border: 2px solid #14b8a6;
    padding: 16px;
    border-radius: 8px;
    width: 100%;
}

/* User icon */
.user-icon {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
}

.user-icon i {
    font-size: 2rem;
    color: #14b8a6;
    /* Màu icon */
}

/* Info items */
.info-item {
    margin-bottom: 12px;
}

.info-item label {
    display: block;
    color: #14b8a6;
    /* Màu label */
    margin-bottom: 4px;
}

.info-value {
    height: 40px;
    background-color: #e6f7f3;
    /* Màu nền cho thông tin */
    padding: 8px;
    border-radius: 6px;
    color: #58D0C1;
    /* Màu chữ thông tin */
}

.card-table {
    padding: 10px;
    height: auto;
}

.pagination .btn {
    margin: 12px;
}

.card-table .table tbody tr td .button .btn-khoa {
    width: 100px;
    border-radius: 15px;
}
</style>
