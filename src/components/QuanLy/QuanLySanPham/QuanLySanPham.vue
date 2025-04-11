<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h2>Quản lý sản phẩm</h2>
                </div>
                <div class="card-body">
                    <div class="mt-3">
                        <label>Mã sản phẩm:</label>
                        <input type="text" v-model="san_pham.ma_san_pham">
                    </div>
                    <div class="mt-3">
                        <label>Tên sản phẩm:</label>
                        <input type="text" v-model="san_pham.ten_san_pham">
                    </div>
                    <div class="mt-3">
                        <label>Giá:</label>
                        <input type="number" v-model="san_pham.gia">
                    </div>
                    <div class="mt-3">
                        <label>Điểm:</label>
                        <input type="number" v-model="san_pham.sao">
                    </div>
                    <div class="mt-3">
                        <label>Số lượng:</label>
                        <input type="number" v-model="san_pham.so_luong">
                    </div>
                    <div class="mt-3">
                        <label>Hình ảnh:</label>
                        <input type="text" v-model="san_pham.hinh_anh">
                    </div>
                    <div class="mt-3">
                        <label style="vertical-align: top;">Mô tả:</label>
                        <textarea v-model="san_pham.mo_ta" style="height: 140px;"></textarea>
                    </div>
                </div>
                <div class="d-flex flex-row-reverse">
                    <button class="btn " type="button" v-on:click="them_san_pham">Thêm</button>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="flex d-flex flex-row-reverse">
                <input class="search" type="text" id="search" v-model="searchTerm" placeholder="Tìm kiếm tên...">
                <label for="search" class="text-teal-500 mr-2" style="font-size: 25px;">Search:</label>
            </div>
            <div class="list-product layout-spacing">
                <div class="widget-content widget-content-area br-6">
                    <div id="alter_pagination_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4">
                        <div class="table-responsive bg-white">
                            <table id="alter_pagination" class="table table-hover dataTable" style="width: 100%;"
                                role="grid" aria-describedby="alter_pagination_info">
                                <thead class="thead-light">
                                    <tr role="row">
                                        <th class="text-center" style="width: 1px;">STT</th>
                                        <th class="text-center" style="width: 200px;">Tên sản phẩm</th>
                                        <th class="text-center" style="width: 110px;">Hình ảnh</th>
                                        <th class="text-center" style="width: 90px;">Số lượng</th>
                                        <th class="text-center" style="width: 130px;">Đơn giá</th>
                                        <th class="text-center" style="width: 60px;">Điểm</th>
                                        <th class="text-center" style="width: 100px;">Danh mục</th>
                                        <th class="text-center" style="width: 101px;">Nhà cung cấp</th>
                                        <th class="text-center" style="width: 300px;">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr role="row" v-for="(value, index) in paginatedSanPham" :key="index">
                                        <td class="sorting_1">{{ index + 1 + (currentPage - 1) * itemsPerPage }}
                                        </td>
                                        <td>{{ value.ten_san_pham }}</td>
                                        <td><img v-bind:src="value.hinh_anh" class="" alt=""
                                                style="max-width: 100px;max-height: 100px; height: 100px;border-radius: 10px;">
                                        </td>
                                        <td>{{ value.so_luong }}</td>
                                        <td>{{ value.gia }} đ</td>
                                        <td>{{ value.sao }}</td>
                                        <td>{{ value.danh_muc }}</td>
                                        <td>{{ value.nha_cung_cap }}</td>
                                        <td>
                                            <div class="d-flex justify-content-center">
                                                <button type="button" class="btn btn-warning me-2"
                                                    data-bs-toggle="modal" data-bs-target="#exampleModal">Chinh
                                                    sua</button>
                                                <button type="button" class="btn btn-danger"
                                                    v-on:click="xoa_san_pham(index)">Xoá</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thông tin sản phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <label class="block text-gray-700">Mã sản phẩm</label>
                        <input type="text" class="input-text w-full border rounded p-2">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Tên sản phẩm</label>
                        <input type="text" class="input-text w-full border rounded p-2">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Giá</label>
                        <input type="text" class="input-text w-full border rounded p-2">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Điểm</label>
                        <input type="text" class="input-text w-full border rounded p-2">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Số lượng</label>
                        <input type="text" class="input-text w-full border rounded p-2">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Danh mục</label>
                        <input type="text" class="input-text w-full border rounded p-2">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Hình ảnh</label>
                        <input type="text" class="input-text w-full border rounded p-2">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Mô tả</label>
                        <textarea type="text" class="input-text w-full border rounded p-2"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        style="background-color: #FF2C2C;">Huỷ</button>
                    <button type="button" class="btn btn-primary" style="background-color: #58D0C1;">Tạo</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 6,
            searchTerm: '', // Dữ liệu tìm kiếm 
            lists_san_pham: [
                {
                    hinh_anh: "https://pos.nvncdn.com/f4d87e-8901/ps/20241204_SMAM3J8dpt.jpeg",
                    ten_san_pham: "Áo khoác",
                    sao: 200,
                    danh_muc: "Giải trí",
                    nha_cung_cap: "Puma",
                    mo_ta: "Áo khoác mùa đông chống gió, giữ ấm tốt.",
                    gia: "200.000",
                    so_luong: 10,
                    ma_san_pham: "SP001"  // Mã sản phẩm
                },
                {
                    hinh_anh: "https://img.bitas.com.vn/sanpham/ZGOM.20/NAU/lg1.png",
                    ten_san_pham: "Giày thể thao",
                    sao: 150,
                    danh_muc: "Giải trí",
                    nha_cung_cap: "Puma",
                    mo_ta: "Giày thể thao nhẹ, thoáng khí, phù hợp tập luyện.",
                    gia: "350.000",
                    so_luong: 20,
                    ma_san_pham: "SP002"  // Mã sản phẩm
                },
                {
                    hinh_anh: "https://kakavietnam.com/wp-content/uploads/2018/03/kk-2070-1.jpg",
                    ten_san_pham: "Balo du lịch",
                    sao: 180,
                    danh_muc: "Giải trí",
                    nha_cung_cap: "Puma",
                    mo_ta: "Balo chống nước, phù hợp cho du lịch và công việc.",
                    gia: "500.000",
                    so_luong: 15,
                    ma_san_pham: "SP003"  // Mã sản phẩm
                },
                {
                    hinh_anh: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_2_1.png",
                    ten_san_pham: "Đồng hồ thông minh",
                    sao: 300,
                    danh_muc: "Giải trí",
                    nha_cung_cap: "Puma",
                    mo_ta: "Đồng hồ thông minh với nhiều tính năng sức khỏe.",
                    gia: "1.200.000",
                    so_luong: 8,
                    ma_san_pham: "SP004"  // Mã sản phẩm
                },
                {
                    hinh_anh: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_2_1.png",
                    ten_san_pham: "Đồng hồ thông minh",
                    sao: 300,
                    danh_muc: "Giải trí",
                    nha_cung_cap: "Puma",
                    mo_ta: "Đồng hồ thông minh với nhiều tính năng sức khỏe.",
                    gia: "1.200.000",
                    so_luong: 8,
                    ma_san_pham: "SP004"  // Mã sản phẩm
                },
                {
                    hinh_anh: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_2_1.png",
                    ten_san_pham: "Đồng hồ thông minh",
                    sao: 300,
                    danh_muc: "Giải trí",
                    nha_cung_cap: "Puma",
                    mo_ta: "Đồng hồ thông minh với nhiều tính năng sức khỏe.",
                    gia: "1.200.000",
                    so_luong: 8,
                    ma_san_pham: "SP004"  // Mã sản phẩm
                },
                {
                    hinh_anh: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_2_1.png",
                    ten_san_pham: "Đồng hồ thông minh",
                    sao: 300,
                    danh_muc: "Giải trí",
                    nha_cung_cap: "Puma",
                    mo_ta: "Đồng hồ thông minh với nhiều tính năng sức khỏe.",
                    gia: "1.200.000",
                    so_luong: 8,
                    ma_san_pham: "SP004"  // Mã sản phẩm
                },
                {
                    hinh_anh: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_2_1.png",
                    ten_san_pham: "Đồng hồ thông minh",
                    sao: 300,
                    danh_muc: "Giải trí",
                    nha_cung_cap: "Puma",
                    mo_ta: "Đồng hồ thông minh với nhiều tính năng sức khỏe.",
                    gia: "1.200.000",
                    so_luong: 8,
                    ma_san_pham: "SP004"  // Mã sản phẩm
                },
                {
                    hinh_anh: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_2_1.png",
                    ten_san_pham: "Đồng hồ thông minh",
                    sao: 300,
                    danh_muc: "Giải trí",
                    nha_cung_cap: "Puma",
                    mo_ta: "Đồng hồ thông minh với nhiều tính năng sức khỏe.",
                    gia: "1.200.000",
                    so_luong: 8,
                    ma_san_pham: "SP004"  // Mã sản phẩm
                },

            ],
            san_pham: {
                hinh_anh: "",
                ten_san_pham: "",
                sao: "",
                mo_ta: "",
                gia: "",
                so_luong: "",
                ma_san_pham: "",
                danh_muc: "",
                nha_cung_cap: "",
            },
            danh_muc_can_xoa: null,
        };

    },
    computed: {
        lists_san_pham() {
            return this.lists_san_pham.filter(product => {
                const searchTerm = this.searchTerm.toLowerCase();


                // Tìm kiếm theo tên và mã sản phẩm
                // Hàm normalizeString để loại bỏ dấu
                const normalizeString = (str) => {
                    // Chuyển chuỗi thành dạng NFD (Normalization Form D), phân tách dấu và ký tự
                    // Sau đó loại bỏ tất cả các ký tự dấu phụ (diacritics) bằng cách sử dụng biểu thức chính quy
                    // Ví dụ: "á" sẽ thành "a", "đ" sẽ thành "d", "Đ" thành "D"
                    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                };

                // Kiểm tra nếu tên sản phẩm hoặc mã sản phẩm chứa từ khóa tìm kiếm (không phân biệt dấu và chữ hoa/thường)
                return (
                    normalizeString(product.ten_san_pham).includes(normalizeString(searchTerm)) || // Kiểm tra tên sản phẩm
                    normalizeString(product.ma_san_pham).includes(normalizeString(searchTerm)) // Kiểm tra mã sản phẩm
                );
            });
        },
        paginatedSanPham() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.lists_san_pham.slice(start, start + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.lists_san_pham.length / this.itemsPerPage);
        }
    },
    methods: {
        chon_san_pham(index) {
            this.san_pham = { ...this.lists_san_pham[index] };  // Sao chép dữ liệu sản phẩm vào san_pham
            this.danh_muc_can_xoa = index;  // Lưu index của sản phẩm để xóa hoặc sửa
        },
        them_san_pham() {
            this.lists_san_pham.push(this.san_pham);
            this.san_pham = {
                ma_san_pham: '',
                hinh_anh: '',
                ten_san_pham: '',
                sao: '',
                mo_ta: '',
                gia: '',
                so_luong: ''
            };
        },
        sua_san_pham() {
            if (this.danh_muc_can_xoa !== null) {
                this.lists_san_pham[this.danh_muc_can_xoa] = { ...this.san_pham };
                this.san_pham = {
                    hinh_anh: '',
                    ten_san_pham: '',
                    sao: '',
                    mo_ta: '',
                    gia: '',
                    so_luong: ''
                };
                this.danh_muc_can_xoa = null;
            }
        },
        xoa_san_pham() {
            if (this.danh_muc_can_xoa !== null) {
                this.lists_san_pham.splice(this.danh_muc_can_xoa, 1);
                this.san_pham = {
                    hinh_anh: '',
                    ten_san_pham: '',
                    sao: '',
                    mo_ta: '',
                    gia: '',
                    so_luong: ''
                };
                this.danh_muc_can_xoa = null;
            }
        }
    }

}
</script>
<style>
/* Quản lý sản phẩm */
.row .col-lg-4 .card {
    border-radius: 20px;
    margin: 0px;
}

