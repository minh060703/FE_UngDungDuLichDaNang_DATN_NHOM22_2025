<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-8">
                <div class="header">
                    <h1>Danh sách tài khoản</h1>
                    <div class="search-wrapper">
                        <label for="search">Search:</label>
                        <input type="text" id="search">
                    </div>
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên đăng nhập</th>
                            <th>Trạng thái</th>
                            <th>Email</th>
                            <th>Loại tài khoản</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-for="(value, index) in lists_tai_khoan" :key="index" @click="chon_tai_khoan(index)">
                        <tr>
                            <td>{{ index + 1 }}</td>
                            <td>{{ value.ten_user }}</td>
                            <td>{{ value.trang_thai }}</td>
                            <td>{{ value.email }}</td>
                            <td>{{ value.loai_tai_khoan }}</td>
                            <td>{{ value.action }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="pagination">
                    <button class="btn-prev">Prev</button>
                    page 1
                    <button class="btn-next">Next</button>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="user-info">
                    <div class="user-icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="info-item">
                        <label>Tên user</label>
                        <div class="info-value"></div>
                    </div>
                    <div class="info-item">
                        <label>Mật khẩu</label>
                        <div class="info-value"></div>
                    </div>
                    <div class="info-item">
                        <label>Email</label>
                        <div class="info-value"></div>
                    </div>
                    <div class="info-item">
                        <label>Trạng thái</label>
                        <div class="info-value"></div>
                    </div>
                    <div class="info-item">
                        <label>Địa điểm</label>
                        <div class="info-value"></div>
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
            tai_khoan: {
                ten_user: "",
                mat_khau: "",
                email: "",
                trang_thai: "",
                dia_diem: "",
            },
            lists_tai_khoan: [
                {
                    ten_user: "Nguyên Văn A",
                    trang_thai: "Đang hoạt động",
                    email: "github@gmail.com",
                    loai_tai_khoan: "admin",
                    action: "Action",

                },
            ],
            luu_tai_khoan: null,
        }
    },
    methods: {
        chon_tai_khoan(index) {
            this.tai_khoan = { ...this.lists_tai_khoan[index] };  // Sao chép dữ liệu tài khoản vào tai_khoan
            this.luu_tai_khoan = index;  // Lưu index của tai khoản để xóa hoặc sửa
        },
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
    padding: 8px 16px;
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
</style>