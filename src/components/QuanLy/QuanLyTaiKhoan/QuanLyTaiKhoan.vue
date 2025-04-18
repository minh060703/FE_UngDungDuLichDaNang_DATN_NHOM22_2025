<template>
    <div class="mt-5 bg-white">
        <div class="card bg-white rounded-3">
            <div class="row">
                <div id="example_wrapper" class="dataTables_wrapper dt-bootstrap4">
                    <!-- phần header -->
                    <div class="card-header" style="padding: 20px;">
                        <div>
                            <h2>Quản lý tài khoản</h2>
                        </div>
                    </div>
                    <div class="card-body" style="padding: 20px;">
                        <div class="d-flex justify-content-start align-items-center mb-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <div id="example_filter" class="dataTables_filter">
                                    <div style="position: relative;">
                                        <i class="fa-solid fa-magnifying-glass fa-flip-horizontal"
                                            style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #aaa;"></i>
                                        <input type="text" class="form-control radius-30 search" placeholder="Tìm kiếm "
                                            id="search" v-model="searchTerm" style="padding-left: 35px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- phần danh sách tài khoản -->
                        <div class="row">
                            <div class="col-sm-12">
                                <table style="width: 100%;font-size: 18px;" id="example" class="table table-hover  "
                                    role="grid" aria-describedby="example_info">
                                    <thead style="background-color: #f8f9fa;">
                                        <tr role="row">
                                            <th class="text-center">STT</th>
                                            <th>Tên người dùng</th>
                                            <th>Tên đăng nhập</th>
                                            <th>Email</th>
                                            <th class="text-center">Ngày sinh</th>
                                            <th class="text-center">Giới tính</th>
                                            <th class="text-center">Trạng thái</th>
                                            <th class="text-center">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody style="font-size: 16px;">
                                        <tr role="row" v-for="(value, index) in paginatedData" :key="index">
                                            <td class="text-center">{{ index + 1 + (currentPage - 1) * itemsPerPage }}
                                            </td>
                                            <td>{{ value.ten_nguoi_dung }}</td>
                                            <td>{{ value.ten_dang_nhap }}</td>
                                            <td>{{ value.email }}</td>
                                            <td class="text-center">{{ formatDate(value.ngay_sinh) }}</td>
                                            <td class="text-center">
                                                <span v-if="value.gioi_tinh == 1">Nam</span>
                                                <span v-else>Nữ</span>
                                            </td>
                                            <td style="text-align: center;font-size: 18px;">
                                                <a v-if="value.trang_thai == 0" class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3"><i
                                                    class='bx bxs-circle me-1'></i> ĐANG TẠM KHOÁ</a>
                                                <a v-else class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                                                    class='bx bxs-circle me-1'></i> ĐANG HOẠT ĐỘNG</a>
                                            </td>
                                            <td>
                                                <div class="d-flex justify-content-center">
                                                    <div class="d-flex order-actions justify-content-center">
                                                        <a href="javascript:;" class="ms-3" data-bs-toggle="modal"
                                                            data-bs-target="#ModalXemTaiKhoan"><i
                                                                class="fa-solid fa-eye"
                                                                @click="xemChiTietTaiKhoan(value)"></i></a>
                                                        <a href="javascript:;" class="ms-3" data-bs-toggle="modal"
                                                            data-bs-target="#ModalXoaTaiKhoan"
                                                            @click="hienThiModalXoa(value)"><i
                                                                class='bx bxs-trash'></i></a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- phần footer -->
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="dataTables_info" id="example_info" role="status" aria-live="polite">
                                {{ currentPage }} / {{ totalPages }}</div>
                            <div>
                                <div class="dt--pagination d-flex justify-content-end mt-3">
                                    <div class="dataTables_paginate paging_full_numbers">
                                        <ul class="pagination">

                                            <!-- Nút về đầu -->
                                            <li class="paginate_button page-item"
                                                :class="{ disabled: currentPage === 1 }">
                                                <a href="#" class="page-link" @click.prevent="currentPage = 1">
                                                    <i class="fa-solid fa-angles-left"></i>
                                                </a>
                                            </li>

                                            <!-- Nút trước -->
                                            <li class="paginate_button page-item"
                                                :class="{ disabled: currentPage === 1 }">
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
                                            <li class="paginate_button page-item"
                                                :class="{ disabled: currentPage === totalPages }">
                                                <a href="#" class="page-link" @click.prevent="currentPage++">
                                                    <i class="fa-solid fa-angle-right"></i>
                                                </a>
                                            </li>

                                            <!-- Nút cuối -->
                                            <li class="paginate_button page-item"
                                                :class="{ disabled: currentPage === totalPages }">
                                                <a href="#" class="page-link" @click.prevent="currentPage = totalPages">
                                                    <i class="fa-solid fa-angles-right"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal xoá tài khoản -->
    <div class="modal fade" id="ModalXoaTaiKhoan" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="content p-5 px-3 text-center">
                        <span class="fa-stack fa-2x mb-3">
                            <i class="fa-solid fa-2xl fa-circle" style="color: #ffc8c2;"></i>
                            <i class="fa-solid fa-trash-can text-danger fa-stack-1x"></i>
                        </span>
                        <h3 class="fs-20 text-gray-9 fw-bold mb-2 mt-1">Xoá tài khoản</h3>
                        <p class="text-gray-6 mb-0 fs-16">Bạn có chắc chắn muốn xoá tài khoản này không?</p>
                        <p class="text-gray-6 mb-0 fs-16">Sau khi xoá tài khoản này sẽ không còn hoạt động !</p>
                        <h5 class="mt-3">{{ tai_khoan.ten_nguoi_dung }} - {{ tai_khoan.ten_dang_nhap }}</h5>
                        <div class="modal-footer-btn mt-3 d-flex justify-content-center mt-5">
                            <button type="button" class="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                                data-bs-dismiss="modal" style="background-color: #FF2C2C;width: 30%;">Huỷ</button>
                            <button type="submit" class="btn btn-primary fs-13 fw-medium p-2 px-3"
                                @click="xoa_tai_khoan" style="background-color: #FE9F43;width: 30%;">Đồng ý xoá</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal xem tài khoản -->
    <div class="modal fade" id="ModalXemTaiKhoan" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content" style="padding: 20px;">
                <div class="modal-body">
                    <h3 class="text-center mb-4" style="font-size: 40px; font-weight: bold;">Chi tiết tài khoản</h3>
                    <div class="row row-cols-1 row-cols-md-2 g-3">
                        <div class="col">
                            <div class="card border-0 shadow-sm h-100">
                                <div class="card-body">
                                    <h5 class="card-title mb-3"><i class="fa-solid fa-user fa-xl me-2 text-primary"></i>
                                        Thông tin cá nhân
                                    </h5>
                                    <p class="card-text fs-5"><strong>Tên người dùng:</strong> {{
                                        tai_khoan.ten_nguoi_dung }}
                                    </p>
                                    <p class="card-text fs-5"><strong>Giới tính:</strong> <span
                                            v-if="tai_khoan.gioi_tinh == 1">Nam</span><span v-else>Nữ</span></p>
                                    <p class="card-text fs-5"><strong>Ngày sinh:</strong> {{
                                        formatDate(tai_khoan.ngay_sinh) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card border-0 shadow-sm h-100">
                                <div class="card-body">
                                    <h5 class="card-title mb-3"><i class="fa-solid fa-lock fa-xl me-2 text-success"></i>
                                        Thông tin đăng nhập
                                    </h5>
                                    <p class="card-text fs-5"><strong>Tên đăng nhập:</strong> {{ tai_khoan.ten_dang_nhap
                                        }}
                                    </p>
                                    <p class="card-text fs-5"><strong>Mật khẩu:</strong> {{ tai_khoan.mat_khau }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card border-0 shadow-sm h-100">
                                <div class="card-body">
                                    <h5 class="card-title mb-3"><i
                                            class="fa-solid fa-envelope fa-xl me-2 text-info"></i>
                                        Thông tin liên hệ
                                    </h5>
                                    <p class="card-text fs-5"><strong>Email:</strong> {{ tai_khoan.email }}</p>
                                    <p class="card-text fs-5"><strong>Số điện thoại:</strong> {{ tai_khoan.so_dien_thoai
                                        }}
                                    </p>
                                    <p class="card-text fs-5"><strong>Địa chỉ:</strong> {{ tai_khoan.dia_chi }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card border-0 shadow-sm h-100">
                                <div class="card-body">
                                    <h5 class="card-title mb-3"><i
                                            class="fa-solid fa-circle-info fa-xl me-2 text-warning"></i> Thông tin khác
                                    </h5>
                                    <p class="card-text fs-5"><strong>Trạng thái:</strong> <span
                                            v-if="tai_khoan.trang_thai == 1">Đang hoạt động</span><span v-else>Tạm
                                            khoá</span></p>
                                    <p class="card-text fs-5"><strong>Số điểm tích lũy:</strong> {{
                                        tai_khoan.diem_tich_luy }} <i class="fa-solid fa-star fa-lg"
                                            style="color: #FFD43B;"></i></p>
                                </div>
                            </div>
                        </div>
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
            itemsPerPage: 10, // Giới hạn 10 dòng thông tin trên table
            lists_tai_khoan: [
                { ten_nguoi_dung: "Nguyễn Văn A", ten_dang_nhap: "nguyenvana", mat_khau: "12345678", email: "vana@example.com", ngay_sinh: "1995-03-15", dia_chi: "123 Lê Lợi, Hải Châu, Đà Nẵng", so_dien_thoai: "0912345678", trang_thai: 1, diem_tich_luy: 1500, gioi_tinh: 1 },
                { ten_nguoi_dung: "Trần Thị B", ten_dang_nhap: "tranthib", mat_khau: "12345678", email: "btran@example.com", ngay_sinh: "1996-05-10", dia_chi: "45 Hoàng Diệu, Hải Châu, Đà Nẵng", so_dien_thoai: "0912345679", trang_thai: 0, diem_tich_luy: 1200, gioi_tinh: 0 },
                { ten_nguoi_dung: "Lê Văn C", ten_dang_nhap: "levanc", mat_khau: "12345678", email: "cle@example.com", ngay_sinh: "1994-12-20", dia_chi: "78 Nguyễn Văn Linh, Hải Châu", so_dien_thoai: "0912345680", trang_thai: 1, diem_tich_luy: 980, gioi_tinh: 1 },
                { ten_nguoi_dung: "Phạm Thị D", ten_dang_nhap: "phamthid", mat_khau: "12345678", email: "dpham@example.com", ngay_sinh: "1993-07-08", dia_chi: "23 Lý Thường Kiệt, Thanh Khê", so_dien_thoai: "0912345681", trang_thai: 0, diem_tich_luy: 1320, gioi_tinh: 0 },
                { ten_nguoi_dung: "Đỗ Văn E", ten_dang_nhap: "dovane", mat_khau: "12345678", email: "edov@example.com", ngay_sinh: "1992-01-25", dia_chi: "56 Trưng Nữ Vương, Hải Châu", so_dien_thoai: "0912345682", trang_thai: 1, diem_tich_luy: 2000, gioi_tinh: 1 },
                { ten_nguoi_dung: "Ngô Thị F", ten_dang_nhap: "ngothif", mat_khau: "12345678", email: "fngo@example.com", ngay_sinh: "1997-09-30", dia_chi: "89 Nguyễn Hữu Thọ, Hải Châu", so_dien_thoai: "0912345683", trang_thai: 0, diem_tich_luy: 400, gioi_tinh: 0 },
                { ten_nguoi_dung: "Võ Văn G", ten_dang_nhap: "vovang", mat_khau: "12345678", email: "gvo@example.com", ngay_sinh: "1990-11-11", dia_chi: "100 Phan Châu Trinh, Hải Châu", so_dien_thoai: "0912345684", trang_thai: 1, diem_tich_luy: 1800, gioi_tinh: 1 },
                { ten_nguoi_dung: "Huỳnh Thị H", ten_dang_nhap: "huynhthih", mat_khau: "12345678", email: "hhuynh@example.com", ngay_sinh: "1998-06-22", dia_chi: "12 Điện Biên Phủ, Thanh Khê", so_dien_thoai: "0912345685", trang_thai: 1, diem_tich_luy: 300, gioi_tinh: 0 },
                { ten_nguoi_dung: "Trịnh Văn I", ten_dang_nhap: "trinhvani", mat_khau: "12345678", email: "itrinh@example.com", ngay_sinh: "1991-08-19", dia_chi: "67 Hàm Nghi, Thanh Khê", so_dien_thoai: "0912345686", trang_thai: 0, diem_tich_luy: 1100, gioi_tinh: 1 },
                { ten_nguoi_dung: "Bùi Thị J", ten_dang_nhap: "buithij", mat_khau: "12345678", email: "jtran@example.com", ngay_sinh: "1996-04-14", dia_chi: "34 Lê Duẩn, Hải Châu", so_dien_thoai: "0912345687", trang_thai: 1, diem_tich_luy: 990, gioi_tinh: 0 },
                { ten_nguoi_dung: "Nguyễn Văn K", ten_dang_nhap: "nguyenvank", mat_khau: "12345678", email: "knguyen@example.com", ngay_sinh: "1995-10-02", dia_chi: "21 Nguyễn Chí Thanh", so_dien_thoai: "0912345688", trang_thai: 0, diem_tich_luy: 1050, gioi_tinh: 1 },
                { ten_nguoi_dung: "Trần Thị L", ten_dang_nhap: "tranthil", mat_khau: "12345678", email: "ltran@example.com", ngay_sinh: "1997-03-12", dia_chi: "49 Nguyễn Tri Phương", so_dien_thoai: "0912345689", trang_thai: 1, diem_tich_luy: 870, gioi_tinh: 0 },
                { ten_nguoi_dung: "Lê Văn M", ten_dang_nhap: "levanm", mat_khau: "12345678", email: "mle@example.com", ngay_sinh: "1993-05-18", dia_chi: "90 Âu Cơ, Liên Chiểu", so_dien_thoai: "0912345690", trang_thai: 0, diem_tich_luy: 300, gioi_tinh: 1 },
                { ten_nguoi_dung: "Phạm Thị N", ten_dang_nhap: "phamthin", mat_khau: "12345678", email: "npham@example.com", ngay_sinh: "1999-09-09", dia_chi: "11 Phan Đình Phùng", so_dien_thoai: "0912345691", trang_thai: 1, diem_tich_luy: 2100, gioi_tinh: 0 },
                { ten_nguoi_dung: "Đỗ Văn O", ten_dang_nhap: "dovano", mat_khau: "12345678", email: "odov@example.com", ngay_sinh: "1990-02-20", dia_chi: "7 Thanh Sơn", so_dien_thoai: "0912345692", trang_thai: 1, diem_tich_luy: 450, gioi_tinh: 1 },
                { ten_nguoi_dung: "Ngô Thị P", ten_dang_nhap: "ngothip", mat_khau: "12345678", email: "pngo@example.com", ngay_sinh: "1994-01-01", dia_chi: "88 Nguyễn Hoàng", so_dien_thoai: "0912345693", trang_thai: 0, diem_tich_luy: 1550, gioi_tinh: 0 },
                { ten_nguoi_dung: "Võ Văn Q", ten_dang_nhap: "vovanq", mat_khau: "12345678", email: "qvo@example.com", ngay_sinh: "1992-06-06", dia_chi: "10 Hùng Vương", so_dien_thoai: "0912345694", trang_thai: 1, diem_tich_luy: 990, gioi_tinh: 1 },
                { ten_nguoi_dung: "Huỳnh Thị R", ten_dang_nhap: "huynhthir", mat_khau: "12345678", email: "rhuynh@example.com", ngay_sinh: "1996-08-15", dia_chi: "55 Trần Phú", so_dien_thoai: "0912345695", trang_thai: 1, diem_tich_luy: 1330, gioi_tinh: 0 },
                { ten_nguoi_dung: "Trịnh Văn S", ten_dang_nhap: "trinhvans", mat_khau: "12345678", email: "strinh@example.com", ngay_sinh: "1991-07-07", dia_chi: "101 Bạch Đằng", so_dien_thoai: "0912345696", trang_thai: 0, diem_tich_luy: 760, gioi_tinh: 1 },
                { ten_nguoi_dung: "Bùi Thị T", ten_dang_nhap: "buithit", mat_khau: "12345678", email: "tbui@example.com", ngay_sinh: "1993-03-03", dia_chi: "33 Trần Cao Vân", so_dien_thoai: "0912345697", trang_thai: 1, diem_tich_luy: 1900, gioi_tinh: 0 }
            ],
            luu_tai_khoan: null,
            modalXoa: null,
            modalXem: null,
            isSelected: false, // Trạng thái để xác định xem có chọn tài khoản nào hay không

        }
    },
    computed: {
        filteredTaiKhoan() {
            const searchTerm = this.searchTerm.toLowerCase().replace(/\s/g, '');

            return this.lists_tai_khoan.filter(taiKhoan => {
                const tenNguoiDungLower = taiKhoan.ten_nguoi_dung.toLowerCase().replace(/\s/g, '');
                const tenDangNhapLower = taiKhoan.ten_dang_nhap.toLowerCase().replace(/\s/g, '');
                const emailLower = taiKhoan.email.toLowerCase().replace(/\s/g, '');

                return (
                    tenNguoiDungLower.includes(searchTerm) ||
                    tenDangNhapLower.includes(searchTerm) ||
                    emailLower.includes(searchTerm)
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
            return this.filteredTaiKhoan.slice(start, end);
        },
        mounted() {
            this.modalXoa = new bootstrap.Modal(document.getElementById('ModalXoaTaiKhoan'));
        },
    },
    mounted() {
        this.modalXoa = new bootstrap.Modal(document.getElementById('ModalXoaTaiKhoan'));

    },
    methods: {
        chon_tai_khoan(index) {
            this.Luu_tam = this.paginatedData[index]; // Lưu thông tin tài khoản đã chọn vào paginatedData
            this.isSelected = true; // Đặt trạng thái đã chọn để hiển thị bảng thông tin bên cạnh
            //this.luu_tai_khoan = index;  // Lưu index của tai khoản để xóa hoặc sửa
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        hienThiModalXoa(taiKhoanCanXoa) {
            this.tai_khoan = { ...taiKhoanCanXoa };
            this.modalXoa.show();
        },
        xemChiTietTaiKhoan(taiKhoan) {
            this.tai_khoan = { ...taiKhoan }; // Sao chép dữ liệu tài khoản vào biến tai_khoan
            const modalXemTaiKhoan = new bootstrap.Modal(document.getElementById('ModalXemTaiKhoan'));
            modalXemTaiKhoan.show(); // Hiển thị modal
        },
        xoa_tai_khoan() {
            // Tìm index của tài khoản cần xóa trong mảng lists_tai_khoan
            const indexToDelete = this.lists_tai_khoan.findIndex(
                (tk) => tk.ten_dang_nhap === this.tai_khoan.ten_dang_nhap
            );

            if (indexToDelete !== -1) {
                this.lists_tai_khoan.splice(indexToDelete, 1);
                this.modalXoa.hide();
                // Có thể thêm thông báo thành công ở đây
                console.log('Đã xóa tài khoản:', this.tai_khoan.ten_nguoi_dung);
                // Reset currentPage nếu trang hiện tại không còn dữ liệu
                if (this.paginatedData.length === 0 && this.currentPage > 1) {
                    this.currentPage--;
                }
            } else {
                console.error('Không tìm thấy tài khoản để xóa trong lists_tai_khoan');
                // Có thể thêm thông báo lỗi ở đây
            }
        },
        // Chuyển định danh ngày tháng năm thành dạng dd/mm/yyyy
        formatDate(dateStr) {
            const date = new Date(dateStr);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
            const year = date.getFullYear();
            return `${day} / ${month} / ${year}`;
        }
    },
    watch: {
        searchTerm() {
            this.currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm
        }
        // ... các watch khác của bạn
    },
}
</script>
<style></style>