.row .col-lg-4 .card .card-header {
    display: flex;
    background-color: #D9D9D9;
    align-items: center;
    height: 80px;
}

.row .col-lg-4 .card .card-header h2 {
    color: rgba(79, 79, 79, 0.44);
    /* 0.44 nghĩa là 44% */
    font-weight: bold;
    font-size: 25px;
}

.row .col-lg-4 .card .card-body label {
    width: 25%;
    text-align: center;
    align-items: top;
    margin: 10px 20px 5px 20px;
    font-size: 17px;
}

.row .col-lg-4 .card .card-body input,
textarea {
    border-radius: 12px;
    border: 1px solid rgba(79, 79, 79, 0.44);
    height: 45px;
    width: 65%;
    padding: 5px 10px 5px 10px;
    margin: 5px 0px 5px 0px;
    font-size: 17px;
}

.row .col-lg-4 .card .d-flex .btn {
    background-color: #58D0C1;
    color: white;
    margin: 20px;
    border-radius: 15px;
    width: 120px;
    height: 45%;
    font-size: 20px;
}

.row .col-lg-8 .flex {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 20px;
}

.row .col-lg-8 .flex label {
    color: #58D0C1;
    /* Màu chữ xanh teal */
    margin-right: 8px;
    /* Khoảng cách với ô input */
    font-size: 35px;
    /* Kích thước chữ */
}

/* Ô tìm kiếm */
.row .col-lg-8 .flex .search {
    background-color: white;
    /* Nền trắng */
    border: 2px solid #58D0C1;
    /* Viền màu xanh teal */
    padding: 10px;
    /* Khoảng cách nội dung bên trong */
    font-size: 18px;
    /* Kích thước chữ */
    border-radius: 6px;
    /* Bo góc */
    width: 250px;
    /* Độ rộng của ô input */
}

.row .col-lg-8 .list-product tbody td .d-flex .btn {
    width: 130px;
    border-radius: 15px;
}

.row .col-lg-8 .list-product tbody td {
    text-align: center;
    vertical-align: middle;
}

.modal .modal-dialog .modal-body div {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal .modal-dialog .modal-body .mb-4 label {
    display: flex;
    vertical-align: top;
    justify-content: space-between;
    width: 30%;
}

.modal .modal-dialog .modal-body .mb-4 .input-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
}

.modal .modal-dialog .modal-body .mb-4 textarea {
    height: 100px;
}

.modal .modal-dialog .modal-footer {
    background-color: #D9D9D9;
}

.modal .modal-dialog .modal-footer .btn {
    justify-content: space-between;
    width: 150px;
    border-radius: 15px;
}
</style>
